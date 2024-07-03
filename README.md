
## Node.js Backend System with Clustering and Queue Management

This project implements a backend system using Node.js that efficiently manages requests from multiple users using a queue structure. Each client connected has its own queue where all requests are processed sequentially. The system is designed to be robust and scalable, ensuring that the queue is empty once all requests are processed and all users disconnect.

## Features

- User Authentication
- Request Queueing (using RabbitMQ)
- Request Processing
- Concurrency Management (using Node.js Clustering)
- Scalability
- Robustness
- Logging and Monitoring

## Tools and Technologies

- Node.js
- RabbitMQ
- MongoDB
- Express.js
- bcryptjs
- jsonwebtoken
- amqplib

## System Design

### Client-Server Model
Users interact with the system through a client interface that sends requests to the server.

### Queue Management
Each client connection has a dedicated queue. A queue manager handles the creation, management, and deletion of queues.

### Worker Processes
Dedicated worker processes pull requests from queues and execute them sequentially.

## Prerequisites

- Node.js (v14.x or later)
- MongoDB
- RabbitMQ

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Prince0000/Backend-System-Design-Using-Queue.git
cd Backend-System-Design-Using-Queue
```

2. Install dependencies:

```bash
npm install
```

3. Start MongoDB and RabbitMQ servers:

Make sure MongoDB is running on `mongodb://localhost:27017` and RabbitMQ on `amqp://guest:guest@localhost`.

## Configuration

Ensure your configuration files have the correct settings for MongoDB and RabbitMQ connections.

## Running the Application

Start the application using Node.js:

```bash
node server.js
```

This command will:
- Start the server to handle HTTP requests.
- Start worker processes to handle queued requests.

## API Endpoints

### Register User

```http
POST /register
```

**Request Body:**

```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```

### Authenticate User

```http
POST /login
```

**Request Body:**

```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "token": "jwt-token"
}
```

### Enqueue Request

```http
POST /enqueue
```

**Request Headers:**

```http
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "request": "Your Message"
}
```

## Worker Process

The worker process handles messages from the queue and processes requests. To run the worker process manually:

```bash
node worker.js
```
