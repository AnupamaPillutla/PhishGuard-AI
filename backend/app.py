from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
from feature_extractor import extract_features

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("phishing_model.pkl")


class URLRequest(BaseModel):
    url: str


@app.get("/")
def home():
    return {"message": "Phishing Detection API is running"}



    

@app.post("/predict")
def predict(request: URLRequest):

    # Extract URL features
    features = extract_features(request.url)

    # Feature order must match model training
    data = [[
        features["url_length"],
        features["num_dots"],
        features["num_hyphens"],
        features["uses_https"],
        features["num_digits"],
        features["contains_login"],
        features["contains_verify"],
        features["contains_update"],
        features["contains_ip"]
    ]]

    # Prediction
    prediction = model.predict(data)[0]

    # Probability / confidence
    probabilities = model.predict_proba(data)[0]
    confidence = max(probabilities) * 100

    # Prediction label
    label = "Phishing" if prediction == 1 else "Safe"

    # Risk level
    if label == "Phishing":
        if confidence >= 90:
            risk_level = "High"
        elif confidence >= 70:
            risk_level = "Medium"
        else:
            risk_level = "Low"
    else:
        if confidence >= 90:
            risk_level = "Low"
        elif confidence >= 70:
            risk_level = "Medium"
        else:
            risk_level = "Low"

    # Generate reasons
    reasons = []

    if features["uses_https"] == 0:
        reasons.append("HTTPS is not used")

    if features["contains_login"] == 1:
        reasons.append("login-related keyword detected")

    if features["contains_verify"] == 1:
        reasons.append("verification-related keyword detected")

    if features["contains_update"] == 1:
        reasons.append("update-related keyword detected")

    if features["contains_ip"] == 1:
        reasons.append("IP address detected in URL")

    if features["num_hyphens"] >= 2:
        reasons.append("multiple hyphens detected")

    if not reasons:
        reasons.append("No major suspicious URL patterns detected")

    reason = ", ".join(reasons)

    return {
        "url": request.url,
        "prediction": label,
        "confidence": round(confidence, 2),
        "risk_level": risk_level,
        "reason": reason
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)