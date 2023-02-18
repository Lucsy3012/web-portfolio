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
import tween from '@/mixins/tween'
import bloomEffect from '@/mixins/postProcessing/bloomEffect'

export default {
  name: 'TransmissionCube',
  mixins: [three, tween, bloomEffect],
  props: {
    colorMaterial2: {
      type: String,
      required: false,
      default: "#FFFFFF"
    },
    colorLight2: {
      type: String,
      required: false,
      default: "#FFFFFF"
    },
  },
  data() {
    return {
      loader: null,
      lights: {
        pointLight2: null,
      },
      objects: {
        cube: null,
        innerCube: null,
        innerSphere: null,
        innerTetrahedron: null,
        innerTorusKnot: null,
      },
      materials: {
        innerObject: null,
        innerCube: null,
        innerSphere: null,
        innerTetrahedron: null,
        innerTorusKnot: null,
      },
      groups: {
        cubeGroup: null,
        innerObjectGroup: null,
      },
      textures: {
        loader: null,
        glass: null,
      },
      window: {
        resizingContext: 'container'
      },
      animation: {
        group: {
          scale: 0,
          speed: 1,
        }
      }
    }
  },
  mounted() {
    this.rgbeLoader();
    this.init();
    this.animate();
    this.addControls(this.orbitControls);
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
        90,
        window.innerWidth / window.innerHeight,
        0.01,
        100
      )
      // this.renderer = new this.THREE.WebGLRenderer({ antialias: true })
      this.renderer = new this.THREE.WebGLRenderer({ powerPreference: "high-performance", antialias: true, stencil: false, depth: false })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(this.colorBackground)

      this.renderer.toneMapping = this.THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1;
      this.renderer.outputEncoding = this.THREE.sRGBEncoding;

      // Clock
      this.clock = new this.THREE.Clock();

      // Post Processing
      this.postProcessing();

      // Add Scene to DOM
      this.$refs.container.appendChild(this.renderer.domElement);


      // Textures
      // ------------------------

      /* keep until used else where
      const cubeTextureLoader = new this.THREE.CubeTextureLoader()
      const environmentMapTexture = cubeTextureLoader.load([
        '/textures/environmentMaps/night/px.png',
        '/textures/environmentMaps/night/nx.png',
        '/textures/environmentMaps/night/py.png',
        '/textures/environmentMaps/night/ny.png',
        '/textures/environmentMaps/night/pz.png',
        '/textures/environmentMaps/night/nz.png'
      ])
       */


      // Geometries
      // ------------------------

      this.groups.cubeGroup = new this.THREE.Group();
      this.groups.innerObjectGroup = new this.THREE.Group();

      // Load textures
      this.textures.loader = new this.THREE.TextureLoader();
      this.loadTextures()

      // Glass Cube
      this.objects.cube = new this.THREE.Mesh(
        new this.THREE.BoxBufferGeometry(1.1, 1.1, 1.1),
        new this.THREE.MeshPhysicalMaterial({
          color: this.colorMaterial,
          transmission: 1.00,
          metalness: 0.25,
          ior: 0.95,
          thickness: 10,
          clearcoat: 0.50,
          reflectivity: 0.025,

          // Textures
          roughness: 0.50,
          roughnessMap: this.textures.loader.load(`/textures/glass/roughness/ice-brushed.jpg`),
          normalMap: this.textures.loader.load(`/textures/glass/normal/ice-brushed.jpg`),
          normalScale: new this.THREE.Vector2(1, 1)
        })
      )

      // Inside objects material
      const innerObjectMaterial = new this.THREE.MeshPhongMaterial({
        color: this.colorMaterial2,
        emissive: '#7f9eff',
        specular: this.colorLight2,
        shininess: 50,
        map: this.textures.loader.load(`/textures/glass/color/ice-brushed.jpg`),
        visible: false,
      })

      this.materials.innerCube = innerObjectMaterial.clone()
      this.materials.innerSphere = innerObjectMaterial.clone()
      this.materials.innerTetrahedron = innerObjectMaterial.clone()
      this.materials.innerTorusKnot = innerObjectMaterial.clone()

      // Cube
      this.objects.innerCube = new this.THREE.Mesh(
        new this.THREE.BoxBufferGeometry(1, 1, 1),
        this.materials.innerCube
      )
      this.objects.innerCube.material.visible = true // default visible
      this.objects.innerCube.material.needsUpdate = true

      // Sphere
      this.objects.innerSphere = new this.THREE.Mesh(
        new this.THREE.SphereBufferGeometry(0.5),
        this.materials.innerSphere
      )

      // Tetrahedron
      this.objects.innerTetrahedron = new this.THREE.Mesh(
        new this.THREE.TetrahedronBufferGeometry(0.75),
        this.materials.innerTetrahedron
      )

      // Torus Knot
      this.objects.innerTorusKnot = new this.THREE.Mesh(
        new this.THREE.TorusKnotBufferGeometry(10, 3, 180, 18),
        this.materials.innerTorusKnot
      )
      this.objects.innerTorusKnot.scale.set(0.025, 0.025, 0.025)

      // Add objects to groups
      this.groups.innerObjectGroup.add(this.objects.innerCube)
      this.groups.innerObjectGroup.add(this.objects.innerSphere)
      this.groups.innerObjectGroup.add(this.objects.innerTetrahedron)
      this.groups.innerObjectGroup.add(this.objects.innerTorusKnot)
      this.groups.cubeGroup.add(this.objects.cube)
      this.groups.cubeGroup.add(this.groups.innerObjectGroup)

      this.scene.add(this.groups.cubeGroup)


      // Lights
      // ------------------------
      this.lights.pointLight = new this.THREE.PointLight(this.colorLight, 5, 30, 1.75)
      this.lights.pointLight.position.set(-3, 1, -3)
      this.scene.add(this.lights.pointLight)

      this.lights.pointLight2 = new this.THREE.PointLight(this.colorLight2, 5, 30, 1.75)
      this.lights.pointLight2.position.set(3, 1, 3)
      this.scene.add(this.lights.pointLight2)

      this.lights.ambientLight = new this.THREE.AmbientLight(this.colorMaterial)
      this.scene.add(this.lights.ambientLight)


      // Camera
      // ------------------------
      this.camera.position.x = -1.5;
      this.camera.position.y = 1.5;
      this.camera.position.z = 1.5;
      this.camera.lookAt(this.objects.cube)
    },
    animate() {
      requestAnimationFrame(this.animate)

      // Time
      this.getElapsedTime();

      // Animation
      this.frameAnimationRotate(this.groups.cubeGroup, 0.33, 0.66)
      this.frameAnimationScale(this.groups.innerObjectGroup)
      // this.frameAnimationPosition(this.groups.cubeGroup, 0, 0.5, 0.5)
      // this.camera.position.x = 2 + (Math.sin(this.mouse.x) * 0.5)
      // this.camera.position.z = 2 + (Math.cos(this.mouse.x) * 0.5)
      // this.camera.position.y = 0.5 + (this.mouse.y * 0.5)

      this.frameAnimationLightPosition(3, 2)

      // Updates Renderer
      this.renderer.render(this.scene, this.camera)

      // Post Processing
      this.composer.render()
    },

    // Animations
    // ------------------------
    frameAnimationRotate(obj, x = 0, y = 0, z = 0) {
      // obj.rotation.x = x * this.clock.elapsedTime;
      // obj.rotation.y = y * this.clock.elapsedTime;
      // obj.rotation.z = z * this.clock.elapsedTime;
      obj.rotation.x += (x + this.time.delta) * this.animation.group.speed * (Math.PI / 720);
      obj.rotation.y += (y + this.time.delta) * this.animation.group.speed * (Math.PI / 720);
      obj.rotation.z += (z + this.time.delta) * this.animation.group.speed * (Math.PI / 720);
    },
    frameAnimationPosition(obj, start = 0, frequency = 1, amplitude = 1) {
      obj.position.y = start + (Math.sin(frequency * this.clock.elapsedTime) * amplitude);
    },
    frameAnimationScale(obj, start = 0.75, amplitude = 0.25) {
      const mouseYCenter = Math.abs(this.mouse.y) - 0.5

      this.animation.group.scale = this.smoothstep((mouseYCenter * amplitude) + start)

      obj.scale.x = this.animation.group.scale;
      obj.scale.y = this.animation.group.scale;
      obj.scale.z = this.animation.group.scale;
    },
    frameAnimationLightPosition(start, amplitude) {
      this.lights.pointLight.position.x = Math.sin(this.mouse.x * amplitude) * -start
      this.lights.pointLight.position.z = Math.cos(this.mouse.x * amplitude) * -start
      this.lights.pointLight2.position.x = Math.sin(this.mouse.x * -amplitude) * start
      this.lights.pointLight2.position.z = Math.cos(this.mouse.x * -amplitude) * start

      // this.lights.pointLight.position.x = Math.sin(this.clock.elapsedTime) * x
      // this.lights.pointLight.position.y = Math.sin(this.clock.elapsedTime / 3) * y
      // this.lights.pointLight.position.z = Math.cos(this.clock.elapsedTime) * z
      // this.lights.pointLight2.position.x = Math.sin(this.clock.elapsedTime - Math.PI) * x
      // this.lights.pointLight2.position.y = Math.sin((this.clock.elapsedTime / 3) - Math.PI) * y
      // this.lights.pointLight2.position.z = Math.cos(this.clock.elapsedTime - Math.PI) * z
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
        colorMaterial2: this.colorMaterial2,
        colorMaterial2Emissive: '#7f9eff',
        colorLight: this.colorLight,
        colorLight2: this.colorLight2,
        colorAmbientLight: this.colorMaterial,
        colorBackground: this.colorBackground,
        visibleObject: 'cube',
        lightIntensity: 5,
        exposure: 1,
        scale: 1,
        textures: t.textures.glass.iceBrushed
      };

      // Folders
      const paneScene = pane.addFolder({ title: t.folders.scene, expanded: true });
      const paneCubeMaterial = pane.addFolder({ title: t.textures.glass.name });
      const paneInnerObjectMaterial = pane.addFolder({ title: t.folders.innerObject });
      const paneLight = pane.addFolder({ title: t.folders.light, expanded: true });
      const panePostProcessing = pane.addFolder({ title: t.folders.postProcessing });

      // Scene
      paneScene.addInput(parameters, 'colorBackground', { picker: 'inline', label: t.backgroundColor }).on('change', (ev) => {
        this.renderer.setClearColor(parameters.colorBackground);
      });
      paneScene.addInput(parameters, 'colorAmbientLight', { picker: 'inline', label: t.folders.ambientLight }).on('change', (ev) => {
        this.lights.ambientLight.color.set(parameters.colorAmbientLight);
      });
      paneScene.addInput(parameters, 'exposure', { min: 0, max: 2, step: 0.001, label: t.exposure }).on('change', (ev) => {
        this.renderer.toneMappingExposure = parameters['exposure'];
      });

      // Glass Cube Material
      paneCubeMaterial.addInput(this.animation.group, 'speed', {  min: 0, max: 2, step: 0.1, label: t.rotationSpeed });
      paneCubeMaterial.addInput(parameters, 'colorMaterial', { picker: 'inline', label: t.color }).on('change', (ev) => {
        this.objects.cube.material.color.set(parameters.colorMaterial);
      });
      paneCubeMaterial.addInput(this.objects.cube.material, 'transmission', { min: 0, max: 1, step: 0.001, label: t.transmission });
      paneCubeMaterial.addInput(this.objects.cube.material, 'metalness', { min: 0, max: 1, step: 0.001, label: t.metalness });
      paneCubeMaterial.addInput(this.objects.cube.material, 'roughness', { min: 0, max: 1, step: 0.001, label: t.roughness });
      paneCubeMaterial.addInput(this.objects.cube.material, 'ior', { min: 0, max: 2.33, step: 0.01, label: t.ior });
      paneCubeMaterial.addInput(this.objects.cube.material, 'thickness', { min: 0, max: 10, step: 0.01, label: t.thickness });
      paneCubeMaterial.addInput(this.objects.cube.material, 'clearcoat', { min: 0, max: 1, step: 0.01, label: t.clearcoat });
      paneCubeMaterial.addInput(this.objects.cube.material, 'reflectivity', { min: 0, max: 0.1, step: 0.001, label: t.reflectivity });
      paneCubeMaterial.addInput(parameters, 'scale', { min: 0.66, max: 1.5, step: 0.01, label: t.scale }).on('change', (ev) => {
        this.groups.cubeGroup.scale.set(ev.value, ev.value, ev.value);
      });
      paneCubeMaterial.addInput(parameters, 'textures',{ options: {
          [t.textures.glass.diagonally]: 'diagonally',
          [t.textures.glass.iceBrushed]: 'iceBrushed',
          [t.textures.glass.iceRough]: 'iceRough',
          [t.textures.glass.shattered]: 'shattered',
          [t.textures.glass.spectral]: 'spectral',
          [t.textures.glass.squared]: 'squared'
        }, label: t.textures.name }).on('change', (ev) => {

        // Ice Cube
        this.objects.cube.material.normalMap = this.textures.glass[ev.value].normalMap;
        this.objects.cube.material.roughnessMap = this.textures.glass[ev.value].roughnessMap;

        // Inner Objects
        this.objects.innerCube.material.map = this.textures.glass[ev.value].map;
        this.objects.innerSphere.material.map = this.textures.glass[ev.value].map;
        this.objects.innerTetrahedron.material.map = this.textures.glass[ev.value].map;
        this.objects.innerTorusKnot.material.map = this.textures.glass[ev.value].map;

        // Load textures
        // const texture = this.textures.loader.load(`/textures/glass/color/${ev.value}.jpg`)
        // const textureNormal = this.textures.loader.load(`/textures/glass/normal/${ev.value}.jpg`)
        // const textureRoughness = this.textures.loader.load(`/textures/glass/roughness/${ev.value}.jpg`)

        // Set textures
        // this.objects.cube.material.normalMap = textureNormal;
        // this.objects.cube.material.roughnessMap = textureRoughness;
        // this.objects.innerCube.material.map = texture;
        // this.objects.innerSphere.material.map = texture;
        // this.objects.innerTetrahedron.material.map = texture;
        // this.objects.innerTorusKnot.material.map = texture;
      });

      // Inner Object Material
      paneInnerObjectMaterial.addInput(parameters, 'visibleObject',{ options: {
          [t.cube]: 'Cube',
          [t.sphere]: 'Sphere',
          [t.tetrahedron]: 'Tetrahedron',
          [t.torusKnot]: 'TorusKnot'
        }, label: t.geometry }).on('change', (ev) => {
        this.objects.innerCube.material.visible = ev.value === 'Cube';
        this.objects.innerSphere.material.visible = ev.value === 'Sphere';
        this.objects.innerTetrahedron.material.visible = ev.value === 'Tetrahedron';
        this.objects.innerTorusKnot.material.visible = ev.value === 'TorusKnot';
      });
      paneInnerObjectMaterial.addInput(parameters, 'colorMaterial2', { picker: 'inline', label: t.color }).on('change', (ev) => {
        this.objects.innerCube.material.color.set(parameters.colorMaterial2);
        this.objects.innerSphere.material.color.set(parameters.colorMaterial2);
        this.objects.innerTetrahedron.material.color.set(parameters.colorMaterial2);
        this.objects.innerTorusKnot.material.color.set(parameters.colorMaterial2);
      });
      paneInnerObjectMaterial.addInput(parameters, 'colorMaterial2Emissive', { picker: 'inline', label: t.colorEmissive }).on('change', (ev) => {
        this.objects.innerCube.material.emissive.set(parameters.colorMaterial2Emissive);
        this.objects.innerSphere.material.emissive.set(parameters.colorMaterial2Emissive);
        this.objects.innerTetrahedron.material.emissive.set(parameters.colorMaterial2Emissive);
        this.objects.innerTorusKnot.material.emissive.set(parameters.colorMaterial2Emissive);
      });
      paneInnerObjectMaterial.addInput(this.objects.innerCube.material, 'shininess', { min: 0, max: 100, step: 1, label: t.shininess }).on('change', (ev) => {
        this.objects.innerCube.material.shininess = ev.value;
        this.objects.innerSphere.material.shininess = ev.value;
        this.objects.innerTetrahedron.material.shininess = ev.value;
        this.objects.innerTorusKnot.material.shininess = ev.value;
      });

      // Lights
      paneLight.addInput(parameters, 'lightIntensity', { min: 0, max: 10, step: 0.1, label: t.intensity }).on('change', (ev) => {
        this.lights.pointLight.intensity = parameters.lightIntensity;
        this.lights.pointLight2.intensity = parameters.lightIntensity;
      });
      paneLight.addInput(parameters, 'colorLight', { picker: 'inline', label: t.color + ' #1' }).on('change', (ev) => {
        this.lights.pointLight.color.set(parameters.colorLight);
      });
      paneLight.addInput(parameters, 'colorLight2', { picker: 'inline', label: t.color + ' #2' }).on('change', (ev) => {
        this.lights.pointLight2.color.set(parameters.colorLight2);
      });

      // Post Processing
      panePostProcessing.addInput(this.bloomEffectParams, 'intensity', { min: 0, max: 10, step: 0.01, label: t.intensity }).on('change', (ev) => {
        this.bloomEffect.intensity = ev.value;
      });
      panePostProcessing.addInput(this.bloomEffectParams, 'opacity', { min: 0, max: 1, step: 0.01, label: t.opacity }).on('change', (ev) => {
        this.bloomEffect.blendMode.opacity.value = ev.value;
      });
    },

    postProcessing() {

      // Add effects
      const bloomEffect = this.addBloomEffect({ intensity: 1.0, opacity: 0.33 })

      // Initialize passes
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.composer.addPass(new EffectPass(this.camera, bloomEffect));
    },

    loadTextures() {
      const glassTextures = {
        diagonally: {},
        iceBrushed: {},
        iceRough: {},
        shattered: {},
        spectral: {},
        squared: {}
      }

      // Glass: Diagonally
      glassTextures.diagonally.map = this.textures.loader.load('/textures/glass/color/diagonally.jpg')
      glassTextures.diagonally.normalMap = this.textures.loader.load('/textures/glass/normal/diagonally.jpg')
      glassTextures.diagonally.roughnessMap = this.textures.loader.load('/textures/glass/roughness/diagonally.jpg')

      // Glass: Ice (brushed)
      glassTextures.iceBrushed.map = this.textures.loader.load('/textures/glass/color/ice-brushed.jpg')
      glassTextures.iceBrushed.normalMap = this.textures.loader.load('/textures/glass/normal/ice-brushed.jpg')
      glassTextures.iceBrushed.roughnessMap = this.textures.loader.load('/textures/glass/roughness/ice-brushed.jpg')

      // Glass: Ice (rough)
      glassTextures.iceRough.map = this.textures.loader.load('/textures/glass/color/ice-rough.jpg')
      glassTextures.iceRough.normalMap = this.textures.loader.load('/textures/glass/normal/ice-rough.jpg')
      glassTextures.iceRough.roughnessMap = this.textures.loader.load('/textures/glass/roughness/ice-rough.jpg')

      // Glass: Shattered
      glassTextures.shattered.map = this.textures.loader.load('/textures/glass/color/shattered.jpg')
      glassTextures.shattered.normalMap = this.textures.loader.load('/textures/glass/normal/shattered.jpg')
      glassTextures.shattered.roughnessMap = this.textures.loader.load('/textures/glass/roughness/shattered.jpg')

      // Glass: Spectral
      glassTextures.spectral.map = this.textures.loader.load('/textures/glass/color/spectral.jpg')
      glassTextures.spectral.normalMap = this.textures.loader.load('/textures/glass/normal/spectral.jpg')
      glassTextures.spectral.roughnessMap = this.textures.loader.load('/textures/glass/roughness/spectral.jpg')

      // Glass: Squared
      glassTextures.squared.map = this.textures.loader.load('/textures/glass/color/squared.jpg')
      glassTextures.squared.normalMap = this.textures.loader.load('/textures/glass/normal/squared.jpg')
      glassTextures.squared.roughnessMap = this.textures.loader.load('/textures/glass/roughness/squared.jpg')

      // Add to global object
      this.textures.glass = glassTextures
    },

    // todo Loaders
    rgbeLoader() {
      this.loader = new this.$vendor.RGBELoader().load('/textures/environmentMaps/night/original.hdr');
      this.loader.mapping = this.THREE.EquirectangularReflectionMapping;
      this.loader.encoding = this.THREE.sRGBEncoding;
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
