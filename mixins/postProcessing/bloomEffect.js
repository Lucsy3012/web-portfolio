import { BloomEffect } from 'postprocessing';

// Demo: https://pmndrs.github.io/postprocessing/public/demo/#bloom
// Demo Source: https://github.com/pmndrs/postprocessing/blob/main/demo/src/demos/BloomDemo.js

export default {
  name: 'BloomEffect',
  data() {
    return {
      bloomEffect: null,
      bloomEffectParams: {
        intensity: 1,
        radius: 0.5,
        opacity: 1
      }
    }
  },
  methods: {
    addBloomEffect() {

      // Setup
      const bloomEffect = new BloomEffect()
      bloomEffect.intensity = this.bloomEffectParams.intensity;
      bloomEffect.mipmapBlurPass.radius = this.bloomEffectParams.radius;
      bloomEffect.blendMode.opacity.value = this.bloomEffectParams.opacity;

      // Export
      this.bloomEffect = bloomEffect;
      return bloomEffect
    },
  }
}
