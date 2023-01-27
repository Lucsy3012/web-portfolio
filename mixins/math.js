export default {
  name: 'Math',
  computed: {
    deg() {
      return Math.PI / 180; // one degree
    },
    goldenAngle() {
      return Math.PI * (3 - Math.sqrt(5))
    },
  },
  methods: {

    // Change minus values to positive
    normalize(x, pow = 2) {
      return Math.sqrt(x**pow);
    },

    // Calculate percentage change between two values
    percentageIncrease(oldValue, newValue) {
      return (newValue - oldValue) / oldValue * 100;
    },
  }
}
