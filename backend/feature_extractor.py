from urllib.parse import urlparse
import re

def extract_features(url):

    parsed = urlparse(url)

    features = {}

    # Feature 1 - Length of URL
    features["url_length"] = len(url)

    # Feature 2 - Number of dots
    features["num_dots"] = url.count(".")

    # Feature 3 - Number of hyphens
    features["num_hyphens"] = url.count("-")

    # Feature 4 - HTTPS or not
    features["uses_https"] = 1 if parsed.scheme == "https" else 0

    # Feature 5 - Number of digits
    features["num_digits"] = sum(c.isdigit() for c in url)

    # Feature 6 - Contains login
    features["contains_login"] = 1 if "login" in url.lower() else 0

    # Feature 7 - Contains verify
    features["contains_verify"] = 1 if "verify" in url.lower() else 0

    # Feature 8 - Contains update
    features["contains_update"] = 1 if "update" in url.lower() else 0

    # Feature 9 - Uses IP address
    features["contains_ip"] = 1 if re.search(r"\d+\.\d+\.\d+\.\d+", url) else 0

    return features