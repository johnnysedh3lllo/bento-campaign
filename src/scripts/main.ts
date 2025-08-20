import { gsap } from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(GSDevTools, SplitText, MorphSVGPlugin);

// DOM Elements
const sections = document.querySelectorAll(".section");
const headerHeading = document.querySelector(".header__heading");
const headerStars = document.querySelectorAll(".header__stars img");

const accountItems = document.querySelectorAll(".account__item");
const accountHeading = document.querySelectorAll(".account__heading");

const scheduleHeading = document.querySelector(".schedule__heading ");
const calendarWrapper = document.querySelector(".calendar__wrapper");
const initialDate = document.getElementById("date");
const tickedDate = document.getElementById("date--checked");

// Initialize SplitText
const reviewSplit = new SplitText(".header__reviews", {
  type: "words",
});

const accountHeadingSplit = new SplitText(accountHeading, {
  type: "words",
});

const scheduleHeadingSplit = new SplitText(scheduleHeading, {
  type: "words",
});

// Set initial states
function setInitialStates() {
  gsap.set(sections, { autoAlpha: 0, scale: 0.8 });
  gsap.set(headerHeading, { autoAlpha: 0, yPercent: -20 });
  gsap.set(headerStars, { scale: 0, yPercent: 20 });
  gsap.set(reviewSplit.words, { yPercent: 30, autoAlpha: 0 });
}

// Create main animation timeline
function createShowcaseAnimation() {
  const mainTl = gsap.timeline();

  mainTl.to(sections, {
    scale: 1,
    transformOrigin: "center center",
    stagger: 0.15,
    autoAlpha: 1,
    ease: "back(1)",
  });

  return mainTl;
}

function createHeaderAnimation(mainTl: GSAPTimeline) {
  mainTl
    .add("heading-animation")
    .fromTo(
      headerHeading,
      { autoAlpha: 0, yPercent: -20 },
      {
        autoAlpha: 1,
        yPercent: 0,
        stagger: {
          amount: 0.3,
        },
      },
      "0.3"
    )
    .add("stars-animation")
    .fromTo(
      headerStars,
      { scale: 0, yPercent: 20 },
      { scale: 1, yPercent: 0, stagger: 0.2, transformOrigin: "left center" },
      "0.3"
    )
    .fromTo(
      reviewSplit.words,
      { yPercent: 30, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, stagger: { amount: 0.2 } },
      "<"
    );

  return mainTl;
}

function createAccountAnimation(mainTl: GSAPTimeline) {
  mainTl
    .fromTo(
      accountItems,
      { autoAlpha: 0, xPercent: 10 },
      { autoAlpha: 1, xPercent: 0, stagger: 0.3 },
      "0.4"
    )
    .fromTo(
      accountHeadingSplit.words,
      { autoAlpha: 0, yPercent: 20 },
      { autoAlpha: 1, yPercent: 0, stagger: { amount: 0.3 } },
      "<"
    );
}

function createScheduleAnimation(mainTl: GSAPTimeline) {
  mainTl
    .fromTo(
      scheduleHeadingSplit.words,
      { autoAlpha: 0, xPercent: 10 },
      { autoAlpha: 1, xPercent: 0, stagger: { amount: 0.3 } },
      "0.45"
    )
    .fromTo(
      calendarWrapper,
      { autoAlpha: 0, yPercent: 30 },
      { autoAlpha: 1, yPercent: 0 },
      "<+=0.5"
    )
    // .fromTo(
    //   "#date--checked",
    //   { yPercent: 10 },
    //   { yPercent: 0, stagger: 0.5 },
    //   "<"
    // );
}

// Initialize animation
function init() {
  setInitialStates();
  const mainTl = createShowcaseAnimation();

  createHeaderAnimation(mainTl);
  createAccountAnimation(mainTl);
  createScheduleAnimation(mainTl);

  mainTl.play();
//   GSDevTools.create();
}

window.addEventListener("load", init);
