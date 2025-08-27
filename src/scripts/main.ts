import { gsap } from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { counterEffect, getRandomPositionValue } from "./utils";

gsap.registerPlugin(GSDevTools, SplitText, TextPlugin, ScrollTrigger);
gsap.registerEffect(counterEffect);
let matchMedia = gsap.matchMedia();

// TODO: REFACTOR ALL THIS
// DOM Elements
const sections = document.querySelectorAll(".section");

const header = document.querySelector(".header");
const headerHeading = document.querySelector(".header__heading");
const headerStars = document.querySelectorAll(".header__stars img");

const account = document.querySelector(".account");
const accountItems = document.querySelectorAll(".account__item");
const accountHeading = document.querySelectorAll(".account__heading");

const schedule = document.querySelector(".schedule");
const scheduleHeading = document.querySelector(".schedule__heading ");
const calendarWrapper = document.querySelector(".calendar__wrapper");

const insights = document.querySelector(".insights");
const insightsHeading = document.querySelector(".insights__heading");
const chartIllustration = document.querySelector(".chart-illustration");
const insightMostActive = document.querySelectorAll(".insights__most-active");
const insightMostActiveText = document.querySelectorAll(
  ".insights__most-active--text"
);
const insightChartBar = document.querySelectorAll(".insights__chart-bar");
const insightCaption = document.querySelector(".insights__caption");

const growth = document.querySelector(".growth");
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

const audience = document.querySelector(".audience");
const audienceHeading = document.querySelector(".audience__heading");
const audienceArrow = document.querySelector(".audience__arrow");
const audienceValue = document.querySelector(".audience__value");
const audienceCaption = document.querySelector(".audience__caption");
const audienceAvatars = document.querySelectorAll(
  ".audience__avatars .avatar__wrapper"
);

const cta = document.querySelector(".cta");
const ctaHeadingText = document.querySelector(".cta__heading p");
const ctaHeadingEmphasis = document.querySelector(".cta__heading em");
const ctaCursor = document.querySelector(".cta__cursor");
const ctaBtn = document.querySelector(".cta__button");
const ctaBtnIcon = document.querySelector(".cta__btn-icon");

const composition = document.querySelector(".composition");
const compositionHeading = document.querySelector(".composition__heading");

const compositionChat = document.querySelector(".composition__chat");
const compositionMessageUserAvatar = document.querySelector(
  ".composition__message--user .avatar"
);
const compositionBubbleUser = document.querySelector(
  ".composition__bubble--user"
);
const compositionBubbleUserText = document.querySelector(
  ".composition__bubble--user p"
);
const compositionMessageAiAvatar = document.querySelector(
  ".composition__message--ai .avatar--ai"
);
const compositionBubbleAi = document.querySelector(".composition__bubble--ai");
const compositionBubbleAiText = document.querySelector(
  ".composition__bubble--ai p"
);
const compositionIconAnimate = document.querySelectorAll(".icon--animate");

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

const sectionAnimationConfig = {
  scale: 1,
  transformOrigin: "center center",
  stagger: 0.15,
  autoAlpha: 1,
  ease: "back(1)",
};

// Create main animation timeline
function createShowcaseAnimation() {
  const mainTl = gsap.timeline();

  matchMedia.add("(min-width: 1279px)", () => {
    mainTl.to(sections, sectionAnimationConfig);
  });

  return mainTl;
}

function createHeaderAnimation(mainTl: GSAPTimeline) {
  matchMedia.add("(max-width: 1278px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: account,
          start: "top 80%",
        },
      })
      .to(header, sectionAnimationConfig)
      .fromTo(
        headerHeading,
        { autoAlpha: 0, yPercent: -20 },
        {
          autoAlpha: 1,
          yPercent: 0,
          stagger: {
            amount: 0.3,
          },
        }
      )
      .add("stars-animation")
      .fromTo(
        headerStars,
        { scale: 0, yPercent: 20 },
        {
          scale: 1,
          yPercent: 0,
          stagger: 0.2,
          transformOrigin: "left center",
        },
        "0.3"
      )
      .fromTo(
        reviewSplit.words,
        { yPercent: 30, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, stagger: { amount: 0.2 } },
        "<"
      );
  });

  matchMedia.add("(min-width: 1279px)", () => {
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
  });

  return mainTl;
}

