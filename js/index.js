document.querySelectorAll('input').forEach(input => {
  const parentDiv = input.closest('div');
  const span = parentDiv.querySelector('span');

  // Saat input fokus, tambahkan kelas active
  input.addEventListener('focus', () => {
    parentDiv.classList.add('input-active');
    span.classList.add('span-active');
  });

  // Saat input kehilangan fokus, hapus kelas active
  input.addEventListener('blur', () => {
    parentDiv.classList.remove('input-active');
    span.classList.remove('span-active');
  });
});

// Fungsi untuk memperbarui tampilan Mortgage Type
document.querySelectorAll('input[name="mortgageType"]').forEach(input => {
  input.addEventListener('change', (event) => {
      // Hapus kelas selected dari semua opsi
      document.querySelectorAll('.mortgage-option').forEach(option => {
          option.classList.remove('selected');
      });

      // Tambahkan kelas selected ke opsi yang dipilih
      event.target.closest('.mortgage-option').classList.add('selected');
  });
});
// Function to calculate mortgage
function calculateMortgage(event) {
  event.preventDefault(); // Prevent form submission
  // Get the input values
  const amountInput = document.getElementById("amount");
  const termInput = document.getElementById("term");
  const rateInput = document.getElementById("rate");
  const resultDiv = document.getElementById("result");
  
  const amountError = document.getElementById("amountError");
  const termError = document.getElementById("termError");
  const rateError = document.getElementById("rateError");
  const typeError = document.getElementById("typeError");

  // Reset pesan kesalahan
  amountError.classList.add("hidden");
  termError.classList.add("hidden");
  rateError.classList.add("hidden");
  typeError.classList.add("hidden");
  
  const principal = parseFloat(amountInput.value);
  const termYears = parseInt(termInput.value);
  const annualRate = parseFloat(rateInput.value);

  let isValid = true;

  // Validasi Mortgage Amount
  if (amountInput.value.trim() === "") {
    amountError.classList.remove("hidden");
    amountInput.closest('div').classList.add('input-error');
    amountInput.previousElementSibling.classList.add('span-error');
    isValid = false;
  } else {
    // Remove error classes if valid
    amountInput.closest('div').classList.remove('input-error');
    amountInput.previousElementSibling.classList.remove('span-error');
  }

  // Validasi Mortgage Term
  if (termInput.value.trim() === "") {
    termError.classList.remove("hidden");
    termInput.closest('div').classList.add('input-error');
    termInput.nextElementSibling.classList.add('span-error');
    isValid = false;
  } else {
    // Remove error classes if valid
    termInput.closest('div').classList.remove('input-error');
    termInput.nextElementSibling.classList.remove('span-error');
  }

  // Validasi Interest Rate
  if (rateInput.value.trim() === "") {
    rateError.classList.remove("hidden");
    rateInput.closest('div').classList.add('input-error');
    rateInput.nextElementSibling.classList.add('span-error');
    isValid = false;
  } else {
    // Remove error classes if valid
    rateInput.closest('div').classList.remove('input-error');
    rateInput.nextElementSibling.classList.remove('span-error');
  }

  if (!isValid) return;
  
  // Check for valid input
  if (isNaN(principal) || isNaN(termYears) || isNaN(annualRate)) {
    resultDiv.innerHTML = "Please enter valid values.";
    return;
  }
  
  // Calculate mortgage repayment
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = termYears * 12;
  const mortgageType = document.querySelector('input[name="mortgageType"]:checked').value;
  
  let monthlyPayment;
  if (mortgageType === "repayment") {
    monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
  } else {
    monthlyPayment = principal * monthlyRate;
  }

  const totalRepayment = monthlyPayment * totalPayments;

  // Display results
  const rightSide = document.getElementById("rightSide");
  rightSide.innerHTML = `
    <div class="rounded-lg w-full">
      <p class="text-xl mb-3 text-white">Your result</p>
      <p class="text-sm mb-4 text-Slate/300">Your results are shown below based on the information you provided. To adjust the resukt, edit the form and click "calculate repatments" again</p>
      <div class="bg-slate-800 p-10 border-t-8 border-Lime rounded-lg mt-4">
        <p class="text-sm text-Slate/300 mb-1">Your monthly repayments</p>
        <p class="text-4xl font-bold text-Lime">£${monthlyPayment.toFixed(2)}</p>
        <hr class="border-slate-600 my-4">
        <p class="text-sm text-Slate/300">Total you'll repay over the term</p>
        <p class="text-2xl font-bold">£${totalRepayment.toFixed(2)}</p>
      </div>
    </div>
  `; // Your result display code here
  
  // Remove the hidden class to show the right side with results
  rightSide.classList.remove("hidden");
}


function clearAll() {
  // Dapatkan input form
  const amountInput = document.getElementById("amount");
  const termInput = document.getElementById("term");
  const rateInput = document.getElementById("rate");
  const rightSide = document.getElementById("rightSide");

  // Kosongkan semua input
  amountInput.value = '';
  termInput.value = '';
  rateInput.value = '';

  // Hapus pilihan radio button
  const mortgageTypeOptions = document.querySelectorAll('input[name="mortgageType"]');
  mortgageTypeOptions.forEach(option => {
      option.checked = false;
      // Hapus kelas latar belakang dari elemen opsi
      const optionDiv = option.closest('.mortgage-option');
      optionDiv.classList.remove('selected'); // Pastikan untuk mengganti 'selected' dengan kelas yang sesuai yang mengatur background
  });

  // Kosongkan hasil
  rightSide.innerHTML = `
    <img src="./assets/images/illustration-empty.svg" alt="Calculation Illustration" class="mb-4">
    <h3 class="text-xl font-semibold mb-2">Results shown here</h3>
    <p class="text-center text-sm">
      Complete the form and click "calculate repayments" to see what your monthly repayments would be.
    </p>
  `;

  // Hapus kelas error dan sembunyikan pesan kesalahan
  const amountError = document.getElementById("amountError");
  const termError = document.getElementById("termError");
  const rateError = document.getElementById("rateError");
  const typeError = document.getElementById("typeError");

  amountError.classList.add("hidden");
  termError.classList.add("hidden");
  rateError.classList.add("hidden");
  typeError.classList.add("hidden");

  // Kosongkan kelas input error
  amountInput.closest('div').classList.remove('input-error');
  termInput.closest('div').classList.remove('input-error');
  rateInput.closest('div').classList.remove('input-error');

  // Kosongkan kelas span error
  amountInput.previousElementSibling.classList.remove('span-error');
  termInput.nextElementSibling.classList.remove('span-error');
  rateInput.nextElementSibling.classList.remove('span-error');

  // Remove the hidden class to show the right side with results
  rightSide.classList.remove("hidden");
}
