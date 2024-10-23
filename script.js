// Store customer queues
let queues = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: []
};

// Function to add customer to a queue
function addCustomer() {
  let customerName = document.getElementById("customerName").value;
  let priorityLevel = document.getElementById("priorityLevel").value;

  if (customerName.trim() === "") {
      alert("Please enter a customer name.");
      return;
  }

  // Add customer to the correct queue based on priority
  queues[priorityLevel].push(customerName);
  updateQueueDisplay(priorityLevel);
  document.getElementById("customerName").value = ""; // Clear input
}

// Function to update the display of each queue
function updateQueueDisplay(priorityLevel) {
  let list = document.getElementById(`list${priorityLevel}`);
  list.innerHTML = ""; // Clear the current list
  queues[priorityLevel].forEach(customer => {
      let li = document.createElement("li");
      li.textContent = customer;
      list.appendChild(li);
  });
}

// Function to serve the next customer in the priority queues
function serveCustomer() {
  let currentCustomer = "";

  // Round robin through queues (priority 1 to 5)
  for (let i = 1; i <= 5; i++) {
      if (queues[i].length > 0) {
          currentCustomer = queues[i].shift(); // Get the first customer
          updateQueueDisplay(i); // Update queue display
          break;
      }
  }

  // Display currently serving customer
  document.getElementById("currentCustomer").textContent = currentCustomer ? 
      `Currently serving: ${currentCustomer}` : "No customer being served";
}

// Placeholder function for metrics (expand based on simulation logic)
function updateMetrics() {
  document.getElementById("metrics").textContent = "Metrics coming soon!";
}
