(function () {
  "use strict";
  var BREAK = "(min-width: 901px)";
  var toggle = document.getElementById("mob-toggle");
  var drawer = document.getElementById("mob-drawer");
  var root = document.documentElement;
  function setDrawer(open) {
    if (!toggle || !drawer) { return; }
    drawer.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    root.style.overflow = open ? "hidden" : "";
  }
  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      setDrawer(toggle.getAttribute("aria-expanded") !== "true");
    });
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) { setDrawer(false); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { setDrawer(false); closeDropdowns(); }
    });
    var mq = window.matchMedia(BREAK);
    var onChange = function (ev) { if (ev.matches) { setDrawer(false); } };
    if (mq.addEventListener) { mq.addEventListener("change", onChange); } else if (mq.addListener) { mq.addListener(onChange); }
  }
  function closeDropdowns() {
    var open = document.querySelectorAll(".has-dropdown.open");
    for (var i = 0; i < open.length; i++) {
      open[i].classList.remove("open");
      var b = open[i].querySelector(".dd-toggle");
      if (b) { b.setAttribute("aria-expanded", "false"); }
    }
  }
  var btns = document.querySelectorAll(".dd-toggle");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (e) {
      var li = e.currentTarget.closest(".has-dropdown");
      var wasOpen = li.classList.contains("open");
      closeDropdowns();
      if (!wasOpen) {
        li.classList.add("open");
        e.currentTarget.setAttribute("aria-expanded", "true");
      }
      e.stopPropagation();
    });
  }
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) { closeDropdowns(); }
  });
})();
