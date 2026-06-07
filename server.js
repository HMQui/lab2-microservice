const express = require('express');
const app = express();
const port = 3000;

// Test endpoint

app.get('/', (req, res) => {
    res.json({
        status: "Success",
        message: "Hello from Lab 2 Microservice CI/CD!",
        version: "1.0.0"
    });
});

app.listen(port, () => {
    console.log(`Microservice is running on port ${port}`);
});