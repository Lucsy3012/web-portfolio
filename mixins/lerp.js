export default {
  name: 'Lerp',
  methods: {

    // https://www.gamedev.net/articles/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/
    lerp(a, b, t) {
      return a + (b - a) * t;
    },
    inverseLerp(a, b, value) {
      return (value - a) / (b - a);
    },
  }
}
