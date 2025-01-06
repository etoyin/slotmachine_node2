import barba from "@barba/core";
import { TweenMax } from "gsap";

const animate = (el, duration, props) =>
  new Promise(resolve => {
    TweenMax.to(el, duration, { ...props, onComplete: () => resolve() });
  });

barba.init({
  debug: true,
  transitions: [
    {
      name: "fade",
      leave({ current }) {
        return animate(current.container, 0.5, { autoAlpha: 0 });
      },
      enter({ next }) {
        TweenMax.set(next.container, { autoAlpha: 0 });
        return animate(next.container, 0.5, { autoAlpha: 1 });
      }
    }
  ],
  views: [
    {
      namespace: "landing_page",
      beforeAppear() {
        alert("before appear Landing Page");
      }
    },
    {
      namespace: "game_page",
      beforeAppear() {
        alert("before appear about");
      }
    },
    {
        namespace: "fund_page",
        beforeAppear() {
          alert("before appear about");
        }
    },
    {
        namespace: "payment_page",
        beforeAppear() {
          alert("before appear about");
        }
    },
    {
        namespace: "card_page",
        beforeAppear() {
          alert("before appear about");
        }
    },
  ]
});
