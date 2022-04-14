<template>
  <div ref="container"></div>
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
      cone: null,
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
    window.addEventListener('resize', this.windowResizing, true)
    window.addEventListener('mousemove', this.mouseMovingCameraPosition, true)
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
      this.$refs.container.appendChild(this.renderer.domElement)


      // Geometries
      // ------------------------
      const textureLoader = new THREE.TextureLoader();
      const matcapTexture = textureLoader.load('/textures/' + this.materialTexture)

      const geometry = new THREE.ConeGeometry(250, 100, 512)
      const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

      this.objects.cone = new THREE.Mesh(geometry, material)
      this.objects.cone.position.y = -25;
      this.objects.cone.rotation.x = 0.1;
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

      // Animation
      this.frameAnimationRotate(0, 0.0015);
      this.frameAnimationCameraPosition(-3);

      // Updates Renderer
      this.renderer.render(this.scene, this.camera);
    },

    // Animations
    frameAnimationRotate(x = 0, y = 0, z = 0) {
      this.objects.group.rotation.x -= x;
      this.objects.group.rotation.y -= y;
      this.objects.group.rotation.z -= z;
    },
    frameAnimationCameraPosition(multiplier = 1) {
      this.camera.position.x = this.mouse.position.x * multiplier;
      this.camera.position.z = this.mouse.position.y * multiplier;
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
    helperLight(size = 1, color = '#f55') {
      this.helpers.lightHelper = new THREE.PointLightHelper(this.lights.pointLight, size, color);
      this.scene.add(this.helpers.lightHelper);
    },

    // Non ThreeJS specific
    windowResizing(size) {
      let width = window.innerWidth;
      let height = window.innerHeight;

      if (size === 'container') {
        width = this.$refs.container.offsetWidth;
        height = this.$refs.container.offsetHeight;
      }

      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    },
    mouseMovingCameraPosition(e) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.mouse.position.x = ((width * -0.5) + e.clientX) / width * 2;
      this.mouse.position.y = ((height * -0.5) + e.clientY) / height * 2;
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResizing, true)
    window.removeEventListener('mousemove', this.mouseMovingCameraPosition, true)
  }
}
</script>
