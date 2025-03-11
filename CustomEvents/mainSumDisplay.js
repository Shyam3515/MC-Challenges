let num1 = 10;
let num2 = 20;

//create event and pass data
const calculateSumEvent = new CustomEvent("calculateSum", {
  detail: {
    num1,
    num2,
  },
});

//listen for the event from the Processing file
document.addEventListener("sumProcessing", (e) => {
  console.log("Sum calculated is :", e.detail.sum);
});

//dispatching Event to send numbers to Processing file
document.dispatchEvent(calculateSumEvent);
