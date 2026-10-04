\# 🛡️ PhishGuard AI



\## AI-Powered Phishing URL Detection System



PhishGuard AI is a machine-learning-based cybersecurity application that analyzes website URLs and identifies potentially suspicious or phishing URLs.



The system extracts important URL-based features and uses a trained \*\*Random Forest Classifier\*\* to classify a URL as \*\*Safe\*\* or \*\*Phishing\*\*. The result is presented through an interactive web dashboard with confidence, risk level, and detection reason.



\---



\## 🚀 Features



\* 🔍 Real-time URL scanning

\* 🤖 Machine-learning-based phishing detection

\* 🛡️ Safe / Phishing classification

\* 📊 Prediction confidence score

\* ⚠️ Risk-level assessment

\* 🔎 Detection reason

\* 📋 Recent scan history

\* 📈 Dashboard statistics

\* 💾 Persistent scan statistics using browser local storage

\* 🌐 FastAPI REST API

\* 📱 Responsive web dashboard



\---



\## 🏗️ System Architecture



```text

User

&#x20; │

&#x20; ▼

Web Dashboard

HTML + CSS + JavaScript

&#x20; │

&#x20; │ HTTP POST /predict

&#x20; ▼

FastAPI Backend

&#x20; │

&#x20; ▼

Feature Extraction

&#x20; │

&#x20; ▼

9 URL Features

&#x20; │

&#x20; ▼

Random Forest Classifier

&#x20; │

&#x20; ▼

Prediction + Confidence

&#x20; │

&#x20; ▼

Risk Level + Detection Reason

&#x20; │

&#x20; ▼

Dashboard Result

```



\---



\## 🧠 Machine Learning



PhishGuard AI uses a \*\*Random Forest Classifier\*\* for phishing URL detection.



The model is trained using URL-based features extracted from the phishing URL dataset.



\### Features Used



1\. URL length

2\. Number of dots

3\. Number of hyphens

4\. HTTPS usage

5\. Number of digits

6\. Login keyword presence

7\. Verify keyword presence

8\. Update keyword presence

9\. IP address presence



The trained model is stored as:



```text

backend/phishing\_model.pkl

```



\---



\## 🔄 Prediction Workflow



```text

URL entered by user

&#x20;       ↓

URL feature extraction

&#x20;       ↓

9 numerical URL features

&#x20;       ↓

Random Forest model

&#x20;       ↓

Safe / Phishing prediction

&#x20;       ↓

Confidence calculation

&#x20;       ↓

Risk-level assessment

&#x20;       ↓

Detection reason generation

&#x20;       ↓

Dashboard display

```



\---



\## 🛠️ Technologies Used



\### Frontend



\* HTML5

\* CSS3

\* JavaScript



\### Backend



\* Python

\* FastAPI

\* Uvicorn

\* Pydantic



\### Machine Learning



\* Scikit-learn

\* Random Forest

\* NumPy

\* SciPy

\* Joblib



\### Dataset



\* CSV-based phishing URL dataset



\---



\## 📂 Project Structure



```text

PhishGuard-AI/

│

├── backend/

│   ├── app.py

│   ├── feature\_extractor.py

│   ├── phishing\_model.pkl

│   └── requirements.txt

│

├── frontend/

│   ├── index.html

│   ├── style.css

│   └── script.js

│

├── datasets/

│   └── phishing.csv

│

├── README.md

│

└── .gitignore

```



\---



\## ⚙️ Installation



\### 1. Clone the Repository



```bash

git clone <your-github-repository-url>

cd PhishGuard-AI

```



\### 2. Create a Virtual Environment



```bash

python -m venv venv

```



\### 3. Activate the Virtual Environment



For Windows:



```powershell

venv\\Scripts\\activate

```



\### 4. Install Dependencies



```powershell

pip install -r backend/requirements.txt

```



\---



\## ▶️ Running the Backend



Navigate to the backend folder:



```powershell

cd backend

```



Start the FastAPI server:



```powershell

python app.py

```



The API will run at:



```text

http://127.0.0.1:8000

```



\### API Documentation



FastAPI automatically provides interactive API documentation at:



```text

http://127.0.0.1:8000/docs

```



\---



\## 🌐 Running the Dashboard



After starting the backend:



1\. Open the `frontend` folder.

2\. Open `index.html` in Google Chrome.

3\. Enter a website URL.

4\. Click \*\*Scan URL\*\*.

5\. The dashboard sends the URL to the FastAPI API.

6\. The machine-learning model analyzes the URL.

7\. The result is displayed on the dashboard.



\### Example



```text

URL:

https://google.com



Prediction:

Safe



Confidence:

100%



Risk Level:

Low

```



\---



\## 📡 API Endpoint



\### Health Check



```http

GET /

```



Response:



```json

{

&#x20; "message": "Phishing Detection API is running"

}

```



\### URL Prediction



```http

POST /predict

```



Request:



```json

{

&#x20; "url": "https://example.com"

}

```



Response:



```json

{

&#x20; "url": "https://example.com",

&#x20; "prediction": "Safe",

&#x20; "confidence": 100.0,

&#x20; "risk\_level": "Low",

&#x20; "reason": "No major suspicious URL patterns detected"

}

```



\---



\## 📊 Dashboard



The PhishGuard dashboard provides:



\* Total scans

\* Safe URL count

\* Phishing URL count

\* Detection statistics

\* Recent scan history

\* Risk overview

\* Prediction confidence

\* Risk level

\* Detection reason



\---



\## 🔐 Security Considerations



PhishGuard AI is a cybersecurity research and educational project. Its prediction should not be treated as an absolute guarantee that a website is safe or malicious.



Users should continue to follow standard cybersecurity practices when visiting unfamiliar websites.



\---



\## 🎯 Project Objectives



The main objectives of PhishGuard AI are:



\* To detect potentially phishing URLs using machine learning.

\* To extract meaningful features from URLs.

\* To provide real-time URL analysis through a REST API.

\* To present predictions through a user-friendly dashboard.

\* To provide understandable security information such as confidence, risk level, and detection reason.



\---



\## 🔮 Future Enhancements



\* Browser extension integration

\* Advanced URL and domain features

\* Real-time threat intelligence integration

\* Improved model evaluation

\* Dynamic analytics and visualizations

\* User authentication

\* Cloud deployment

\* Explainable AI

\* Automated model retraining

\* Larger and continuously updated phishing datasets



\---



\## 👩‍💻 Project



\### PhishGuard AI



\*\*AI-Powered Phishing URL Detection System\*\*



Built using:



`Python` · `FastAPI` · `Scikit-learn` · `Random Forest` · `HTML` · `CSS` · `JavaScript`



\---



