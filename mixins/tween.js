export default {
  name: 'Tween',
  methods: {
    easeInOut(x) {
      return Math.pow(Math.sin(x * Math.PI / 2), 2);
    },
    cubic(x) {
      return Math.pow(x, 3);
    },
    smoothstep(x) {
      return x * x * (3 - 2 * x);
    }
  }
}
