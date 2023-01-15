import * as THREE from "three";

export default {
  name: 'Three',
  data() {
    return {
      renderer: null,
      scene: null,
      composer: null,
      camera: null,
      controls: null,
      clock: null,
      container: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      lights: {
        pointLight: null,
        directionalLight: null,
        ambientLight: null,
        hemisphereLight: null,
      },
      helpers: {
        grid: null,
        pointLight: null,
        directionalLight: null,
        ambientLight: null,
        hemisphereLight: null,
      },
      mouse: {
        x: 0,
        y: 0,
      },
      time: {
        elapsedTime: 0,
        elapsedTimeOld: 0,
        delta: 0,
      },
      window: {
        width: 0,
        height: 0,
      },
      uniforms: {
        u_time: { type: 'float', value: 0 },
        u_resolution: { type: 'vec2', value: new THREE.Vector2() },
        u_mouse: { type: 'vec2', value: new THREE.Vector2() }
      },
    }
  },
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
      default: "#FFFFFF"
    },
    colorMaterial: {
      type: String,
      required: false,
      default: "#FFFFFF"
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
  computed: {
    t() {
      return this.$t('gui')
    },
  },
  methods: {

    // Clock
    // ------------------------
    getElapsedTime() {
      this.time.elapsedTime = this.clock.getElapsedTime()
      this.time.delta = this.time.elapsedTime - this.time.elapsedTimeOld
      this.time.elapsedTimeOld = this.time.elapsedTime
    },

    // Helpers
    // ------------------------
    helperGrid() {
      if (!this.debug) return;
      this.helpers.grid = new THREE.GridHelper(10, 10);
      this.scene.add(this.helpers.grid);
    },
    helperPointLight(size = 1, color = '#f55') {
      if (!this.debug) return;
      this.helpers.pointLight = new THREE.PointLightHelper(this.lights.pointLight, size, color);
      this.scene.add(this.helpers.pointLight);
    },
    helperDirectionalLight(size = 1, color = '#f55') {
      if (!this.debug) return;
      this.helpers.directionalLight = new THREE.DirectionalLightHelper(this.lights.directionalLight, size, color);
      this.scene.add(this.helpers.directionalLight);
    },

    // Non ThreeJS specific
    // ------------------------
    windowResizing() {

      // Update global window parameters
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      // Update global container parameters
      this.container.width = this.$refs?.container.offsetWidth ?? 0;
      this.container.height = this.$refs?.container.offsetHeight ?? 0;

      // Update renderer and camera with parameters
      this.renderer.setSize(this.window.width, this.window.height);
      this.camera.aspect = this.window.width / this.window.height;
      this.camera.updateProjectionMatrix();
    },
    mouseMovingCameraPosition(e) {

      // Update global window parameters
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      // Update global container parameters
      // todo

      // Update global mouse parameters
      this.mouse.x = ((this.window.width * -0.5) + e.clientX) / this.window.width * 2;
      this.mouse.y = ((this.window.height * -0.5) + e.clientY) / this.window.height * 2;
    },
  }
}
