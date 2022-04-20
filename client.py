import json
import requests

BASE="http://127.0.0.1:5000/"
user_input=input("Search: ")
response=requests.get(BASE+f"factual/{user_input}")
information=response.json()
print(information)

jsonString = json.dumps(information)
jsonFile = open("data.json", "w")
jsonFile.write(jsonString)
jsonFile.close()