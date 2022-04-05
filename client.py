# -*- coding: utf-8 -*-
"""
Created on Tue Mar 29 15:34:49 2022

@author: danie
"""
import requests

BASE="http://127.0.0.1:5000/"
user_input=input("Search: ")
response=requests.get(BASE+f"factual/{user_input}")
information=response.json()
print(information)

