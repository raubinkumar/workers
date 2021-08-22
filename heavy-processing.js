self.onmessage = (e) => {
  if (e.data !== "start") return;
  self.postMessage("Proessing Started: " + new Date());
  tenBillonCounter();
  self.postMessage("Proessing Finised: " + new Date());
};

const tenBillonCounter = () => {
  let i = 0;
  while (i < 10000000000) {
    i++;
  }
};
