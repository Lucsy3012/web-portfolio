import Vue from 'vue'

export default () => {

  // v-animate-in-view
  const animateOnScrollObserver = new IntersectionObserver(
    (entries, animateOnScrollObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          animateOnScrollObserver.unobserve(entry.target)
        }
      })
    }
  )

  Vue.directive('animate-in-view', {
    bind: (el) => {
      el.classList.add('animate--js')
      animateOnScrollObserver.observe(el)
    }
  })
}
