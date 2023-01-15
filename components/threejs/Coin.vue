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
import {EffectComposer, RenderPass, EffectPass, BlendFunction, NoiseEffect, BloomEffect} from 'postprocessing';
import gsap from 'gsap'
import { Pane } from 'tweakpane';
import three from '@/mixins/three'
import math from '@/mixins/math'
import bloomEffect from '@/mixins/postProcessing/bloomEffect'

export default {
  name: 'Coin',
  mixins: [three, math, bloomEffect],
  props: {
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
  },
  data() {
    return {
      objects: {
        coin: null,
        group: null,
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
    this.addGUI();

    // Dev
    this.helperGrid();
    this.helperPointLight();
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
      this.renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance", antialias: true, stencil: false, depth: false })
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(this.colorBackground);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Clock
      this.clock = new THREE.Clock();

      // Fog
      this.scene.fog = new THREE.FogExp2(this.colorBackground, 0.025);

      // Post Processing
      this.postProcessing();

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
      this.getElapsedTime();

      // Animation
      this.frameAnimationRotate(this.objects.coin, 0, 0.0033);
      this.frameAnimationCameraPosition();

      // this.lights.pointLight.position.x = Math.sin(time) * 3
      // this.lights.pointLight.position.z = Math.cos(time) * 3

      // Updates Renderer
      this.renderer.render(this.scene, this.camera);

      // Post Processing
      this.composer.render();
    },

    // Animations
    frameAnimationRotate(obj, x = 0, y = 0, z = 0) {
      obj.rotation.x -= x;
      obj.rotation.y -= y * this.animation.rotation.y.multiplier * this.animation.rotation.y.dynamicMultiplier;
      obj.rotation.z -= z;
    },
    frameAnimationCameraPosition() {
      this.camera.position.x = (this.mouse.y) - 5;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(new THREE.Vector3(0,0,0));
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
        bumpScale: this.objects.coin.material[0].bumpScale
      };

      // Folders
      const paneCoinMaterial = pane.addFolder({ title: t.material });
      const paneCoinRotation = pane.addFolder({ title: t.rotation });
      const paneCoinPosition = pane.addFolder({ title: t.position });
      const paneLight = pane.addFolder({ title: t.folders.light });
      const panePostProcessing = pane.addFolder({ title: 'Post Processing' });

      // Coin Material
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

      // Post Processing
      // todo add translated labels
      panePostProcessing.addInput(this.bloomEffectParams, 'intensity', { min: 0, max: 10, step: 0.01 }).on('change', (ev) => {
        this.bloomEffect.intensity = ev.value;
      });
      // todo make work
      panePostProcessing.addInput(this.bloomEffectParams, 'radius', { min: 0, max: 1, step: 0.01 }).on('change', (ev) => {
        this.bloomEffect.mipmapBlurPass.radius = ev.value;
      });
      panePostProcessing.addInput(this.bloomEffectParams, 'opacity', { min: 0, max: 1, step: 0.01 }).on('change', (ev) => {
        this.bloomEffect.blendMode.opacity.value = ev.value;
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

    postProcessing() {

      // Add effects
      this.bloomEffectParams.intensity = 1; // change defaults before adding effect
      const bloomEffect = this.addBloomEffect()

      // Todo noise effect as mixin
      const noiseEffect = new NoiseEffect({ premultiply: false });
      noiseEffect.blendMode.opacity.value = 0.7;
      noiseEffect.blendMode.blendFunction = BlendFunction.REFLECT;

      // Initialize passes
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.composer.addPass(new EffectPass(this.camera, bloomEffect, noiseEffect));
    },

    // Snapshots
    // ------------------------
    saveSnapshot() {
      this.animation.rotation.y.snapshot = this.objects.coin.rotation.y;
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
