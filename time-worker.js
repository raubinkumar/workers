//time-worker.js
let interval;
const currentDateTimeWorker = () => {
  clearInterval(interval);
  interval = setInterval(() => {
    postMessage(new Date());
  }, 1000);
};

currentDateTimeWorker();
