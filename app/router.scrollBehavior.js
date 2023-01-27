export default function scrollBehavior () {
  return { x: 0, y: 0 }

  /* Delayed
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0 })
    }, 500)
  })
  */
}
