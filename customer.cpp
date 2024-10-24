#include <iostream>
#include <string>
using namespace std;

const int MAX = 100; // Maximum number of customers per queue

// Queue class to represent a customer queue
class Queue {
private:
    string customers[MAX];  // Array to store customer names
    int front;              // Front index of the queue
    int rear;               // Rear index of the queue

public:
    // Constructor to initialize the queue
    Queue() {
        front = -1;
        rear = -1;
    }

    // Check if the queue is full
    bool isFull() {
        return rear == MAX - 1;
    }

    // Check if the queue is empty
    bool isEmpty() {
        return front == -1 || front > rear;
    }

    // Add a customer to the queue
    void enqueue(string name) {
        if (isFull()) {
            cout << "Queue is full. Cannot add more customers." << endl;
            return;
        }
        if (isEmpty()) {
            front = 0; // If the queue was empty, reset front
        }
        rear++;
        customers[rear] = name;
    }

    // Remove and return the next customer from the queue
    string dequeue() {
        if (isEmpty()) {
            return "Queue is empty.";
        }
        string servedCustomer = customers[front];
        front++;
        return servedCustomer;
    }

    // Display all customers in the queue
    void displayQueue() {
        if (isEmpty()) {
            cout << "Queue is empty." << endl;
            return;
        }
        cout << "Customers in queue: ";
        for (int i = front; i <= rear; i++) {
            cout << customers[i] << " ";
        }
        cout << endl;
    }

    // Get the number of customers waiting in the queue
    int getQueueSize() {
        if (isEmpty()) return 0;
        return rear - front + 1;
    }

    // Move all customers to another queue
    void moveToQueue(Queue &otherQueue) {
        while (!isEmpty()) {
            otherQueue.enqueue(dequeue());
        }
    }
};

// Function to serve customers from multiple queues in round-robin order
void serveCustomers(Queue queues[], int numQueues) {
    bool allEmpty = false;
    while (!allEmpty) {
        allEmpty = true;
        for (int i = 0; i < numQueues; i++) {
            if (!queues[i].isEmpty()) {
                cout << "Serving: " << queues[i].dequeue() << " from Queue " << (i + 1) << endl;
                allEmpty = false;  // At least one queue is non-empty
                break; // Serve one customer and stop the loop for this round
            }
        }
        // After serving a customer, move lower priority customers up
        for (int i = numQueues - 1; i > 0; i--) { // Move from lowest priority to higher
            queues[i].moveToQueue(queues[i - 1]); // Move customers from lower to higher queue
        }
    }
    cout << "All customers have been served!" << endl;
}

int main() {
    // Create five queues for different priority levels
    Queue queues[5];

    // Adding customers to different queues (representing different priority levels)
    queues[0].enqueue("Piyush"); // Critical Priority
    queues[0].enqueue("Deepak"); // Critical Priority
    queues[1].enqueue("Shubham"); // High Priority
    queues[1].enqueue("Aditya"); // High Priority
    queues[2].enqueue("Vansh"); // Medium Priority
    queues[3].enqueue("Jayesh"); // Low Priority
    queues[4].enqueue("Palash"); // General Service

    // Display each queue
    for (int i = 0; i < 5; i++) {
        cout << "Queue " << (i + 1) << ": ";
        queues[i].displayQueue();
    }

    // Serve customers from the queues
    cout << "\nStarting to serve customers...\n";
    serveCustomers(queues, 5);

    return 0;
}
