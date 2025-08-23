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

// const initialDate = document.getElementById("date");
// const tickedDate = document.getElementById("date--checked");

const insightsHeading = document.querySelector(".insights__heading");
const chartIllustration = document.querySelector(".chart-illustration");
const insightMostActive = document.querySelectorAll(".insights__most-active");
const insightMostActiveText = document.querySelectorAll(
  ".insights__most-active--text"
);
const insightChartBar = document.querySelectorAll(".insights__chart-bar");
const insightCaption = document.querySelector(".insights__caption");

const growthHeading = document.querySelector(".growth__heading");
const growthChart = document.querySelector(".chart");
const growthChartBars = document.querySelectorAll(".growth-chart-bars");
const growthChartHeading = document.querySelector(".chart__heading");
const growthChartFollowers = document.querySelector(".chart__followers");
const badgeTotal = document.querySelector(".badge--total");
const badgeTotalAmount = document.querySelector(".badge--total span");
const genericAccountItem = document.querySelector(".account__item--generic");

const genericAccountFollowers = document.querySelector(
  ".account__followers--generic"
);
const badgeAccount = document.querySelector(".badge--account span");

const audienceHeading = document.querySelector(".audience__heading");
const audienceArrow = document.querySelector(".audience__arrow");
const audienceValue = document.querySelector(".audience__value");
const audienceCaption = document.querySelector(".audience__caption");
const audienceAvatars = document.querySelectorAll(".audience__avatars .avatar");

const ctaHeadingText = document.querySelector(".cta__heading p");
const ctaHeadingEmphasis = document.querySelector(".cta__heading em");
const ctaCursor = document.querySelector(".cta__cursor");
const ctaBtn = document.querySelector(".cta__button");
const ctaBtnIcon = document.querySelector(".cta__btn-icon");

const compositionHeading = document.querySelector(".composition__heading");

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

const growthHeadingSplit = new SplitText(growthHeading, {
  type: "words",
});

const counterEffect = {
  name: "counter",
  extendTimeline: true,
  defaults: {
    end: 0,
    duration: 0.5,
    ease: "power1",
    increment: 1,
  },
  effect: (targets: any, config: any) => {
    let timeline = gsap.timeline();

    console.log("targets", targets[0].innerText);
    let num = targets[0].innerText.replace(/\,/g, "");
    console.log("num", num);

    targets[0].innerText = num;

    timeline.to(
      targets,
      {
        duration: config.duration,
        innerText: config.end,
        modifiers: {
          innerText: function (innerText) {
            return gsap.utils
              .snap(config.increment, innerText)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
        },
        ease: config.ease,
      },
      0
    );

    return timeline;
  },
};

const audienceCaptionSplit = new SplitText(audienceCaption, {
  type: "words",
});

const ctaHeadingTextSplit = new SplitText(ctaHeadingText, {
  type: "lines, words",
  mask: "words",
});

const compositionHeadingSplit = new SplitText(compositionHeading, {
  type: "lines, words",
  mask: "words",
});

console.log(ctaHeadingText);
console.log(compositionHeading);

gsap.registerEffect(counterEffect);

// Set initial states
function setInitialStates() {
  gsap.set(sections, { autoAlpha: 0, scale: 0.8 });
  gsap.set(headerHeading, { autoAlpha: 0, yPercent: -20 });
  gsap.set(headerStars, { scale: 0, yPercent: 20 });
  gsap.set(reviewSplit.words, { yPercent: 30, autoAlpha: 0 });
  gsap.set(ctaHeadingTextSplit.masks, {
    overflow: "visible",
    clipPath: "inset(0% -5% -14%)",
  });
  gsap.set(compositionHeadingSplit.masks, {
    overflow: "visible",
    clipPath: "inset(0% -5% -14%)",
  });
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
      "0.5"
    )
    .fromTo(
      calendarWrapper,
      { autoAlpha: 0, yPercent: 30 },
      { autoAlpha: 1, yPercent: 0 },
      "<+=0.5"
    );
  // .fromTo(
  //   "#date--checked",
  //   { yPercent: 10 },
  //   { yPercent: 0, stagger: 0.5 },
  //   "<"
  // );
}

function createInsightsAnimation(mainTl: GSAPTimeline) {
  console.log("insight chart bar", insightChartBar);

  mainTl
    .fromTo(
      insightsHeading,
      { autoAlpha: 0, xPercent: 20 },
      { autoAlpha: 1, xPercent: 1 },
      "0.7"
    )
    .fromTo(
      chartIllustration,
      { autoAlpha: 0, xPercent: 10 },
      { autoAlpha: 1, xPercent: 0 },
      "<+=0.2"
    )
    .fromTo(
      insightCaption,
      { autoAlpha: 0, yPercent: -10 },
      { autoAlpha: 1, yPercent: 0 },
      "<"
    )
    .fromTo(
      insightChartBar,
      { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1, stagger: 0.1, ease: "back.out(1)" },
      "<+=0.1"
    )
    .fromTo(insightMostActive, { scale: 0 }, { scale: 1 }, "<+=0.1")
    .fromTo(
      insightMostActiveText,
      { autoAlpha: 0, yPercent: 20 },
      { autoAlpha: 1, yPercent: 0, duration: 0.7, ease: "back.inOut(7)" },
      ">"
    );
}

