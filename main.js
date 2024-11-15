const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

// Middleware to allow cross-origin requests (CORS)
app.use(cors());

// Load language data from "languages.json"
const languageFilePath = path.join(__dirname, "languages.json");
if (!fs.existsSync(languageFilePath)) {
    console.error(`Error: languages.json file not found at ${languageFilePath}`);
    process.exit(1);
}

const languageData = JSON.parse(fs.readFileSync(languageFilePath, "utf-8"));

// Endpoint to handle different languages
app.get("/hello", (req, res) => {
    const { language } = req.query;

    if (!language) {
        return res.status(400).json({
            error_message: "The 'language' query parameter is required"
        });
    }

    if (!languageData[language]) {
        return res.status(400).json({
            error_message: "The requested language is not supported"
        });
    }

    res.status(200).json(languageData[language]);
});


// Set the port for the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
