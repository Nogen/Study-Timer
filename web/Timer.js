class StudyTimer {
  constructor(time, thickCall) {
    this.time = time;
    this.iStep = 1;
    this.running = false;
    this.stopper = false;
    this.tickCallback = thickCall;
    this.postCallback = () => {};
    this.sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
  }

  async play() {
    if (this.running) {
      throw new Error("UnsupportedException: you can't play while playing!");
    }
    this.running = true;
    for (; this.iStep < this.time + 1; this.iStep++) {
      if (this.stopper) {
        this.running = false;
        break;
      } else {
        this.running = true;
      }
      this.tickCallback(this.iStep);
      await this.sleep(1000);
    }
    if (this.running) {
      this.running = false;
      this.postCallback();
    }
  }

  async pause() {
    this.stopper = true;
  }

  async resume() {
    this.stopper = false;
    this.play();
  }

  async restart() {
    this.pause();
    this.iStep = 1;
    this.running = false;
    this.stopper = false;
  }

  async reset(newTime) {
    this.time = newTime;
    this.iStep = 1;
  }

  addPostCallback(fun) {
    this.postCallback = fun;
  }
}

function time2Seconds(hours, min, sec) {
  return sec + min * 60 + hours * 3600;
}

function seconds2Time(sec) {
  let hours = Math.trunc(sec / 3600);
  let seconds = sec - hours * 3600;
  let minutes = Math.trunc(seconds / 60);
  seconds = seconds - minutes * 60;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${hours}:${minutes}:${seconds}`;
}
