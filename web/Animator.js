class Animator {
  constructor(animationCallback, animeConfig, domElements) {
    this.domElements = domElements;
    this.animationCallback = animationCallback;
    this.config = animeConfig;
    this.animation = anime.timeline(animeConfig);
  }

  async animateNewConfigAndNewCallback(callback, config) {
    this.animation.pause();
    this.animation.seek(this.animation.duration);
    this.animation = anime.timeline(config);
    callback(this.animation, this.domElements);
    this.animation.play();
    return this.animation.finished;
  }

  async animateNewCallback(callback) {
    return this.animateNewConfigAndNewCallback(callback, this.config);
  }

  async animate() {
    return this.animateNewConfigAndNewCallback(
      this.animationCallback,
      this.config
    );
  }
}

function commandBarAnimationPlay(animeMe, domElements) {
  animeMe
    .add(
      {
        targets: [".commands", ".countdown"],
        opacity: [0, 1],
        begin: () => {
          domElements.restartingBtn.innerHTML = "Pause";
          domElements.commandBar.classList.add("toggle");
          domElements.restartsvg.style.cursor = "auto";
        }
      },
      0
    )
    .add(
      {
        targets: ".restarttext",
        strokeDashoffset: [0, -220],
        complete: () => {
          domElements.restartsvg.style.display = "none";
        }
      },
      0
    );
}

function commandBarAnimationPause(animeMe, domElements) {
  animeMe
    .add({ targets: ".commands", opacity: [0, 1] })
    .add(
      {
        targets: ".countdown",
        opacity: [1, 0]
      },
      0
    )
    .add(
      {
        targets: ".restarttext",
        strokeDashoffset: [-220, 0],
        begin: () => {
          domElements.restartingBtn.innerHTML = "Resume";
          domElements.commandBar.classList.remove("toggle");
          domElements.restartsvg.style.display = "block";
          domElements.restartsvg.style.cursor = "pointer";
        }
      },
      0
    );
}

function endTimerAnimation(animeMe, domElements) {
  animeMe
    .add({
      targets: [".commands", ".countdown"],
      opacity: [1, 0],
      complete: () => {
        domElements.commands.style.cursor = "auto";
        domElements.commands.style.display = "none";
        domElements.restartsvg.style.display = "block";
      }
    })
    .add({
      targets: ".restarttext",
      strokeDashoffset: [-220, 0],
      begin: () => {
        domElements.audio.loop = true;
        domElements.audio.volume = 1;
        domElements.audio.play();
      },
      complete: () => {
        domElements.restartsvg.style.cursor = "pointer";
        domElements.commandBar.classList.toggle("toggle");
      }
    });
}

function startTextAnimation(animeMe, domElements) {
  animeMe
    .add({
      targets: ".text",
      strokeDashoffset: 250,
      complete: () => {
        domElements.text.style.display = "none";
        domElements.timerDisplay.style.cursor = "auto";
      }
    })
    .add({ targets: ".countTimer", opacity: 1 }, 1500)
    .add(
      {
        targets: ".circle",
        strokeDashoffset: [domElements.circonferenza, 0],
        strokeDasharray: domElements.circonferenza
      },
      1500
    )
    .add(
      {
        targets: ".countdown",
        opacity: 1,
        complete: () => {
          domElements.timer.play();
          domElements.commands.style.display = "flex";
        }
      },
      1500
    )
    .add({
      targets: ".commands",
      opacity: [0, 1],
      translateX: ["-100%", "10%"],
      begin: () => (domElements.commands.style.cursor = "pointer")
    });
}

function initAnimation(animeMe, domElements) {
  animeMe
    .add({
      targets: ".text",
      strokeDasharray: 250,
      strokeDashoffset: [-250, 0],
      begin: () => {
        domElements.text.style.display = "block";
        domElements.timerDisplay.style.cursor = "pointer";
      },
      complete: () => {
        domElements.timerDisplay.classList.add("play");
      }
    })
    .add(
      {
        targets: ".countdown",
        opacity: 0,
        begin: () => {
          domElements.countDown.innerHTML = "Starting";
        }
      },
      0
    );
}

function restartAnimation(animeMe, domElements) {
  animeMe
    .add({
      targets: ".squeeze",
      volume: 0
    })
    .add(
      {
        targets: ".restarttext",
        strokeDashoffset: [0, -220],
        complete: () => {
          if (!domElements.audio.paused) {
            domElements.audio.pause();
            domElements.audio.currentTime = 0;
          }
          domElements.restartsvg.style.display = "none";
        }
      },
      0
    )
    .add(
      {
        targets: [".commands", ".countTimer"],
        opacity: [1, 0]
      },
      0
    );
}

function navexesvganimation(animeMe, domElements) {
  animeMe.add({
    targets: ".nav-exe",
    points: [
      {
        value: [
          "M520.5 0.5H1L327 121.5L520.5 355V0.5Z",
          "M520.5 0.5H1V355H520.5V0.5Z"
        ]
      }
    ]
  });
}
