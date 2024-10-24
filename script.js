// Store customer queues
let queues = {
  1: [], // Critical
  2: [], // High
  3: [], // Medium
  4: [], // Low
  5: []  // General
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
          currentCustomer = queues[i].shift(); // Serve the first customer in the queue
          updateQueueDisplay(i); // Update the current queue display
          break;
      }
  }

  // If a customer was served, shift all lower priority customers up
  if (currentCustomer) {
      elevateLowerPriorityCustomers();
  }

  // Display currently serving customer
  document.getElementById("currentCustomer").textContent = currentCustomer ? 
      `Currently serving: ${currentCustomer}` : "No customer being served";
}

// Function to elevate lower priority customers after serving a higher priority one
function elevateLowerPriorityCustomers() {
  for (let i = 5; i > 1; i--) { // Start from the lowest priority
      if (queues[i].length > 0) {
          // Move all customers from lower priority to the next higher priority queue
          queues[i - 1].push(...queues[i]);
          queues[i] = []; // Clear the original lower priority queue
          updateQueueDisplay(i); // Update the display for the current queue
          updateQueueDisplay(i - 1); // Update the display for the next higher priority queue
      }
  }
}

// Placeholder function for metrics (expand based on simulation logic)
function updateMetrics() {
  document.getElementById("metrics").textContent = "Metrics coming soon!";
}

