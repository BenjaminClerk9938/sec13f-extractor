import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
import joblib

# Load your data
with open("../data/data.json") as f:
    data = json.load(f)

# Convert to DataFrame
df = pd.DataFrame(data)

# Drop rows with NaN values in 'issuer_name' or 'issuer_description'
df = df.dropna(subset=["issuer_name", "issuer_description"])

# Prepare features and labels
X = (
    df["issuer_name"] + df["issuer_description"]
)  # Combining issuer_name and issuer_description
y = df["issuer_description"]  # or use a more appropriate target variable

# Vectorize and train the model
vectorizer = TfidfVectorizer()
model = make_pipeline(vectorizer, LogisticRegression())
model.fit(X, y)

# Save the model and vectorizer
joblib.dump(model, "issuer_model.pkl")
joblib.dump(vectorizer, "tfidf_vectorizer.pkl")