function createAccountAnimation(mainTl: GSAPTimeline) {
  matchMedia.add("(max-width: 1278px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: account,
          start: "top 80%", // adjust as needed
        },
      })
      .to(account, sectionAnimationConfig)
      .fromTo(
        accountItems,
        { autoAlpha: 0, xPercent: 10 },
        { autoAlpha: 1, xPercent: 0, stagger: 0.3 }
      )
      .fromTo(
        accountHeadingSplit.words,
        { autoAlpha: 0, yPercent: 20 },
        { autoAlpha: 1, yPercent: 0, stagger: { amount: 0.3 } },
        "<"
      );
  });

  matchMedia.add("(min-width: 1279px)", () => {
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
  });
}

function createScheduleAnimation(mainTl: GSAPTimeline) {
  matchMedia.add("(max-width: 1278px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: schedule,
          start: "top 80%",
        },
      })
      .to(schedule, sectionAnimationConfig)
      .fromTo(
        scheduleHeadingSplit.words,
        { autoAlpha: 0, xPercent: 10 },
        { autoAlpha: 1, xPercent: 0, stagger: { amount: 0.3 } }
      )
      .fromTo(
        calendarWrapper,
        { autoAlpha: 0, yPercent: 30 },
        { autoAlpha: 1, yPercent: 0 },
        "<+=0.5"
      );
  });

  matchMedia.add("(min-width: 1279px)", () => {
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
  });
}

function createInsightsAnimation(mainTl: GSAPTimeline) {
  matchMedia.add("(max-width: 1278px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: insights,
          start: "top 80%",
        },
      })
      .to(insights, sectionAnimationConfig)
      .fromTo(
        insightsHeading,
        { autoAlpha: 0, xPercent: 20 },
        { autoAlpha: 1, xPercent: 1 }
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
  });

  matchMedia.add("(min-width: 1279px)", () => {
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
  });
}

function createGrowthAnimation(mainTl: GSAPTimeline) {
  matchMedia.add("(max-width: 1278px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: growth,
          start: "top 90%",
        },
      })
      .to(growth, sectionAnimationConfig)
      .fromTo(
        growthHeadingSplit.words,
        { autoAlpha: 0, xPercent: 20, yPercent: 20 },
        {
          autoAlpha: 1,
          xPercent: 0,
          yPercent: 0,
          stagger: { amount: 0.3 },
        }
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
      .fromTo(
        badgeTotal,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.1 },
        "2"
      )
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
      .counter(
        badgeTotalAmount,
        { duration: 1, end: 490, increment: 1 },
        "1.6"
      );
  });

  matchMedia.add("(min-width: 1279px)", () => {
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
      .fromTo(
        badgeTotal,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.1 },
        "2"
      )
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
      .counter(
        badgeTotalAmount,
        { duration: 1, end: 490, increment: 1 },
        "1.6"
      );
  });
}

function createAudienceAnimation(mainTl: GSAPTimeline) {
  matchMedia.add("(max-width: 1278px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: audience,
          start: "top 80%",
        },
      })
      .to(audience, sectionAnimationConfig)
      .fromTo(audienceHeading, { autoAlpha: 0 }, { autoAlpha: 1 })
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
  });

  matchMedia.add("(min-width: 1279px)", () => {
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
  });
}

