<template>
  <div class="three-container">
    <div ref="container" class="canvas-container" />
    <div ref="gui" class="gui" />
  </div>
</template>

<script>
/* eslint-disable */
import { EffectComposer, RenderPass, EffectPass, BlendFunction, NoiseEffect } from 'postprocessing';
import { Pane } from "tweakpane";
import three from '@/mixins/three'
import gsap from '@/mixins/gsap'
import bloomEffect from '@/mixins/postProcessing/bloomEffect'

export default {
  name: 'Triangle',
  mixins: [three, gsap, bloomEffect],
  props: {
    materialTexture: {
      type: String,
      required: false,
      default: "texture-pink.png"
    },
  },
  data() {
    return {
      objects: {
        tetrahedron: null,
      },
      window: {
        resizingContext: 'container'
      },
      animation: {
        object: {
          scale: 0,
        },
        camera: {
          position: {
            y: 0
          }
        }
      }
    }
  },
  mounted() {
    this.init();
    this.animate();
    this.addControls(this.orbitControls);
    this.scaleUp();
    this.windowResizing();

    // Events
    window.addEventListener('resize', this.windowResizing, true);
    window.addEventListener('mousemove', this.mouseMovingCameraPosition, true);

    // GUI
    this.addGUI();

    // Dev
    this.helperGrid();
    this.helperPointLight();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResizing, true) // doesn't work
    window.removeEventListener('mousemove', this.mouseMovingCameraPosition, true)
    this.renderer.dispose()
  },
  methods: {
    init() {
      this.scene = new this.THREE.Scene()
      this.camera = new this.THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        100
      )
      this.renderer = new this.THREE.WebGLRenderer({ powerPreference: "high-performance", antialias: true, stencil: false, depth: false })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(this.colorBackground)

      // Clock
      this.clock = new this.THREE.Clock();

      // Post Processing
      this.postProcessing();

      // Add Scene to DOM
      this.$refs.container.appendChild(this.renderer.domElement);


      // Geometries
      // ------------------------
      // const textureLoader = new this.THREE.TextureLoader();
      // const matcapTexture = textureLoader.load('/textures/' + this.materialTexture)
      // const material = new this.THREE.MeshMatcapMaterial({ matcap: matcapTexture })

      const geometry = new this.THREE.TetrahedronBufferGeometry(9, 0)
      const material = new this.THREE.MeshStandardMaterial({ color: this.colorMaterial })
      material.metalness = 0.2;
      material.roughness = 1;

      this.objects.tetrahedron = new this.THREE.Mesh(geometry, material)
      this.scene.add(this.objects.tetrahedron)


      // Lights
      // ------------------------
      this.lights.pointLight = new this.THREE.PointLight(this.colorLight, 1, 1000)
      this.lights.pointLight.position.set(0, 20, -5)
      this.scene.add(this.lights.pointLight)

      this.lights.ambientLight = new this.THREE.AmbientLight(this.colorMaterial)
      this.scene.add(this.lights.ambientLight)


      // Camera
      // ------------------------
      this.camera.position.y = 30;
      this.camera.lookAt(this.objects.tetrahedron)
    },
    animate() {
      requestAnimationFrame(this.animate)

      // Time
      this.getElapsedTime();

      // Animation
      this.frameAnimationRotate(this.objects.tetrahedron, 0.5, 0.5)
      this.frameAnimationScale(this.objects.tetrahedron)
      this.camera.position.y = 30 - (Math.sin(this.mouse.y) * 6) + Math.abs(this.mouse.x * 3)
      this.lights.pointLight.position.x = this.mouse.x * 5

      // Updates Renderer
      this.renderer.render(this.scene, this.camera)

      // Post Processing
      this.composer.render()
    },

    // Animations
    // ------------------------
    frameAnimationRotate(obj, x = 0, y = 0, z = 0) {
      obj.rotation.x = x * this.clock.elapsedTime;
      obj.rotation.y = y * this.clock.elapsedTime;
      obj.rotation.z = z * this.clock.elapsedTime;
    },
    frameAnimationScale(obj) {
      obj.scale.x = this.animation.object.scale;
      obj.scale.y = this.animation.object.scale;
      obj.scale.z = this.animation.object.scale;
    },

    // Add-ons
    // ------------------------
    addGUI() {
      if (!this.gui) return;

      // Init
      const t = this.t;
      const pane = new Pane({
        container: this.$refs.gui,
        title: this.t.settingsTitle,
        expanded: false
      });

      // Color parameters
      let parameters = {
        colorMaterial: this.colorMaterial,
        colorLight: this.colorLight,
        colorAmbientLight: this.colorMaterial,
        colorBackground: this.colorBackground,
      };

      // Folders
      const paneScene = pane.addFolder({ title: t.folders.scene });
      const paneMaterial = pane.addFolder({ title: t.material });
      const panePosition = pane.addFolder({ title: t.position });
      const paneLight = pane.addFolder({ title: t.folders.light });
      const panePostProcessing = pane.addFolder({ title: 'Post Processing' });

      // Scene
      paneScene.addInput(parameters, 'colorBackground', { picker: 'inline', label: t.backgroundColor }).on('change', (ev) => {
        this.renderer.setClearColor(parameters.colorBackground);
      });
      paneScene.addInput(parameters, 'colorAmbientLight', { picker: 'inline', label: t.folders.ambientLight }).on('change', (ev) => {
        this.lights.ambientLight.color.set(parameters.colorAmbientLight);
      });

      // Tetrahedron Material
      paneMaterial.addInput(this.objects.tetrahedron.material, 'metalness', { min: 0, max: 1, step: 0.001, label: t.metalness });
      paneMaterial.addInput(this.objects.tetrahedron.material, 'roughness', { min: 0, max: 1, step: 0.001, label: t.roughness });
      paneMaterial.addInput(parameters, 'colorMaterial', { picker: 'inline', label: t.color }).on('change', (ev) => {
        this.objects.tetrahedron.material.color.set(parameters.colorMaterial);
      });

      // Tetrahedron Position
      panePosition.addInput(this.objects.tetrahedron.position, 'y', { min: -15, max: 15, step: 0.01, label: t.closeness });
      panePosition.addInput(this.objects.tetrahedron.position, 'x', { min: -50, max: 50, step: 0.01, label: t.x });
      panePosition.addInput(this.objects.tetrahedron.position, 'z', { min: -50, max: 50, step: 0.01, label: t.y });

      // Lights
      paneLight.addInput(this.lights.pointLight.position, 'y', { min: -20, max: 20, step: 0.1, label: t.closeness });
      paneLight.addInput(this.lights.pointLight.position, 'x', { min: -20, max: 20, step: 0.1, label: t.x });
      paneLight.addInput(this.lights.pointLight.position, 'z', { min: -20, max: 20, step: 0.1, label: t.y });
      paneLight.addInput(this.lights.pointLight, 'intensity', { min: 0, max: 4, step: 0.01, label: t.intensity });

      // Post Processing
      panePostProcessing.addInput(this.bloomEffectParams, 'intensity', { min: 0, max: 10, step: 0.01, label: t.intensity }).on('change', (ev) => {
        this.bloomEffect.intensity = ev.value;
      });
    },

    postProcessing() {

      // Add effects
      const bloomEffect = this.addBloomEffect({ intensity: 0 })

      // Initialize passes
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.composer.addPass(new EffectPass(this.camera, bloomEffect));
    },

    // GSAP
    // ------------------------
    scaleUp() {
      this.gsap.to(this.animation.object, {
        scale: 1,
        duration: 2,
        delay: 0.25,
        ease: "power3.inOut",
      })
    }
  }
}
</script>

<style lang="less" scoped>
div::v-deep {
  canvas {
    max-width: 100%;
    height: auto !important;
  }
  &.background {
    .canvas-container,
    canvas {
      height: 100% !important;
    }
  }
}
</style>
