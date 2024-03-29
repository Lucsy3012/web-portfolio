<template>
  <div ref="container" :id="customID"></div>
</template>

<style lang="less" scoped>
div::v-deep {
  canvas {
    max-width: 100%;
    height: auto !important;
  }
  &.background {
    canvas {
      height: 100% !important;
    }
  }
}
</style>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default {
  name: 'ConeBackground',
  data() {
    return {
      dat: null,
      renderer: null,
      scene: null,
      camera: null,
      controls: null,
      clock: null,
      objects: {
        cone: null,
        group: null,
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
      }
    }
  },
  props: {
    customID: {
      type: String,
      required: false,
      default: "container"
    },
    colorBackground: {
      type: String,
      required: false,
      default: "#FFFFFF"
    },
    materialTexture: {
      type: String,
      required: false,
      default: "texture-pink.png"
    },
    materialTextureExternal: {
      type: Boolean,
      required: false,
      default: false,
    },
    orbitControls: {
      type: Boolean,
      required: false,
      default: false,
    },
    dev: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  mounted() {
    this.init();
    this.animate();
    this.addControls(this.orbitControls);

    // Events
    // window.addEventListener('resize', this.windowResizing('container'), true)
    window.addEventListener('mousemove', this.mouseMovingCameraPosition, true)

    // Dev
    if (this.dev) {
      this.helperGrid();
      this.addGUI();
    }
  },
  methods: {
    init() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        25,
        window.innerWidth / window.innerHeight,
        20,
        80
      )
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(this.colorBackground)

      // Clock
      this.clock = new THREE.Clock()

      // Add Scene to DOM
      document.querySelector(`#${this.customID}`).appendChild(this.renderer.domElement)


      // Geometries
      // ------------------------
      const textureLoader = new THREE.TextureLoader();
      let matcapTexture;

      if (this.materialTextureExternal) {
        matcapTexture = textureLoader.load(this.materialTexture)
      } else {
        matcapTexture = textureLoader.load('/textures/' + this.materialTexture)
      }

      const geometry = new THREE.ConeGeometry(200, 50, 256)
      const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

      this.objects.cone = new THREE.Mesh(geometry, material)
      this.objects.cone.position.y = -25;
      this.objects.cone.rotation.x = 0.05;
      this.scene.add(this.objects.cone)

      this.objects.group = new THREE.Group()
      this.objects.group.add(this.objects.cone)

      this.scene.add(this.objects.group)


      // Camera
      // ------------------------
      this.camera.position.y = 35;
      this.camera.lookAt(this.objects.cone)
    },
    animate() {
      this.windowResizing('container'); // optimise function

      this.clock.elapsedTime = this.clock.getElapsedTime()

      // Animation
      this.frameAnimationRotate(this.objects.group, 0, 0.5);
      this.frameAnimationCameraPosition(
        this.mouse.area.width / this.mouse.area.height * -4,
        this.mouse.area.height / this.mouse.area.width * -8
      );

      // Updates Renderer
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    },

    // Animations
    frameAnimationRotate(obj, x = 0, y = 0, z = 0) {
      obj.rotation.x = -x * this.clock.elapsedTime;
      obj.rotation.y = -y * this.clock.elapsedTime;
      obj.rotation.z = -z * this.clock.elapsedTime;
    },
    frameAnimationCameraPosition(multiplierX = 1, multiplierY = 1) {
      this.camera.position.x = this.mouse.position.x * multiplierX;
      this.camera.position.z = this.mouse.position.y * multiplierY;
      this.camera.updateProjectionMatrix();
    },

    // Add-ons
    addControls(enabled = true) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.screenSpacePanning = true;
      this.controls.enableDamping = true;
      this.controls.minDistance = 1;
      this.controls.maxDistance = 1000;
      this.controls.target.set(0, 0, 0);
      this.controls.enabled = enabled;
      this.controls.update();
    },

    // Add-ons
    addGUI() {
      const dat = require('dat.gui')
      const gui = new dat.GUI()

      // Folders
      const guiGeometry = gui.addFolder('Geometry')

      // Geometry
      guiGeometry.add(this.objects.cone.position, 'x').min(-50).max(50).step(0.01).name('Cone Position X')
      guiGeometry.add(this.objects.cone.position, 'y').min(-50).max(50).step(0.01).name('Cone Position Y')
      guiGeometry.add(this.objects.cone.position, 'z').min(-50).max(50).step(0.01).name('Cone Position Z')
      guiGeometry.add(this.objects.cone.rotation, 'x').min(0).max(Math.PI * 2).step(0.001).name('Cone X')
      guiGeometry.add(this.objects.cone.rotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('Cone Y')
      guiGeometry.add(this.objects.cone.rotation, 'z').min(0).max(Math.PI * 2).step(0.001).name('Cone Z')
    },

    // Helpers
    helperGrid() {
      this.helpers.grid = new THREE.GridHelper(10, 10);
      this.scene.add(this.helpers.grid);
    },
    /*
    helperLight(size = 1, color = '#f55') {
      this.helpers.lightHelper = new THREE.PointLightHelper(this.lights.pointLight, size, color);
      this.scene.add(this.helpers.lightHelper);
    },
     */

    // Non ThreeJS specific
    windowResizing(size) {
      // const container = document.querySelector(`#${this.customID}`)  // optimise function

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
      const width = this.mouse.area.width;
      const height = this.mouse.area.height;

      this.mouse.position.x = ((width * -0.5) + e.clientX) / width * 2;
      this.mouse.position.y = ((height * -0.5) + e.clientY) / height * 2;
    },
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.windowResizing, true)
    window.removeEventListener('mousemove', this.mouseMovingCameraPosition, true)
  }
}
</script>
