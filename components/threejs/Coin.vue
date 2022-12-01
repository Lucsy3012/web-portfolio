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
import { Pane } from 'tweakpane';

export default {
  name: 'Coin',
  props: {
    colorBackground: {
      type: String,
      required: false,
      default: "#FFFFFF"
    },
    colorLight: {
      type: String,
      required: false,
      default: "#FFFFFF"
    },
    colorAmbientLight: {
      type: String,
      required: false,
      default: "#d6c78c"
    },
    colorMaterial: {
      type: String,
      required: false,
      default: "#af9434"
    },
    materialTextureFront: {
      type: String,
      required: false,
      default: "gold-coin-front.png"
    },
    materialTextureBack: {
      type: String,
      required: false,
      default: "gold-coin-back.png"
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
      // dat: null,
      renderer: null,
      scene: null,
      camera: null,
      controls: null,
      clock: null,
      lights: {
        pointLight: null,
        hemisphereLight: null,
        ambientLight: null,
      },
      objects: {
        coin: null,
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
      },
      animation: {
        rotation: {
          y: {
            multiplier: 1,
            dynamicMultiplier: 1,
            snapshot: 0
          }
        }
      },
    }
  },
  computed: {
    deg() {
      return Math.PI / 180; // one degree
    },
    t() {
      return this.$t('gui')
    }
  },
  mounted() {
    this.init();
    this.animate();
    this.addControls(this.orbitControls);

    // Events
    window.addEventListener('resize', this.windowResizing, true)
    this.$refs.container.addEventListener('mousemove', this.mouseMovingCameraPosition, true)
    this.$refs.container.addEventListener('mousedown', this.mouseDown, true)
    this.$refs.container.addEventListener('mouseup', this.mouseUp, true)

    // GUI
    if (this.gui) {
      this.addGUI();
    }

    // Dev
    if (this.debug) {
      this.helperGrid();
      this.helperLight();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResizing, true)
    this.$refs.container.removeEventListener('mousemove', this.mouseMovingCameraPosition, true)
    this.$refs.container.removeEventListener('mousedown', this.mouseDown, true)
    this.$refs.container.removeEventListener('mouseup', this.mouseUp, true)
  },
  methods: {
    init() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(this.colorBackground);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Clock
      this.clock = new THREE.Clock()

      // Fog
      this.scene.fog = new THREE.FogExp2(this.colorBackground, 0.025);

      // Add Scene to DOM
      this.$refs.container.appendChild(this.renderer.domElement)


      // Geometries
      // ------------------------

      const geometry = new THREE.CylinderGeometry(1, 1, 0.15, 256)
      const textureLoader = new THREE.TextureLoader();
      // const matcapTexture = textureLoader.load('/textures/' + this.materialTexture)

      const textureSide = textureLoader.load('/textures/gold-coin-side.png')
      const textureFront = textureLoader.load('/textures/gold-coin-front.png')
      const textureBack = textureLoader.load('/textures/gold-coin-back.png')
      const textureSideDisplacement = textureLoader.load('/textures/gold-coin-side-depth.png')
      const textureFrontDisplacement = textureLoader.load('/textures/gold-coin-front-depth.png')
      const textureBackDisplacement = textureLoader.load('/textures/gold-coin-back-depth.png')

      textureSide.minFilter = THREE.NearestMipmapLinearFilter;
      textureFront.minFilter = THREE.NearestMipmapLinearFilter;
      textureBack.minFilter = THREE.NearestMipmapLinearFilter;

      const materials = [
        // new THREE.MeshPhongMaterial({ color: this.colorMaterial }),
        // new THREE.MeshPhongMaterial({ map: textureFront, bumpMap: textureFrontDisplacement }),
        // new THREE.MeshPhongMaterial({ map: textureBack, bumpMap: textureBackDisplacement }),
        new THREE.MeshPhongMaterial({ map: textureSide, bumpMap: textureSideDisplacement, bumpScale: 0.2 }),
        new THREE.MeshPhongMaterial({ map: textureFront, bumpMap: textureFrontDisplacement, bumpScale: 0.2 }),
        new THREE.MeshPhongMaterial({ map: textureBack, bumpMap: textureBackDisplacement, bumpScale: 0.2 })
      ];


      /* Metallic Material */
      // const material = new THREE.MeshStandardMaterial({ color: this.colorMaterial })
      // materials[0].metalness = 0.35;
      // materials[0].roughness = 0.66;

      this.objects.coin = new THREE.Mesh(geometry, materials)
      this.objects.coin.rotation.x = 30 * this.deg;
      this.objects.coin.rotation.y = 160 * this.deg;
      this.objects.coin.rotation.z = 90 * this.deg;
      this.objects.coin.position.x = -1;
      this.scene.add(this.objects.coin)

      this.objects.group = new THREE.Group()
      this.objects.group.add(this.objects.coin)

      this.scene.add(this.objects.group)


      // Lights
      // ------------------------
      this.lights.pointLight = new THREE.PointLight(this.colorLight, 0.75, 200)
      this.lights.pointLight.position.set(-5, 1, 1)
      this.scene.add(this.lights.pointLight)

      this.lights.ambientLight = new THREE.AmbientLight(this.colorMaterial)
      this.scene.add(this.lights.ambientLight)


      // Camera
      // ------------------------
      this.camera.position.x = -5;
    },
    animate() {
      requestAnimationFrame(this.animate);

      // Time
      // this.clock.elapsedTime = this.clock.getElapsedTime()

      // Animation
      this.frameAnimationRotate(this.objects.coin, 0, 0.0033);
      this.frameAnimationCameraPosition();

      // this.lights.pointLight.position.x = Math.sin(time) * 3
      // this.lights.pointLight.position.z = Math.cos(time) * 3

      // Updates Renderer
      this.renderer.render(this.scene, this.camera);
    },

    // Animations
    frameAnimationRotate(obj, x = 0, y = 0, z = 0) {
      obj.rotation.x -= x;
      obj.rotation.y -= y * this.animation.rotation.y.multiplier * this.animation.rotation.y.dynamicMultiplier;
      obj.rotation.z -= z;
    },
    frameAnimationCameraPosition() {
      this.camera.position.x = (this.mouse.position.y) - 5;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(new THREE.Vector3(0,0,0));
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

      // Color parameters
      let parameters = {
        colorMaterial: this.colorMaterial,
        colorLight: this.colorLight,
        colorAmbientLight: this.colorMaterial,
        colorBackground: this.colorBackground,
        bumpScale: this.objects.coin.material[0].bumpScale
      };

      // Folders
      // const paneCoinMaterial = pane.addFolder({ title: `Coin ${t.material}` });
      const paneCoinMaterial = pane.addFolder({ title: t.material });
      const paneCoinRotation = pane.addFolder({ title: t.rotation });
      const paneCoinPosition = pane.addFolder({ title: t.position });
      const paneLight = pane.addFolder({ title: t.folders.light });

      // Coin Material
      /*
      paneCoinMaterial.addInput(this.objects.coin.material[1], 'metalness', { min: 0, max: 1, step: 0.001, label: t.metalness });
      paneCoinMaterial.addInput(this.objects.coin.material[1], 'roughness', { min: 0, max: 1, step: 0.001, label: t.roughness });
      paneCoinMaterial.addInput(parameters, 'colorMaterial', { picker: 'inline', label: t.color }).on('change', (ev) => {
        this.objects.coin.material[1].color.set(parameters.colorMaterial);
      });
      */

      paneCoinMaterial.addInput(parameters, 'bumpScale', { min: 0, max: 0.5, step: 0.01, label: t.bump }).on('change', (ev) => {
        this.objects.coin.material[0].bumpScale = parameters.bumpScale;
        this.objects.coin.material[1].bumpScale = parameters.bumpScale;
        this.objects.coin.material[2].bumpScale = parameters.bumpScale;
      });
      paneCoinMaterial.addInput(parameters, 'colorMaterial', { picker: 'inline', label: t.color }).on('change', (ev) => {
        this.objects.coin.material[0].color.set(parameters.colorMaterial);
        this.objects.coin.material[1].color.set(parameters.colorMaterial);
        this.objects.coin.material[2].color.set(parameters.colorMaterial);
      });

      // paneLight.addInput(this.scene.fog, 'density', { min: 0, max: 0.5, step: 0.001 });

      // Coin Rotation
      paneCoinRotation.addInput(this.objects.coin.rotation, 'x', { min: 0, max: Math.PI * 2, step: 0.001, label: t.x });
      paneCoinRotation.addInput(this.objects.coin.rotation, 'y', { min: 0, max: Math.PI * 2, step: 0.001, label: t.y });
      paneCoinRotation.addInput(this.objects.coin.rotation, 'z', { min: 0, max: Math.PI * 2, step: 0.001, label: t.z });
      paneCoinRotation.addInput(this.animation.rotation.y, 'dynamicMultiplier', { min: -10, max: 10, step: 0.1, label: t.speed });

      // Coin Position
      paneCoinPosition.addInput(this.objects.coin.position, 'x', { min: -3, max: 5, step: 0.01, label: t.distance });
      paneCoinPosition.addInput(this.objects.coin.position, 'z', { min: -5, max: 5, step: 0.01, label: t.x });
      paneCoinPosition.addInput(this.objects.coin.position, 'y', { min: -5, max: 5, step: 0.01, label: t.y });

      // Lights
      paneLight.addInput(this.lights.pointLight.position, 'x', { min: -10, max: 10, step: 0.01, label: t.distance });
      paneLight.addInput(this.lights.pointLight.position, 'z', { min: -10, max: 10, step: 0.01, label: t.x });
      paneLight.addInput(this.lights.pointLight.position, 'y', { min: -10, max: 10, step: 0.01, label: t.y });
      paneLight.addInput(parameters, 'colorLight', { picker: 'inline', label: t.color }).on('change', (ev) => {
        this.lights.pointLight.color.set(parameters.colorLight);
      });
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
    // ------------------------
    helperGrid() {
      this.helpers.grid = new THREE.GridHelper(10, 10);
      this.scene.add(this.helpers.grid);
    },
    helperLight(size = 1, color = '#f55') {
      this.helpers.lightHelper = new THREE.PointLightHelper(this.lights.pointLight, size, color);
      this.scene.add(this.helpers.lightHelper);
    },

    saveSnapshot() {
      this.animation.rotation.y.snapshot = this.objects.coin.rotation.y;
    },

    // Non ThreeJS specific
    // ------------------------
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

    // GSAP
    // ------------------------
    mouseDown() {
      this.saveSnapshot()

      gsap.to(this.animation.rotation.y, {
        multiplier: 0,
        duration: 0.5,
        ease: "power2.in",
      })
    },
    mouseUp() {
      this.saveSnapshot()

      gsap.to(this.animation.rotation.y, {
        multiplier: 1,
        duration: 0.5,
        ease: "power3.in",
      })
      gsap.to(this.objects.coin.rotation, {
        y: this.animation.rotation.y.snapshot - Math.PI,
        duration: 1,
        ease: "circle.inOut",
      })
    },
  }
}
</script>

<style lang="less" scoped>
div::v-deep {
  cursor: pointer;

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