function createCTAAnimation(mainTl: GSAPTimeline) {
  matchMedia.add("(max-width: 1278px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: cta,
          start: "top 80%",
        },
      })
      .to(cta, sectionAnimationConfig)
      .fromTo(
        ctaHeadingTextSplit.words,
        { xPercent: -2, yPercent: 110 },
        { xPercent: 0, yPercent: 0, stagger: { amount: 0.3 } }
      )
      .fromTo(
        ctaHeadingEmphasis,
        { xPercent: -250 },
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
      .to(
        ctaBtn,
        { scale: 0.9, yoyo: true, repeat: 1, duration: 0.2 },
        ">+=0.1"
      );
  });

  matchMedia.add("(min-width: 1279px)", () => {
    mainTl
      .fromTo(
        ctaHeadingTextSplit.words,
        { xPercent: -2, yPercent: 110 },
        { xPercent: 0, yPercent: 0, stagger: { amount: 0.3 } },
        "1.3"
      )
      .fromTo(
        ctaHeadingEmphasis,
        { xPercent: -250 },
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
      .to(
        ctaBtn,
        { scale: 0.9, yoyo: true, repeat: 1, duration: 0.2 },
        ">+=0.1"
      );
  });
}

function createCompositionAnimation(mainTl: GSAPTimeline) {
  matchMedia.add("(max-width: 1278px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: composition,
          start: "top 80%",
        },
      })
      .to(composition, sectionAnimationConfig)
      .fromTo(
        compositionHeadingSplit.words,
        { xPercent: -2, yPercent: -135 },
        { xPercent: 0, yPercent: 0, stagger: { amount: 0.4 } }
      )
      .fromTo(
        compositionChat,
        { xPercent: 130 },
        { xPercent: 0, ease: "back.out(1)" },
        "<+=0.1"
      )
      .fromTo(
        compositionMessageUserAvatar,
        { scale: 0 },
        { scale: 1 },
        ">+=0.15"
      )
      .fromTo(
        compositionBubbleUser,
        { yPercent: 20, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1 },
        "<+=0.2"
      )
      .to(
        compositionBubbleUserText,
        {
          text: "Give me a 5 tips to growth my follower on Insta!",
          duration: 1.25,
          ease: "power1.in",
        },
        "<-=0.5"
      )
      .fromTo(
        compositionMessageAiAvatar,
        { scale: 0 },
        { scale: 1, ease: "back.out(2)" },
        ">"
      )
      .fromTo(
        compositionBubbleAi,
        { yPercent: 20, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1 },
        "<"
      )
      .to(
        compositionBubbleAiText,
        {
          text: "Certainly! Here are five tips to help you grow your Instagram account:",
          duration: 1.25,
          ease: "power1.in",
        },
        "<-=0.5"
      )
      .fromTo(
        compositionIconAnimate,
        { scale: 0 },
        { scale: 1, stagger: { amount: 0.3 }, ease: "back.out(2)" },
        "<-=1"
      );
  });

  matchMedia.add("(min-width: 1279px)", () => {
    mainTl
      .fromTo(
        compositionHeadingSplit.words,
        { xPercent: -2, yPercent: -135 },
        { xPercent: 0, yPercent: 0, stagger: { amount: 0.4 } },
        "1.4"
      )
      .fromTo(
        compositionChat,
        { xPercent: 130 },
        { xPercent: 0, ease: "back.out(1)" },
        "<+=0.1"
      )
      .fromTo(
        compositionMessageUserAvatar,
        { scale: 0 },
        { scale: 1 },
        ">+=0.15"
      )
      .fromTo(
        compositionBubbleUser,
        { yPercent: 20, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1 },
        "<+=0.2"
      )
      .to(
        compositionBubbleUserText,
        {
          text: "Give me a 5 tips to growth my follower on Insta!",
          duration: 1.25,
          ease: "power1.in",
        },
        "<-=0.5"
      )
      .fromTo(
        compositionMessageAiAvatar,
        { scale: 0 },
        { scale: 1, ease: "back.out(2)" },
        ">"
      )
      .fromTo(
        compositionBubbleAi,
        { yPercent: 20, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1 },
        "<"
      )
      .to(
        compositionBubbleAiText,
        {
          text: "Certainly! Here are five tips to help you grow your Instagram account:",
          duration: 1.25,
          ease: "power1.in",
        },
        "<-=0.5"
      )
      .fromTo(
        compositionIconAnimate,
        { scale: 0 },
        { scale: 1, stagger: { amount: 0.3 }, ease: "back.out(2)" },
        "<-=1"
      );
  });
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

  //   GSDevTools.create();
}

// Disable browser scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", init);
