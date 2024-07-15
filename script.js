document.addEventListener("DOMContentLoaded", function() {
    let counter = 0;
    let total = localStorage.getItem("total") ? parseInt(localStorage.getItem("total")) : 0;
    const counterElement = document.getElementById("counter");
    const totalElement = document.getElementById("total");
    const historyList = document.getElementById("historyList");
    const totalResetBtn = document.getElementById("totalResetBtn");

    // Load history from local storage
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });

    // Display total
    totalElement.textContent = total;

    // Increment button event listener
    document.getElementById("incrementBtn").addEventListener("click", function() {
        counter++;
        counterElement.textContent = counter;
    });

    // Reset button event listener
    document.getElementById("resetBtn").addEventListener("click", function() {
        // Save the current counter to history
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        const historyItem = `${date} ${time}: ${counter}`;
        history.push(historyItem);
        localStorage.setItem("history", JSON.stringify(history));
        
        // Update history list
        const li = document.createElement("li");
        li.textContent = historyItem;
        historyList.appendChild(li);

        // Update total
        total += counter;
        localStorage.setItem("total", total);
        totalElement.textContent = total;

        // Reset the counter
        counter = 0;
        counterElement.textContent = counter;
    });

    // Total reset button event listener
    totalResetBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to reset all data?")) {
            counter = 0;
            total = 0;
            localStorage.removeItem("total");
            localStorage.removeItem("history");
            counterElement.textContent = counter;
            totalElement.textContent = total;
            historyList.innerHTML = "";
        }
    });

    // Make the total reset button visible when holding the shift key
    document.addEventListener("keydown", function(event) {
        if (event.key === "Shift") {
            totalResetBtn.classList.add("visible");
        }
    });

    document.addEventListener("keyup", function(event) {
        if (event.key === "Shift") {
            totalResetBtn.classList.remove("visible");
        }
    });
});
