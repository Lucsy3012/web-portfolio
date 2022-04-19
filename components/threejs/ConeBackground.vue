<template>
  <div ref="container" id="container"></div>
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
      lights: {
        pointLight: null,
        hemisphereLight: null,
        ambientLight: null,
      },
      objects: {
        cone: null,
        group: null,
      },
      helpers: {
        grid: null,
        lightHelper: null,
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
    orbitControls: {
      type: Boolean,
      required: false,
      default: true,
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
    // this.helperGrid();
    // this.helperLight();
  },
  methods: {
    init() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        500
      )
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(this.colorBackground)

      // Add Scene to DOM
      document.querySelector('#container').appendChild(this.renderer.domElement)


      // Geometries
      // ------------------------
      const textureLoader = new THREE.TextureLoader();
      const matcapTexture = textureLoader.load('/textures/' + this.materialTexture)

      const geometry = new THREE.ConeGeometry(350, 100, 512)
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
      requestAnimationFrame(this.animate);
      this.windowResizing('container');

      // Animation
      this.frameAnimationRotate(this.objects.group, 0, 0.003);
      this.frameAnimationCameraPosition(
        this.mouse.area.width / this.mouse.area.height * -4,
        this.mouse.area.height / this.mouse.area.width * -8
      );

      // Updates Renderer
      this.renderer.render(this.scene, this.camera);
    },

    // Animations
    frameAnimationRotate(obj, x = 0, y = 0, z = 0) {
      obj.rotation.x -= x;
      obj.rotation.y -= y;
      obj.rotation.z -= z;
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

    // Helpers
    helperGrid() {
      this.helpers.grid = new THREE.GridHelper(10, 10);
      this.scene.add(this.helpers.grid);
    },
    helperLight(size = 1, color = '#f55') {
      this.helpers.lightHelper = new THREE.PointLightHelper(this.lights.pointLight, size, color);
      this.scene.add(this.helpers.lightHelper);
    },

    // Non ThreeJS specific
    windowResizing(size) {
      const container = document.querySelector('#container')

      if (size === 'container') {
        this.mouse.area.width = container.offsetWidth;
        this.mouse.area.height = container.offsetHeight;
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
