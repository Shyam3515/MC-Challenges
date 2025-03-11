let sum = 0;

//listen for the custom event passed from the MainSum file
document.addEventListener("calculateSum", (event) => {
  const { num1, num2 } = event.detail;
  sum = num1 + num2;

  //create event for processing
  const sumProcessingEvent = new CustomEvent("sumProcessing", {
    detail: { sum },
  });

  //dispatch Event
  document.dispatchEvent(sumProcessingEvent);
});
