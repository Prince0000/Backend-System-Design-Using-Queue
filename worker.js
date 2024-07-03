const { processQueue } = require('./queue');

const handleRequest = async (userId, request) => {
  // Process the request
  console.log(`Processing request for user ${userId}: ${request}`);
};

processQueue(handleRequest);
