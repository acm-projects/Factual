# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
from googlesearch import search
import pandas as pd
import urllib
#textlob


          

query = "trump won 2020"
 
for i in search(query, tld="co.in", num=10, stop=10, pause=2):
    url=i
    print(i)
    
print()
f = requests.get(url)
mytext=f.text



   
