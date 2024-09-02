document.addEventListener("DOMContentLoaded", () => {
    const balanceDisplay = document.getElementById("balance");
    const addMoneyBtn = document.getElementById("add-money-btn");
    const withdrawMoneyBtn = document.getElementById("withdraw-money-btn");
    const transactionHistoryBtn = document.getElementById("transaction-history-btn");

    const addMoneyInterface = document.getElementById("add-money-interface");
    const withdrawMoneyInterface = document.getElementById("withdraw-money-interface");
    const transactionHistoryInterface = document.getElementById("transaction-history-interface");

    const confirmAddBtn = document.getElementById("confirm-add-btn");
    const cancelAddBtn = document.getElementById("cancel-add-btn");

    const confirmWithdrawBtn = document.getElementById("confirm-withdraw-btn");
    const cancelWithdrawBtn = document.getElementById("cancel-withdraw-btn");

    const closeHistoryBtn = document.getElementById("close-history-btn");

    const transactionList = document.getElementById("transaction-list");

    let balance = 0;
    let transactions = [];

    // Utility function to update the balance display
    function updateBalanceDisplay() {
        balanceDisplay.textContent = `$${balance.toFixed(2)}`;
    }

    // Function to add a transaction to the history
    function addTransaction(type, amount) {
        const date = new Date().toLocaleString();
        const transaction = {
            date,
            type,
            amount,
            balanceAfter: balance,
        };
        transactions.push(transaction);
        updateTransactionHistory();
    }

    // Function to update the transaction history display
    function updateTransactionHistory() {
        transactionList.innerHTML = "";
        transactions.forEach(transaction => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="border px-4 py-2">${transaction.date}</td>
                <td class="border px-4 py-2">${transaction.type}</td>
                <td class="border px-4 py-2">$${transaction.amount.toFixed(2)}</td>
                <td class="border px-4 py-2">$${transaction.balanceAfter.toFixed(2)}</td>
            `;
            transactionList.appendChild(row);
        });
    }

    // Event listeners
    addMoneyBtn.addEventListener("click", () => {
        addMoneyInterface.classList.remove("hidden");
    });

    withdrawMoneyBtn.addEventListener("click", () => {
        withdrawMoneyInterface.classList.remove("hidden");
    });

    transactionHistoryBtn.addEventListener("click", () => {
        transactionHistoryInterface.classList.remove("hidden");
    });

    confirmAddBtn.addEventListener("click", () => {
        const amount = parseFloat(document.getElementById("add-amount").value);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }
        balance += amount;
        updateBalanceDisplay();
        addTransaction("Add", amount);
        document.getElementById("add-amount").value = "";
        addMoneyInterface.classList.add("hidden");
    });

    cancelAddBtn.addEventListener("click", () => {
        addMoneyInterface.classList.add("hidden");
    });

    confirmWithdrawBtn.addEventListener("click", () => {
        const amount = parseFloat(document.getElementById("withdraw-amount").value);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }
        if (amount > balance) {
            alert("Insufficient balance.");
            return;
        }
        balance -= amount;
        updateBalanceDisplay();
        addTransaction("Withdraw", amount);
        document.getElementById("withdraw-amount").value = "";
        withdrawMoneyInterface.classList.add("hidden");
    });

    cancelWithdrawBtn.addEventListener("click", () => {
        withdrawMoneyInterface.classList.add("hidden");
    });

    closeHistoryBtn.addEventListener("click", () => {
        transactionHistoryInterface.classList.add("hidden");
    });

    // Initialize balance display
    updateBalanceDisplay();
});