function createGrowthAnimation(mainTl: GSAPTimeline) {
  mainTl
    .fromTo(
      growthHeadingSplit.words,
      { autoAlpha: 0, xPercent: 20, yPercent: 20 },
      { autoAlpha: 1, xPercent: 0, yPercent: 0, stagger: { amount: 0.3 } },
      "0.9"
    )
    .fromTo(
      growthChart,
      { autoAlpha: 0, xPercent: -10 },
      { autoAlpha: 1, xPercent: 0 },
      "<+=0.5"
    )
    .fromTo(
      growthChartBars,
      { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1, stagger: 0.1, ease: "back.out" },
      "<+=0.1"
    )
    .fromTo(
      growthChartHeading,
      { autoAlpha: 0, yPercent: -10 },
      { autoAlpha: 1, yPercent: 0 },
      "<+=0.2"
    )
    .fromTo(growthChartFollowers, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
    .fromTo(badgeTotal, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, "2")
    .fromTo(
      genericAccountItem,
      { autoAlpha: 0, yPercent: 10 },
      { autoAlpha: 1, yPercent: 0 },
      "2.1"
    )
    .counter(
      genericAccountFollowers,
      { duration: 1, end: 89532, increment: 1 },
      "1.5"
    )
    .counter(badgeAccount, { duration: 1, end: 120, increment: 1 }, "1.6")
    .counter(
      growthChartFollowers,
      { duration: 1, end: 20642, increment: 1 },
      "1.5"
    )
    .counter(badgeTotalAmount, { duration: 1, end: 490, increment: 1 }, "1.6");
}

function createAudienceAnimation(mainTl: GSAPTimeline) {
  mainTl
    .fromTo(audienceHeading, { autoAlpha: 0 }, { autoAlpha: 1 }, "1.1")
    .fromTo(
      audienceCaptionSplit.words,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, stagger: { amount: 0.2 } },
      "<+=0.3"
    )
    .fromTo(audienceAvatars, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
    .fromTo(
      audienceAvatars,
      { xPercent: -130 },
      { xPercent: 0, stagger: { amount: 0.5 }, ease: "expo.inOUt" },
      "<+=0.2"
    )
    .fromTo(
      audienceArrow,
      { autoAlpha: 0, x: -10 },
      { autoAlpha: 1, x: 0, ease: "back.out(5)" },
      "1.8"
    )
    .counter(audienceValue, { duration: 1, end: 56, increment: 1 }, "0.9");
}

function getRandomPositionValue(limit: number) {
  const min = -limit;
  const max = limit;

  const randomPosition = Math.floor(Math.random() * (max - min + 1) + min);
  return randomPosition;
}

function createCTAAnimation(mainTl: GSAPTimeline) {
  mainTl
    .fromTo(
      ctaHeadingTextSplit.words,
      { xPercent: -2, yPercent: 105 },
      { xPercent: 0, yPercent: 0, stagger: { amount: 0.3 } },
      "1.3"
    )
    .fromTo(
      ctaHeadingEmphasis,
      { xPercent: -150 },
      { xPercent: 0, ease: "elastic.out(1.5,0.25)" },
      ">"
    )
    .fromTo(ctaBtn, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0 }, "<+=0.2")
    .fromTo(
      ctaBtnIcon,
      { scale: 0.5 },
      { rotate: 360, duration: 1, scale: 1, ease: "power2.out" },
      ">-=0.5"
    )
    .fromTo(
      ctaCursor,
      {
        autoAlpha: 0,
        x: getRandomPositionValue(30),
        y: getRandomPositionValue(50),
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
      },
      "<+=0.2"
    )
    .to(ctaBtn, { scale: 0.9, yoyo: true, repeat: 1, duration: 0.2 }, ">+=0.1");
}

function createCompositionAnimation(mainTl: GSAPTimeline) {
  mainTl.fromTo(
    compositionHeadingSplit.words,
    { xPercent: -2, yPercent: -135 },
    { xPercent: 0, yPercent: 0, stagger: { amount: 0.4 } },
    "1.4"
  );
}

// Initialize animation
function init() {
  setInitialStates();
  const mainTl = createShowcaseAnimation();

  createHeaderAnimation(mainTl);
  createAccountAnimation(mainTl);
  createScheduleAnimation(mainTl);
  createInsightsAnimation(mainTl);
  createGrowthAnimation(mainTl);
  createAudienceAnimation(mainTl);
  createCTAAnimation(mainTl);
  createCompositionAnimation(mainTl);

  mainTl.play();
  GSDevTools.create();
}

// Disable browser scroll restoration
// if ("scrollRestoration" in history) {
//  history.scrollRestoration = "manual";
// }

// window.addEventListener("load", init);

document.addEventListener("DOMContentLoaded", init);
