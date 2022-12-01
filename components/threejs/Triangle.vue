<template>
  <div class="three-container">
    <div ref="container" class="canvas-container" />
    <div ref="gui" class="gui" />
  </div>
</template>

<script>
/* eslint-disable */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'
import { Pane } from "tweakpane";

export default {
  name: 'Triangle',
  props: {
    colorBackground: {
      type: String,
      required: false,
      default: "#FFFFFF"
    },
    colorMaterial: {
      type: String,
      required: false,
      default: "#FFFFFF"
    },
    materialTexture: {
      type: String,
      required: false,
      default: "texture-pink.png"
    },
    orbitControls: {
      type: Boolean,
      required: false,
      default: false,
    },
    gui: {
      type: Boolean,
      required: false,
      default: false,
    },
    debug: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      dat: null,
      renderer: null,
      scene: null,
      camera: null,
      controls: null,
      clock: null,
      lights: {
        pointLight: null,
        ambientLight: null,
      },
      objects: {
        tetrahedron: null,
      },
      helpers: {
        grid: null,
      },
      mouse: {
        position: {
          x: 0,
          y: 0
        },
        area: {
          width: 0,
          height: 0,
        }
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
  computed: {
    t() {
      return this.$t('gui')
    }
  },
  mounted() {
    this.init();
    this.animate();
    this.addControls(this.orbitControls);
    this.scaleUp();

    // Events
    // window.addEventListener('resize', this.windowResizing, true);
    window.addEventListener('mousemove', this.mouseMovingCameraPosition, true);

    // GUI
    if (this.gui) {
      this.addGUI();
    }

    // Dev
    if (this.dev) {
      this.helperGrid();
      this.helperLight();
    }
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.windowResizing, true) // doesn't work
    window.removeEventListener('mousemove', this.mouseMovingCameraPosition, true)
  },
  methods: {
    init() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        100
      )
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(this.colorBackground)

      // Clock
      this.clock = new THREE.Clock()

      // Add Scene to DOM
      this.$refs.container.appendChild(this.renderer.domElement)


      // Geometries
      // ------------------------
      // const textureLoader = new THREE.TextureLoader();
      // const matcapTexture = textureLoader.load('/textures/' + this.materialTexture)

      const geometry = new THREE.TetrahedronGeometry(9, 0)
      // const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
      const material = new THREE.MeshStandardMaterial({ color: this.colorMaterial })
      material.metalness = 0.2;
      material.roughness = 1;

      this.objects.tetrahedron = new THREE.Mesh(geometry, material)
      this.scene.add(this.objects.tetrahedron)


      // Lights
      // ------------------------
      this.lights.pointLight = new THREE.PointLight(this.colorLight, 1, 1000)
      this.lights.pointLight.position.set(0, 20, -5)
      this.scene.add(this.lights.pointLight)

      this.lights.ambientLight = new THREE.AmbientLight(this.colorMaterial)
      this.scene.add(this.lights.ambientLight)


      // Camera
      // ------------------------
      this.camera.position.y = 30;
      this.camera.lookAt(this.objects.tetrahedron)
    },
    animate() {
      this.windowResizing('container'); // optimise function

      // Time
      this.clock.elapsedTime = this.clock.getElapsedTime()

      // Animation
      this.frameAnimationRotate(this.objects.tetrahedron, 0.5, 0.5)
      this.frameAnimationScale(this.objects.tetrahedron)
      this.camera.position.y = 30 - (Math.sin(this.mouse.position.y) * 6) + Math.abs(this.mouse.position.x * 3)
      this.lights.pointLight.position.x = this.mouse.position.x * 5

      // Updates Renderer
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
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
      const t = this.t;

      const pane = new Pane({
        container: this.$refs.gui,
        title: this.t.settingsTitle,
        expanded: false
      });

      // Folders
      const paneScene = pane.addFolder({ title: t.folders.scene });
      const paneMaterial = pane.addFolder({ title: t.material });
      const panePosition = pane.addFolder({ title: t.position });
      const paneLight = pane.addFolder({ title: t.folders.light });

      // Color parameters
      let parameters = {
        colorMaterial: this.colorMaterial,
        colorLight: this.colorLight,
        colorAmbientLight: this.colorMaterial,
        colorBackground: this.colorBackground,
      };

      // Scene
      paneScene.addInput(parameters, 'colorBackground', { picker: 'inline', label: t.backgroundColor }).on('change', (ev) => {
        this.renderer.setClearColor(parameters.colorBackground);
      });
      paneScene.addInput(parameters, 'colorAmbientLight', { picker: 'inline', label: t.folders.ambientLight }).on('change', (ev) => {
        this.lights.ambientLight.color.set(parameters.colorAmbientLight);
      });


      // Tetrahedron^Material
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
    },

    addControls(enabled = true) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.screenSpacePanning = true
      this.controls.enableDamping = true
      this.controls.minDistance = 1
      this.controls.maxDistance = 1000
      this.controls.target.set(0, 0, 0)
      this.controls.enabled = enabled
      this.controls.update()
    },

    // Helpers
    // ------------------------
    helperGrid() {
      this.helpers.grid = new THREE.GridHelper(20, 20)
      this.scene.add(this.helpers.grid)
    },
    helperLight(size = 1, color = '#f55') {
      this.helpers.lightHelper = new THREE.PointLightHelper(this.lights.pointLight, size, color);
      this.scene.add(this.helpers.lightHelper);
    },

    // Non ThreeJS specific
    // ------------------------
    windowResizing(size) {
      if (size === 'container') {
        if (!this.$refs.container) return;
        this.mouse.area.width = this.$refs.container?.offsetWidth;
        this.mouse.area.height = this.$refs.container?.offsetHeight;
      } else {
        this.mouse.area.width = window.offsetWidth;
        this.mouse.area.height = window.offsetHeight;
      }

      this.renderer.setSize(this.mouse.area.width, this.mouse.area.height);
      this.camera.aspect = this.mouse.area.width / this.mouse.area.height;
      this.camera.updateProjectionMatrix();
    },
    mouseMovingCameraPosition(e) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.mouse.position.x = ((width * -0.5) + e.clientX) / width * 2;
      this.mouse.position.y = ((height * -0.5) + e.clientY) / height * 2;
    },

    // GSAP
    // ------------------------
    scaleUp() {
      gsap.to(this.animation.object, {
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
