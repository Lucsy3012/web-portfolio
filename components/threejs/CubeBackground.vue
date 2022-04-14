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
      cube: null,
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
        cube: null,
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

    // Dev
    // this.helperGrid();
    // this.helperLight();
    // this.addGUI();
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
      // this.renderer.shadowMap.enabled = true;
      // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Fog
      // this.scene.fog = new THREE.FogExp2(this.colorBackground, 0.025);

      // Add Scene to DOM
      this.$refs.container.appendChild(this.renderer.domElement)


      // Geometries
      // ------------------------
      const textureLoader = new THREE.TextureLoader();
      const matcapTexture = textureLoader.load('/textures/' + this.materialTexture)

      const geometry = new THREE.BoxGeometry(50, 50, 50)
      const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

      /* Simple Material
      const material = new THREE.MeshLambertMaterial({ color: this.colorMaterial })
       */

      /* Metallic Material
      const material = new THREE.MeshStandardMaterial({ color: this.colorMaterial })
      material.metalness = 0.35;
      material.roughness = 0.66;
       */

      this.objects.cube = new THREE.Mesh(geometry, material)
      this.objects.cube.position.y = -40;
      this.objects.cube.rotation.x = Math.random() * Math.PI * 2;
      this.objects.cube.rotation.y = Math.random() * Math.PI * 2;
      this.objects.cube.rotation.z = Math.random() * Math.PI * 2;
      this.scene.add(this.objects.cube)

      this.objects.group = new THREE.Group()
      this.objects.group.add(this.objects.cube)

      this.scene.add(this.objects.group)


      // Lights
      // ------------------------
      /*
      this.lights.pointLight = new THREE.PointLight(this.colorLight, 1, 1000)
      this.lights.pointLight.position.set(-25, 25, 15)
      // this.lights.pointLight.castShadow = true
      this.scene.add(this.lights.pointLight)

      this.lights.ambientLight = new THREE.AmbientLight(this.colorMaterial)
      this.scene.add(this.lights.ambientLight)
       */

      // this.helperGrid()
      // this.helperLight()

      // Camera
      // ------------------------
      this.camera.position.y = 35;
      this.camera.lookAt(this.objects.cube)
    },
    animate() {
      requestAnimationFrame(this.animate);

      // Animation
      this.frameAnimationRotate(0.001, 0.001);
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
    addGUI() {
      const dat = require('dat.gui');
      const gui = new dat.GUI();

      // Folders
      const guiLight = gui.addFolder('Light');
      const guiAmbientLight = gui.addFolder('Ambient Light');
      const guiMaterial = gui.addFolder('Material');
      const guiScene = gui.addFolder('Scene');

      // Color parameters
      let parameters = {
        colorMaterial: this.colorMaterial,
        colorLight: this.colorLight,
        colorAmbientLight: this.colorMaterial,
        colorBackground: this.colorBackground,
      };

      // Lights
      // guiLight.add(this.light, 'intensity').min(0).max(1).step(0.001);
      // guiLight.addColor(parameters, 'colorLight').onChange(() => { this.light.color.set(parameters.colorLight) });
      // guiAmbientLight.add(this.lights.ambientLight, 'intensity').min(0).max(1).step(0.001);
      // guiAmbientLight.addColor(parameters, 'colorAmbientLight').onChange(() => { this.ambientLight.color.set(parameters.colorAmbientLight) });

      // Material
      // guiMaterial.add(this.objects.cube.material, 'metalness').min(0).max(1).step(0.001);
      // guiMaterial.add(this.objects.cube.material, 'roughness').min(0).max(1).step(0.001);
      // guiMaterial.addColor(parameters, 'colorMaterial').onChange(() => { this.objects.cube.material.color.set(parameters.colorMaterial) });

      // Scene
      // guiScene.add(this.scene.fog, 'density').min(0).max(0.5).step(0.001);
    },
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
