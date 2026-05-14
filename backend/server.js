const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
    res.json({
        message: "Hello from Backend 🚀"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});