import joblib
import sys

# Load the trained model and vectorizer
model = joblib.load("backend/model/issuer_model.pkl")
vectorizer = joblib.load("backend/model/tfidf_vectorizer.pkl")


def predict(input_text):
    print("predict is called")
    # Ensure input_text is a string
    if not isinstance(input_text, str):
        raise ValueError("Input must be a string")

    # Transform the input text to feature matrix
    processed_text = vectorizer.transform([input_text])
    
    # Make prediction
    prediction = model.predict(processed_text)
    return prediction[0]


if __name__ == "__main__":
    input_text = sys.argv[1]
    result = predict(input_text)
    print(result)
