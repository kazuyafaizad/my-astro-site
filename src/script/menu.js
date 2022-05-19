import { gsap } from "gsap";

var burgerTop = document.querySelector("#burger1");
var burgerMid = document.querySelector("#burger2");
var burgerBot = document.querySelector("#burger3");
var burgerSidebar = document.querySelector(".sidebar");
var sideText = document.querySelector(".sidetext");
var burgerWhole = document.querySelectorAll(".top, .bottom, .middle");

var tl = gsap.timeline({ paused: true, reversed: true });

tl.to(burgerTop, { duration: 0.2, rotation: 50 }, "cross")
  .to(burgerMid, { duration: 0.2, scale: 0 })
  .to(burgerBot, { duration: 0.2, rotation: -50 }, "cross")
  .to(burgerSidebar, { duration: 1, width: "70%" })
  .from(sideText, { duration: 0.5, opacity: 0, y: 25 }, 0.1)
  .to(sideText, { duration: 0.2, css: { color: "#000" } });

document.querySelector(".menu").onclick = function () {
  tl.reversed() ? tl.play() : tl.reverse();
};
