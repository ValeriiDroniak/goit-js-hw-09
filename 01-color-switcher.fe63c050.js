let t=null;const n={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};function e(t){t.disabled=!0}function o(t){t.disabled=!1}function a(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}n.startBtn.addEventListener("click",(function(r){a(),t=setInterval(a,1e3),e(r.target),o(n.stopBtn)})),n.stopBtn.addEventListener("click",(function(a){clearInterval(t),e(a.target),o(n.startBtn)})),e(n.stopBtn);
//# sourceMappingURL=01-color-switcher.fe63c050.js.map
