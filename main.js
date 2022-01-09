import "./style.css";

import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import hoverEffect from "hover-effect";

gsap.registerPlugin(ScrollTrigger);

const images = ["/sheep.png", "/linh.png", "/teo.png", "/sau.png"];

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "main",
    scrub: true,
    pin: true,
    start: "top",
    end: "bottom",
  },
});

[...new Array(images.length - 1)].forEach((_) => {
  tl.fromTo(".right-img", { rotate: 0 }, { rotate: -10 });
  tl.fromTo(".right-img", { rotate: -10 }, { rotate: 0 });
});

const effects = images.map(
  (image, index) =>
    new hoverEffect({
      parent: document.querySelector("#left-img-container"),
      intensity: 0.3,
      image1: image,
      image2: images[index + 1] || images[0],
      displacementImage: "/distortion.png",
      hover: false,
    })
);

const audio = new Audio("/sound.mp3");

let currentImage;
const handleImageChange = () => {
  if (scrollY === innerHeight) {
    window.scrollTo(0, 0);
  }

  let newImage = Math.floor(
    (window.scrollY / window.innerHeight) * images.length
  );

  if (currentImage !== newImage) {
    effects.forEach((effect) => effect.previous());

    document
      .querySelectorAll("canvas")
      .forEach((canvas) => (canvas.style.display = "none"));
    document.querySelectorAll("canvas")[newImage].style.display = "inherit";

    effects[newImage].next();

    currentImage = newImage;

    audio.play();
  }
};

handleImageChange();
window.addEventListener("scroll", handleImageChange);

ScrollTrigger.create({
  start: 1,
  end: () => ScrollTrigger.maxScroll(window) - 1,
  onLeaveBack: (self) => self.scroll(ScrollTrigger.maxScroll(window) - 2),
  onLeave: (self) => self.scroll(2),
}).scroll(2);
