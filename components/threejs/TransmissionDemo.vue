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
  name: 'TransmissionDemo',
  mixins: [three, gsap, bloomEffect],
  props: {
    colorLight2: {
      type: String,
      required: false,
      default: "#FFFFFF"
    },
    colorGround: {
      type: String,
      required: false,
      default: "#FFFFFF"
    },
  },
  data() {
    return {
      lights: {
        pointLight2: null,
      },
      objects: {
        icosahedron: null,
        sphere1: null,
        sphere2: null,
        plane: null,
      },
      window: {
        resizingContext: 'container'
      },
      animation: {
        lights: {
          closeness: 2,
        }
      }
    }
  },
  mounted() {
    this.init();
    this.animate();
    this.addControls(this.orbitControls);
    this.windowResizing();

    // Create fog
    // this.scene.fog = new this.THREE.FogExp2(this.colorBackground, 0.05);

    // Events
    window.addEventListener('resize', this.windowResizing, true);
    window.addEventListener('mousemove', this.mouseMovingCameraPosition, true);

    // GUI
    this.addGUI();

    // Dev
    this.helperGrid();
    this.helperPointLight();

    // Control changes
    // this.controls.autoRotate = true;
    // this.controls.autoRotateSpeed = 0.5;
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
        0.01,
        200
      )
      // this.renderer = new this.THREE.WebGLRenderer({ antialias: true })
      this.renderer = new this.THREE.WebGLRenderer({ powerPreference: "high-performance", antialias: true, stencil: false, depth: false })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(this.colorBackground)
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = this.THREE.PCFSoftShadowMap;

      // Clock
      this.clock = new this.THREE.Clock();

      // Post Processing
      // this.postProcessing();

      // Add Scene to DOM
      this.$refs.container.appendChild(this.renderer.domElement);


      // Geometries
      // ------------------------

      // Plane
      /*
      this.objects.plane = new this.THREE.Mesh(
        new this.THREE.PlaneGeometry(500, 500, 20, 20),
        new this.THREE.MeshLambertMaterial({
          color: this.colorGround,
          side: this.THREE.DoubleSide,
        })
      )
      this.objects.plane.rotation.x = Math.PI / 2
      this.objects.plane.receiveShadow = true
      this.scene.add(this.objects.plane)
       */
      this.objects.plane = new this.THREE.Mesh(
        new this.THREE.BoxBufferGeometry(50, 50, 50),
        new this.THREE.MeshLambertMaterial({
          color: this.colorGround,
          side: this.THREE.BackSide,
        })
      )
      this.objects.plane.position.y = 24.99
      this.objects.plane.receiveShadow = true
      this.scene.add(this.objects.plane)

      // Icosahedron
      const geometry = new this.THREE.IcosahedronBufferGeometry(1, 0)
      const material = new this.THREE.MeshPhysicalMaterial({
        color: this.colorMaterial,
        transmission: 0.5,
        metalness: 0.25,
        roughness: 1,
        ior: 0.75,
        thickness: 3.25,
        clearcoat: 0.5,
        opacity: 1,
        depthTest: true
      })

      this.objects.icosahedron = new this.THREE.Mesh(geometry, material)
      this.objects.icosahedron.position.y = 1
      this.objects.icosahedron.castShadow = true
      this.scene.add(this.objects.icosahedron)

      // Spheres
      this.objects.sphere1 = new this.THREE.Mesh(
        new this.THREE.SphereBufferGeometry(0.5, 32, 32),
        new this.THREE.MeshPhysicalMaterial({
          color: '#FF8321',
          transmission: 0.95,
          metalness: 0.1,
          roughness: 0.2,
          ior: 0.65,
          thickness: 0.65,
          opacity: 1,
          depthTest: true
        })
      )
      this.objects.sphere1.position.set(-3, 0.5, 0)
      this.objects.sphere1.castShadow = true
      this.scene.add(this.objects.sphere1)

      this.objects.sphere2 = new this.THREE.Mesh(
        new this.THREE.SphereBufferGeometry(1, 32, 32),
        new this.THREE.MeshPhysicalMaterial({
          color: '#7B81D4',
          transmission: 0.95,
          metalness: 0.1,
          roughness: 0.2,
          ior: 0.65,
          thickness: 0.65,
          opacity: 1,
          depthTest: true
          // side: this.THREE.DoubleSide
        })
      )

      this.objects.sphere2.position.set(3, 1, 0)
      this.objects.sphere2.castShadow = true
      this.scene.add(this.objects.sphere2)


      // Lights
      // ------------------------
      this.lights.pointLight = new this.THREE.PointLight(this.colorLight, 1.25, 30, 1.75)
      this.lights.pointLight.position.set(0, 2.5, -4)
      // this.lights.pointLight.castShadow = true
      // this.lights.pointLight.shadow.mapSize.width = 2048
      // this.lights.pointLight.shadow.mapSize.height = 2048
      this.scene.add(this.lights.pointLight)

      this.lights.pointLight2 = new this.THREE.PointLight(this.colorLight2, 1.25, 30, 1.75)
      this.lights.pointLight2.position.set(0, 2.5, 4)
      // this.lights.pointLight2.castShadow = true
      // this.lights.pointLight2.shadow.mapSize.width = 2048
      // this.lights.pointLight2.shadow.mapSize.height = 2048
      this.scene.add(this.lights.pointLight2)

      this.lights.directionalLight = new this.THREE.DirectionalLight(this.colorAmbientLight, 0.2, 40)
      this.lights.directionalLight.position.set(0, 10, 0)
      this.lights.directionalLight.rotation.y = Math.PI / 2
      this.lights.directionalLight.castShadow = true
      this.lights.directionalLight.shadow.mapSize.width = 2048
      this.lights.directionalLight.shadow.mapSize.height = 2048
      this.scene.add(this.lights.directionalLight)

      this.lights.ambientLight = new this.THREE.AmbientLight(this.colorMaterial)
      this.scene.add(this.lights.ambientLight)


      // Camera
      // ------------------------
      this.camera.position.x = -5;
      this.camera.position.y = 2.5;
      this.camera.position.z = 3;
      this.camera.lookAt(this.objects.icosahedron)
    },
    animate() {
      requestAnimationFrame(this.animate)

      // Time
      this.getElapsedTime();

      // Animation
      this.frameAnimationRotate(this.objects.icosahedron, 0.5, 0.5)
      this.frameAnimationPosition(this.objects.icosahedron, 1.5, 1, 0.5)
      // this.frameAnimationScale(this.objects.icosahedron)
      // this.camera.position.y = 0 - (Math.sin(this.mouse.y) * 6) + Math.abs(this.mouse.x * 3)

      this.lights.pointLight.position.x = this.mouse.x * 5
      this.lights.pointLight2.position.x = this.mouse.x * -5

      /*
      this.lights.pointLight.position.x = (Math.sin(this.mouse.x) * 5) + this.animation.lights.closeness
      this.lights.pointLight.position.z = (Math.cos(this.mouse.x) * 5) + this.animation.lights.closeness
      this.lights.pointLight2.position.x = (Math.sin(this.mouse.x) * 5) + this.animation.lights.closeness * -1
      this.lights.pointLight2.position.z = (Math.cos(this.mouse.x) * 5) + this.animation.lights.closeness * -1
       */

      // Updates Renderer
      this.renderer.render(this.scene, this.camera)

      // Post Processing
      // this.composer.render()
    },

    // Animations
    // ------------------------
    frameAnimationRotate(obj, x = 0, y = 0, z = 0) {
      obj.rotation.x = x * this.clock.elapsedTime;
      obj.rotation.y = y * this.clock.elapsedTime;
      obj.rotation.z = z * this.clock.elapsedTime;
    },
    frameAnimationPosition(obj, start = 0, frequency = 1, amplitude = 1) {
      obj.position.y = start + (Math.sin(frequency * this.clock.elapsedTime) * amplitude);
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
        colorLight2: this.colorLight2,
        colorAmbientLight: this.colorMaterial,
        colorBackground: this.colorBackground,
      };

      // Folders
      const paneScene = pane.addFolder({ title: t.folders.scene });
      const paneMaterial = pane.addFolder({ title: t.material });
      const paneSphere1Material = pane.addFolder({ title: 'Sphere 1', expanded: false });
      const paneSphere2Material = pane.addFolder({ title: 'Sphere 2', expanded: false });
      const paneLight = pane.addFolder({ title: t.folders.light });

      // Scene
      paneScene.addInput(parameters, 'colorBackground', { picker: 'inline', label: t.backgroundColor }).on('change', (ev) => {
        this.renderer.setClearColor(parameters.colorBackground);
      });
      paneScene.addInput(parameters, 'colorAmbientLight', { picker: 'inline', label: t.folders.ambientLight }).on('change', (ev) => {
        this.lights.ambientLight.color.set(parameters.colorAmbientLight);
      });

      // Tetrahedron Material
      paneMaterial.addInput(this.objects.icosahedron.material, 'transmission', { min: 0, max: 1, step: 0.001, label: t.transmission });
      paneMaterial.addInput(this.objects.icosahedron.material, 'metalness', { min: 0, max: 1, step: 0.001, label: t.metalness });
      paneMaterial.addInput(this.objects.icosahedron.material, 'roughness', { min: 0, max: 1, step: 0.001, label: t.roughness });
      paneMaterial.addInput(this.objects.icosahedron.material, 'ior', { min: 0, max: 10, step: 0.01, label: t.ior });
      paneMaterial.addInput(this.objects.icosahedron.material, 'thickness', { min: 0, max: 10, step: 0.01, label: t.thickness });
      paneMaterial.addInput(this.objects.icosahedron.material, 'clearcoat', { min: 0, max: 1, step: 0.01, label: t.clearcoat });
      paneMaterial.addInput(this.objects.icosahedron.material, 'wireframe', { label: t.wireframe });
      paneMaterial.addInput(parameters, 'colorMaterial', { picker: 'inline', label: t.color }).on('change', (ev) => {
        this.objects.icosahedron.material.color.set(parameters.colorMaterial);
      });

      // Sphere 1 Material
      /*
      paneSphere1Material.addInput(this.objects.sphere1.material, 'transmission', { min: 0, max: 1, step: 0.001, label: t.transmission });
      paneSphere1Material.addInput(this.objects.sphere1.material, 'opacity', { min: 0, max: 1, step: 0.001, label: t.opacity });
      paneSphere1Material.addInput(this.objects.sphere1.material, 'metalness', { min: 0, max: 1, step: 0.001, label: t.metalness });
      paneSphere1Material.addInput(this.objects.sphere1.material, 'roughness', { min: 0, max: 1, step: 0.001, label: t.roughness });
      paneSphere1Material.addInput(this.objects.sphere1.material, 'ior', { min: 0, max: 10, step: 0.01, label: t.ior });
      paneSphere1Material.addInput(this.objects.sphere1.material, 'thickness', { min: 0, max: 10, step: 0.01, label: t.thickness });
      paneSphere1Material.addInput(parameters, 'colorMaterial', { picker: 'inline', label: t.color }).on('change', (ev) => {
        this.objects.sphere1.material.color.set(parameters.colorMaterial);
      });
       */

      // Sphere 2 Material
      paneSphere2Material.addInput(this.objects.sphere2.material, 'transmission', { min: 0, max: 1, step: 0.001, label: t.transmission });
      paneSphere2Material.addInput(this.objects.sphere2.material, 'metalness', { min: 0, max: 1, step: 0.001, label: t.metalness });
      paneSphere2Material.addInput(this.objects.sphere2.material, 'roughness', { min: 0, max: 1, step: 0.001, label: t.roughness });
      paneSphere2Material.addInput(this.objects.sphere2.material, 'ior', { min: 0, max: 10, step: 0.01, label: t.ior });
      paneSphere2Material.addInput(this.objects.sphere2.material, 'thickness', { min: 0, max: 10, step: 0.01, label: t.thickness });
      paneSphere2Material.addInput(parameters, 'colorMaterial', { picker: 'inline', label: t.color }).on('change', (ev) => {
        this.objects.sphere2.material.color.set(parameters.colorMaterial);
      });

      // Lights
      // paneLight.addInput(this.animation.lights, 'closeness', { min: 0, max: 10, step: 0.1, label: t.closeness });
      paneLight.addInput(this.lights.pointLight, 'intensity', { min: 0, max: 4, step: 0.01, label: t.intensity });
      paneLight.addInput(parameters, 'colorLight', { picker: 'inline', label: t.color + ' #1' }).on('change', (ev) => {
        this.lights.pointLight.color.set(parameters.colorLight);
      });
      paneLight.addInput(parameters, 'colorLight2', { picker: 'inline', label: t.color + ' #2' }).on('change', (ev) => {
        this.lights.pointLight2.color.set(parameters.colorLight2);
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
