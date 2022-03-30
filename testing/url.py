# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
from googlesearch import search
import pandas as pd
import urllib
#textlob

def gettitle(res,soup):
    #Get info
    print("Title of the website is: ")
    #Print all titles
    for title in soup.find_all('title'):
        print(title.get_text())
        break
    print("Description: ")
    for des in soup.find_all("b"):
        print(des.get_text())
        break     
    print("Description 2: ")

    # First get the meta description tag
    description = soup.find('meta', attrs={'name':'og:description'}) or soup.find('meta', attrs={'property':'description'}) or soup.find('meta', attrs={'name':'description'})

    # If description meta tag was found, then get the content attribute and save it to db entry
    if description:
        print(description.get('content'))
    print()
    return
query = "trump won 2020"
 
for i in search(query, tld="co.in", num=10, stop=10, pause=2):
    url=i
    print(url)
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    gettitle(res,soup)
    


  

