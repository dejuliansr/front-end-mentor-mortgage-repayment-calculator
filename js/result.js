document.addEventListener("DOMContentLoaded", function() {
  // Get elements
  const amountInput = document.getElementById("amount");
  const termInput = document.getElementById("term");
  const rateInput = document.getElementById("rate");
  const mortgageTypeInputs = document.getElementsByName("mortgageType");
  const resultDisplay = document.getElementById("result");
  const amountError = document.getElementById("amountError");

  // Calculate repayments on button click
  document.querySelector("button").addEventListener("click", function() {
    const amount = parseFloat(amountInput.value);
    const term = parseFloat(termInput.value) * 12; // convert years to months
    const rate = parseFloat(rateInput.value) / 100 / 12; // convert annual rate to monthly

    // Validate inputs
    if (isNaN(amount) || amount <= 0) {
      amountError.textContent = "Please enter a valid mortgage amount.";
      return;
    } else {
      amountError.textContent = "";
    }

    if (isNaN(term) || term <= 0) {
      resultDisplay.textContent = "Please enter a valid mortgage term.";
      return;
    }

    if (isNaN(rate) || rate < 0) {
      resultDisplay.textContent = "Please enter a valid interest rate.";
      return;
    }

    // Determine mortgage type
    let monthlyRepayment;
    const selectedMortgageType = Array.from(mortgageTypeInputs).find(input => input.checked)?.value;

    if (selectedMortgageType === "repayment") {
      // Repayment Mortgage Formula
      monthlyRepayment = (amount * rate) / (1 - Math.pow(1 + rate, -term));
    } else if (selectedMortgageType === "interest-only") {
      // Interest-only Mortgage Formula
      monthlyRepayment = amount * rate;
    } else {
      resultDisplay.textContent = "Please select a mortgage type.";
      return;
    }

    // Display result
    resultDisplay.textContent = `Your monthly repayment is: £${monthlyRepayment.toFixed(2)}
    `;
  });
});
