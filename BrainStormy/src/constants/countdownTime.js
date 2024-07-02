const COUNTDOWN_TIME = {
  minutes: [],
  seconds: [],
};

for (let i = 0; i < 16; i++) {
  COUNTDOWN_TIME.minutes.push({ key: i, text: i, value: i * 16 });
}

for (let i = 0; i < 60; i++) {
  COUNTDOWN_TIME.seconds.push({ key: i, text: i, value: i });
}

export default COUNTDOWN_TIME;
