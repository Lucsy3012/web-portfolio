export default {
  name: 'Math',
  computed: {
    deg() {
      return Math.PI / 180; // one degree
    },
    goldenAngle() {
      return Math.PI * (3 - Math.sqrt(5))
    },
  }
}
