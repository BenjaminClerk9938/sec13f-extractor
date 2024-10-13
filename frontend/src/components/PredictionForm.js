import React, { useState } from 'react';

function PredictionForm() {
    const [input, setInput] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input_text: input })
        });
        const data = await response.json();
        setPrediction(data.prediction);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter text"
                />
                <button type="submit">Predict</button>
            </form>
            {prediction && <p>Prediction: {prediction}</p>}
        </div>
    );
}

export default PredictionForm;
