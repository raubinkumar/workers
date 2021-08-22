const hasWorkerSupport = () => {
  return typeof Worker !== undefined;
};

const getWorkers = () => {
  if (hasWorkerSupport()) {
    return {
      timeWorker: new Worker("time-worker.js"),
      heavyProcesssingWorker: new Worker("heavy-processing.js"),
    };
  } else {
    console.log("Browser doesn't support Workers.");
  }
  return {
    timeWorker: undefined,
    heavyProcesssingWorker: undefined,
  };
};

const displayDateTime = (worker) => {
  const dateTimeDOMTarget = document.getElementById("date-time");
  worker.onmessage = (e) => {
    dateTimeDOMTarget.innerHTML = e.data;
  };
};

const bootStraper = () => {
  if (!hasWorkerSupport()) {
    alert("Browser Doesn't support workers");
  }

  let workers;

  const terminateWorkers = () => {
    if (!workers) return;
    workers.timeWorker.terminate();
    workers.heavyProcesssingWorker.terminate();
  };
  const startWorkers = () => {
    workers = getWorkers();
    displayDateTime(workers.timeWorker);
  };
  const doHeavyProcessing = () => {
    if (!workers) {
      alert("Start worker to process");
      return;
    }
    workers.heavyProcesssingWorker.postMessage("start");
    workers.heavyProcesssingWorker.onmessage = (e) => {
      const processingMessageTarget =
        document.getElementById("processing-result");
      processingMessageTarget.innerHTML += `<div>${e.data}</div>`;
    };
  };
  return { startWorkers, terminateWorkers, doHeavyProcessing };
};


const dateTimeWorker = new Worker("currentDateTime-worker.js");
worker.onmessage = (e) => {
	console.log(e.data);
};