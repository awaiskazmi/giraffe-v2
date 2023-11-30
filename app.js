import * as config from "./vars.js";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

ScrollTrigger.defaults({
  // markers: true,
  duration: 0.4,
  ease: "expo.inOut",
});

const rikshaw = document.querySelector(".rikshaw");
const sun = document.querySelector(".sun");
const sky = document.body;
const tyres = gsap.utils.toArray(".front, .back");
const lampLights = gsap.utils.toArray(".lamp-light");

let rikshawLeftOffset = document.body.clientWidth;

// let sections = gsap.utils.toArray(".scroll-to");
let showcase = gsap.utils.toArray(".showcase");

// console.log(sections);

// function goToSection(i) {
//   gsap.to(window, {
//     scrollTo: { y: i * innerHeight, autoKill: false, ease: "expo.inOut" },
//     duration: 1,
//     ease: "expo.inOut",
//   });
// }

function resize() {
  rikshawLeftOffset = document.body.clientWidth;
}

ScrollTrigger.addEventListener("refreshInit", resize);
resize();

const rikshawTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#intro",
    start: "top top",
    // end: "bottom 100px",
    // end: "+=1000%",
    end: `+=${config.INTRO_SCROLL_LENGTH}`,
    scrub: 0.7,
    // pin: "#intro .container",
    pinSpacing: true,
    // spacer: true,
    invalidateOnRefresh: true,
  },
});

rikshawTimeline.fromTo(
  rikshaw,
  { left: () => rikshawLeftOffset + 100 },
  {
    left: () => -rikshaw.clientWidth - 100,
  },
  "rikshaw"
);

rikshawTimeline.fromTo(
  sky,
  { backgroundColor: () => config.DAY_COLOR },
  {
    backgroundColor: () => config.NIGHT_COLOR,
  },
  "rikshaw"
);

rikshawTimeline.fromTo(
  sun,
  { y: () => sun.clientHeight },
  {
    y: () => 2,
  },
  "rikshaw"
);

tyres.forEach((tyre, i) => {
  rikshawTimeline.to(
    tyre,
    {
      rotation: -360 * 5,
    },
    "rikshaw"
  );
});

lampLights.forEach((light, i) => {
  rikshawTimeline.to(
    light,
    {
      opacity: 0,
    },
    "rikshaw"
  );
});

const projectsBGTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#projects-bg",
    start: "top top",
    // end: `bottom top`,
    end: () =>
      `+=${
        document.getElementById("projects").clientHeight -
        document.getElementById("projects-spacer").clientHeight
      }`,
    scrub: 0.7,
    pin: "#projects-bg",
    pinSpacing: false,
    // invalidateOnRefresh: true,
  },
});

const projectElementsTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".project-elements",
    start: "top top",
    // end: `bottom top`,
    end: () =>
      `+=${
        document.getElementById("projects").clientHeight -
        document.getElementById("projects-spacer").clientHeight -
        document.getElementById("projects-bg").clientHeight
      }`,
    scrub: 0.7,
    pin: ".project-elements",
    pinSpacing: false,
    // invalidateOnRefresh: true,
  },
});

// const showcaseTimeline = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".showcase",
//     start: "top top",
//     end: `+=3000`,
//     scrub: 0.7,
//     pin: ".showcase",
//     pinSpacing: true,
//     // invalidateOnRefresh: true,
//   },
// });

showcase.forEach((panel, i) => {
  // const mainAnim = gsap.timeline({ paused: true });
  ScrollTrigger.create({
    trigger: panel,
    start: "top top",
    end: `+=1000`,
    scrub: 0.7,
    pin: panel,
    pinSpacing: true,
  });
  // ScrollTrigger.create({
  //   trigger: panel,
  //   start: "bottom bottom",
  //   onEnterBack: () => goToSection(i),
  // });
});

// sections.forEach((eachPanel, i) => {
// const mainAnim = gsap.timeline({ paused: true });
// ScrollTrigger.create({
//   trigger: eachPanel,
//   onEnter: () => goToSection(i),
// });
// ScrollTrigger.create({
//   trigger: eachPanel,
//   start: "bottom bottom",
//   onEnterBack: () => goToSection(i),
// });
// });

// rikshaw body bounce animation
if (config.ENABLE_RIKSHAW_BOUNCE) {
  gsap.to(".rikshaw-body", {
    duration: 0.07,
    y: 2,
    repeat: -1,
    ease: "circ.in",
    yoyo: true,
  });
}

// rikshawTimeline.scrollTrigger.refresh();

// gsap.to(window, {
//   scrollTo: { y: 0, autoKill: false, ease: "expo.inOut" },
// });
// gsap.to(".rikshaw", {
//   left: document.body.clientWidth,
// });
