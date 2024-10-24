// Store customer queues
let queues = {
  1: [], // Critical
  2: [], // High
  3: [], // Medium
  4: [], // Low
  5: []  // General
};

let customersServedCount = 0; // Track number of customers served

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
          currentCustomer = queues[i].shift(); // Serve the first customer in the queue
          updateQueueDisplay(i); // Update the current queue display
          break;
      }
  }

  // If a customer was served, increase the count
  if (currentCustomer) {
      customersServedCount++;

      // Check if 2 customers have been served and elevate all customers
      if (customersServedCount === 2) {
          elevateAllCustomers();
          customersServedCount = 0; // Reset count
      }
  }

  // Display currently serving customer
  document.getElementById("currentCustomer").textContent = currentCustomer ? 
      `Currently serving: ${currentCustomer}` : "No customer being served";
}

// Function to elevate all remaining customers to the next higher priority queue
function elevateAllCustomers() {
  // Start from the lowest priority and move each customer one level up
  for (let i = 4; i >= 1; i--) { // From priority 4 (Low) to 1 (Critical)
      if (queues[i + 1].length > 0) {
          // Move one customer from lower priority (i+1) to the next higher priority queue (i)
          queues[i].push(queues[i + 1].shift());
          updateQueueDisplay(i + 1); // Update the display for the lower priority queue
          updateQueueDisplay(i); // Update the display for the higher priority queue
      }
  }
}

// Placeholder function for metrics (expand based on simulation logic)
function updateMetrics() {
  document.getElementById("metrics").textContent = "Metrics coming soon!";
}



