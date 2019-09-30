$(function() {
  let flag = true;
  let throt = true;
  let cards;
  let windowH;
  let presentazione = document.querySelector(".presentazione");
  let openSvg = document.querySelector(".openSvg");
  let tryIt = document.querySelector(".tryIt");
  let animation = anime({
    targets: ".nav-exe-svg",
    d: [
      {
        value: [
          "M520.5 0H0L0 521L521 355V0.5Z",
          "M521 0H0L327 121.5L521 357V0Z"
        ]
      }
    ],
    duration: 750,
    easing: "easeOutQuad",
    autoplay: false
  });
  animation.play();

  $(".openSvg").click(() => {
    openSvg.classList.toggle("toBottomLeft");
    presentazione.classList.toggle("bottomleft");
    tryIt.classList.toggle("topToCenterAnimation");
    animation.reverse();
    animation.play();
  });

  function loading() {
    cards = document.querySelectorAll(".card");
    windowH = window.innerHeight;
  }

  function debounce(func, delay) {
    let inDebounce;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  }

  function checkPos() {
    cards.forEach(element => {
      let pos = element.getBoundingClientRect().top;
      svg = element.children[0].children[0];
      paths = svg.children;
      if (pos - windowH <= 0) {
        element.classList.remove("cardtransit");
        svg.classList.add("fillanim");
        for (let i = 0; i < paths.length; i++) {
          paths[i].classList.add("fabsvg");
        }
      } else {
        element.classList.add("cardtransit");
        svg.classList.remove("fillanim");
        for (let i = 0; i < paths.length; i++) {
          paths[i].classList.remove("fabsvg");
        }
      }
    });
  }

  $("#Contact div").click(e => {
    $("#Contact div.active").removeClass("active");
    e.currentTarget.classList.add("active");
    e.currentTarget.classList.add("focused");
    e.currentTarget.children[0].focus();
  });

  $("#Contact textarea").focus(() => {
    $("#Contact div.active").removeClass("active");
  });

  window.addEventListener("scroll", debounce(checkPos, 100));
  window.addEventListener("resize", loading);

  $("a").on("click", e => {
    let w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    let offset = w >= 768 ? 0 : 50;
    let hash = e.currentTarget.hash;
    if (hash !== "") {
      e.preventDefault();
      $("html, body").animate(
        { scrollTop: $(hash).offset().top - offset },
        800,
        () => console.log("ye") //(window.location.hash = hash)
      );
    }
  });

  loading();
  checkPos();
  navMenu();
});
