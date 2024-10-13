const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint to handle predictions
app.post('/predict', (req, res) => {
    const { input_text } = req.body;

    let options = {
        args: [input_text]
    };

    PythonShell.run('backend/scripts/predict.py', options, function (err, results) {
        if (err) {
            // console.log(err);
            return res.status(500).json({ error: err.message });
        }

        // results is an array containing the output of the script
        const [issuer_name, issuer_description] = results[0].split(',');
        res.json({ issuer_name, issuer_description });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
