export default {
  de: {
    title: "Experimente",
    openDescription: "Beschreibung lesen",
    description: "Beschreibung",
    links: "Links",
    seoDescription: "Entdecke meine experimentelle Projekte, die ich vor allem mit Three.js umgesetzt habe",
    seoImage: "/og-image/og-image-experiments-de.jpg",
    detailedExperiments: {
      coin: {
        slug: "coin-flip",
        title: "Coin Flip",
        subline: "Animierte Goldmünze mit Flip-Funktion auf Klick",
      },
      tetrahedron: {
        slug: "tetrahedron",
        title: "Tetrahedron",
        subline: "Tetrahedron mit dynamischer Lichtquelle",
      },
      iceCube: {
        slug: "iceCube",
        title: "Eiswürfel",
        subline: "Transmission- und Lichtbrechungsmaterialen",
      },
      angularGradient: {
        slug: "angular-gradient",
        title: "Verlauf",
        subline: "Dynamischer Verlaufs-Hintergrund",
      }
    },
    moreExperimentsTitle: "Weitere Experimente",
    moreExperiments: [
      {
        slug: "raycasting-demo",
        title: "Raycasting Demo",
        link: "http://dev.lucasdietrich.de/lucasdietrich/frameworks/webgl/cube-group-raycasting.html",
        tags: ["rayCasting", "orbitControls"]
      },
      {
        slug: "cursor-light",
        title: "Cursor-Licht",
        link: "http://dev.lucasdietrich.de/lucasdietrich/frameworks/webgl/cursor-light.html",
        tags: ["orbitControls"]
      },
      {
        slug: "spheres-pattern",
        title: "Dynamisches Kreise-Muster",
        link: "http://dev.lucasdietrich.de/lucasdietrich/frameworks/webgl/pattern-of-spheres.html",
      },
      {
        slug: "particles-sphere",
        title: "Partikel-Sphäre",
        link: "http://dev.lucasdietrich.de/lucasdietrich/frameworks/webgl/particle-sphere-v4-vogels-method.html",
        tags: ["mathVogelsMethod", "orbitControls"]
      },
      {
        slug: "starry-night",
        title: "Sternenhimmel",
        link: "http://dev.lucasdietrich.de/lucasdietrich/frameworks/webgl/particle-starry-sky.html",
        tags: ["orbitControls"]
      }
    ],
    tags: {
      orbitControls: {
        text: "Orbit Controls",
        tooltip: "In diesem Experiment kannst du mit der Maus die Kamera um die Szene herum bewegen",
      },
      rayCasting: {
        text: "Raycasting",
        tooltip: "In diesem Experiment kannst du mit der Maus auf die Objekte klicken",
      },
      mathVogelsMethod: {
        text: "Gleichung",
        tooltip: "In diesem Experiment habe ich die \"Vogel's method\" in Three.js angewandt, um die Position der Partikel gleichmäßig zu verteilen",
      }
    }
  },
  en: {
    title: "Experiments",
    openDescription: "Read description",
    description: "Description",
    links: "Links",
    seoDescription: "Discover my experimental projects which I have mainly developed with Three.js",
    seoImage: "/og-image/og-image-experiments-en.jpg",
    detailedExperiments: {
      coin: {
        slug: "coin-flip",
        title: "Coin Flip",
        subline: "Animated Gold Coin with flip functionality on click",
      },
      tetrahedron: {
        slug: "tetrahedron",
        title: "Tetrahedron",
        subline: "Tetrahedron with dynamic light source",
      },
      iceCube: {
        slug: "iceCube",
        title: "Ice Cube",
        subline: "Transmission and refraction materials",
      },
      angularGradient: {
        slug: "angular-gradient",
        title: "Angular Gradient",
        subline: "Dynamic background with angular gradient",
      }
    },
    moreExperimentsTitle: "More experiments",
    moreExperiments: [
      {
        slug: "raycasting-demo",
        title: "Raycasting Demo",
        link: "http://dev.lucasdietrich.de/lucasdietrich/frameworks/webgl/cube-group-raycasting.html",
        tags: ["rayCasting", "orbitControls"]
      },
      {
        slug: "cursor-light",
        title: "Cursor Light",
        link: "http://dev.lucasdietrich.de/lucasdietrich/frameworks/webgl/cursor-light.html",
        tags: ["orbitControls"]
      },
      {
        slug: "spheres-pattern",
        title: "Sphere Pattern",
        link: "http://dev.lucasdietrich.de/lucasdietrich/frameworks/webgl/pattern-of-spheres.html",
      },
      {
        slug: "particles-sphere",
        title: "Particles Sphere",
        link: "http://dev.lucasdietrich.de/lucasdietrich/frameworks/webgl/particle-sphere-v4-vogels-method.html",
        tags: ["mathVogelsMethod", "orbitControls"]
      },
      {
        slug: "starry-night",
        title: "Starry Night",
        link: "http://dev.lucasdietrich.de/lucasdietrich/frameworks/webgl/particle-starry-sky.html",
        tags: ["orbitControls"]
      }
    ],
    tags: {
      orbitControls: {
        text: "Orbit Controls",
        tooltip: "In this experiment you are able rotate the scene with clicking and dragging your mouse or finger on touchscreens"
      },
      rayCasting: {
        text: "Raycasting",
        tooltip: "In this experiment you are able to click on the elements with your mouse"
      },
      mathVogelsMethod: {
        text: "Maths",
        tooltip: "In this experiment I adapted Vogel's method to equally distribute the particles on the sphere surface for Three.js"
      }
    }
  }
}
