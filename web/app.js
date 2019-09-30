// * aggiunta del burger nella navbar
function navMenu() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const liMenu = document.querySelectorAll(".menu li");
  const clearselection = () =>
    liMenu.forEach(li => li.classList.remove("selected"));
  const toggleMenu = () => {
    burger.classList.toggle("toggle");
    menu.classList.toggle("menu-active");
    liMenu.forEach((link, index) => {
      link.style.animation = link.style.animation
        ? ""
        : `menuLiAnimation 1s ease forwards ${index / 7}s`;
    });
  };

  liMenu.forEach(li => {
    li.addEventListener("click", () => {
      clearselection();
      li.classList.add("selected");
      menu.classList.toggle("menu-active");
      burger.classList.toggle("toggle");
    });
  });
  burger.addEventListener("click", toggleMenu);
}

function locale() {
  const liOption = document.querySelectorAll(".option li");
  liOption.forEach(li => {
    li.addEventListener("click", () => {
      let active = document.querySelector(".option li.selected");
      active.classList.remove("selected");
      li.classList.add("selected");
    });
  });

  // *DOM object utili per le animazioni
  let domElements = {
    time: time2Seconds(0, 25, 0),
    audio: document.querySelector(".squeeze"),
    countDown: document.querySelector(".countdown"),
    timerDisplay: document.querySelector(".timerdisplay"),
    commands: document.querySelector(".commands"),
    text: document.querySelector(".text"),
    circle: document.querySelector(".circle"),
    restartpath: document.querySelector(".restarttext"),
    restartingBtn: document.querySelector(".restarting"),
    commandBar: document.querySelector(".commandBar"),
    restartsvg: document.querySelector(".reinittext"),
    circonferenza: 2 * Math.PI * 50
  };
  let flag = false;

  let animator = new Animator(
    commandBarAnimationPlay,
    {
      duration: 1500,
      easing: "easeOutExpo",
      autoplay: false
    },
    domElements
  );

  //*Callback di tick del timer
  function tickTock(index) {
    domElements.countDown.innerHTML = seconds2Time(domElements.time - index);
    domElements.circle.style.strokeDashoffset =
      (domElements.circonferenza / domElements.time) * index;
  }

  // *Callback di conclusione del timer
  function endAnimation() {
    animator.animateNewCallback(endTimerAnimation);
  }

  domElements.timer = new StudyTimer(domElements.time, tickTock);
  domElements.timer.addPostCallback(endAnimation);

  document.querySelector("a[href='#Study']").addEventListener("click", () => {
    domElements.time = time2Seconds(0, 25, 0);
    domElements.timer.restart();
    domElements.timer.reset(domElements.time);
  });

  document.querySelector("a[href='#Break']").addEventListener("click", () => {
    domElements.time = time2Seconds(0, 5, 0);
    domElements.timer.restart();
    domElements.timer.reset(domElements.time);
  });

  document.querySelector("a[href='#LBreak']").addEventListener("click", () => {
    domElements.time = time2Seconds(0, 10, 0);
    domElements.timer.restart();
    domElements.timer.reset(domElements.time);
  });

  // *Callback commandBar starting 'n pausing
  function commandBarCallback() {
    if (flag) {
      animator.animateNewCallback(commandBarAnimationPlay);
      domElements.timer.resume();
    } else {
      domElements.timer.pause();
      animator.animateNewCallback(commandBarAnimationPause);
    }
    flag = !flag;
  }

  // *Callback di animazione del testo
  function textClickCallback() {
    domElements.timerDisplay.classList.remove("play");
    animator.animateNewCallback(startTextAnimation);
    domElements.timerDisplay.removeEventListener("click", textClickCallback);
  }

  // *Funzione di inizializzazione animazioni
  function init() {
    domElements.commandBar.classList.toggle("toggle");
    domElements.restartingBtn.innerHTML = "Pause";
    flag = false;
    domElements.timer.restart();
    domElements.restartsvg.style.display = "none";
    domElements.restartpath.style.strokeDashoffset = "-220";
    domElements.circle.style.strokeDasharray = domElements.circonferenza;
    domElements.circle.style.strokeDashoffset = domElements.circonferenza;
    domElements.commands.style.display = "none";
    domElements.commands.style.cursor = "auto";
    animator.animateNewCallback(initAnimation);
    domElements.timerDisplay.addEventListener("click", textClickCallback);
    domElements.commands.addEventListener("click", commandBarCallback);
  }

  // callback di animazione della svg di restarting
  domElements.restartsvg.addEventListener("click", () => {
    animator
      .animateNewConfigAndNewCallback(restartAnimation, {
        duration: 1000,
        easing: "easeInExpo"
      })
      .then(() => init());
  });
  init();
}
