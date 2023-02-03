import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'

export default ({ app }, inject) => {
  inject('vendor', {
    THREE,
    OrbitControls,
    gsap
  })
}
