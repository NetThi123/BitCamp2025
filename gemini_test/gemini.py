import requests

headers = {
    'Content-Type': 'application/json',
}

params = {
    'key': 'AIzaSyAxT73qJEy5lLt0hvsy6UN4grH-3eSTqpw',
}

json_data = {
    'contents': [
        {
            'parts': [
                {
                    'text': 'Explain how AI works',
                },
            ],
        },
    ],
}

response = requests.post(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    params=params,
    headers=headers,
    json=json_data,
)

print(response)
print(response.text)


# Note: json_data will not be serialized by requests
# exactly as it was in the original request.
#data = '{\n  "contents": [{\n    "parts":[{"text": "Explain how AI works"}]\n    }]\n   }'
#response = requests.post(
#    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
#    params=params,
#    headers=headers,
#    data=data,
#)