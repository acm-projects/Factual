# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
from googlesearch import search

from myobj import website_data
import time


from flask import Flask
from flask_restful import Api, Resource
#from flask_cors import CORS
from textblob import TextBlob
#textlob
def fact_check(claim,wd):
    location=input("Enter API file location")
    myfile=open(location,"r")
    key=myfile.read().replace("\n", "")

    url=f"https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en-us&maxAgeDays=100&pageSize=5&pageToken=1&query={claim}&key={key}";
    try:
        res = requests.get(url)
    
        if (res.status_code==200):
            data=res.json()
            if (len(data)!=0):
                
                myclaims=data['claims']
                for i in range(len(myclaims)):
                    review=myclaims[i]['claimReview'][0]
                    #text,claimant,title,arturl,name,site,rating
                    try:
                        text=myclaims[i]['text']
                        wd.set_claim(text)
                    except:
                        text=None
                    try:
                        claimant=myclaims[i]['claimant']
                        wd.set_source(claimant)
                    except:
                        claimant=None
                    try:
                        title=review['title']
                        wd.set_Artical(title)
                    except:
                        title=None
                    try:
                       newurl=review['url']
                       wd.set_link(newurl)
                    except:
                        newurl=None
                    try:
                        name=review['publisher']['name']
                        wd.set_name(name)
                    except:
                        name=None
                    try:
                        site=review['publisher']['site']
                        wd.set_site(site)
                    except:
                        site=None
                    try:
                        rating=review['textualRating']
                        wd.set_rating(rating)
                    except:
                        rating=None
                        

            
        else:
            print("fail")
            
        
    except ConnectionError:
        print("Connection Error")    
    
###############################################################################################

#Sorry! Something went wrong!
def get_title(res,soup,wd):
    #Get info
    #Print all titles
    for title in soup.find_all('title'):
        print("title: ",title.get_text())
        wd.set_title(title.get_text())
        print("wd: ",wd.get_title())
        break
    #Set description1
    for des in soup.find_all("b"):
        wd.set_description1(des.get_text())
        wd.set_mypolarity(TextBlob(des.get_text()).polarity)
        wd.set_mysubjectivity(TextBlob(des.get_text()).subjectivity)
        break     
    
    # First get the meta description tag
    description2 = soup.find('meta', attrs={'name':'og:description'}) or soup.find('meta', attrs={'property':'description'}) or soup.find('meta', attrs={'name':'description'})

    # If description meta tag was found, then get the content attribute and save it to db entry
    if description2:
        wd.set_description2(description2.get('content'))
        wd.set_mypolarity(TextBlob(description2.get('content')).polarity)
        wd.set_mysubjectivity(TextBlob(description2.get('content')).subjectivity)
    if "Sorry! Something went wrong!" in wd.get_title():
        return
    else:
        mywords=wd.get_title().split(" ")
        totalwords=""
        print(totalwords)
        for i in range(len(mywords)):
            totalwords=mywords[len(mywords)-1-i]+" "+totalwords
            if i%3:
                fact_check(totalwords,wd)
            if i==12:
                break
        return


##################################################################################################
def create_jason(myobjarray):    
    temparray=[]
    print("\norganize")
    for i in range(len(myobjarray)):
        temp=myobjarray[i]
        print("temp: ",temp.get_title())
        placed=False
        if len(temparray)==0:
            temparray.append(temp)
            placed=True
            print("temparray: "+temparray[0].get_title())
        for j in range (len(temparray)):
            if i==0:
                break
            if temp.get_title().lower()<temparray[j].get_title().lower():
                temparray.insert(j, temp)
                print("temparray: ",temparray[j].get_title())
                placed=True
                break
        if placed==False:
            temparray.append(temp)
        
    
    
    mydictionary2={}
    for i in range(len(temparray)):
        mydictionary1={}
        mydictionary1["website_url"]=temparray[i].get_url()
        mydictionary1["website_title"]=temparray[i].get_title()
        mydictionary1["website_description1"]=temparray[i].get_description1()
        mydictionary1["website_description2"]=temparray[i].get_description2()
        mydictionary1["website_polaratiy"]=temparray[i].get_mypolarity()
        mydictionary1["website_subjectivity"]=temparray[i].get_mysubjectivity()
        mydictionary1["compared_claim"]=temparray[i].get_claim()
        mydictionary1["compared_source"]=temparray[i].get_source()
        mydictionary1["checked_artical"]=temparray[i].get_Artical()
        mydictionary1["checked_link"]=temparray[i].get_link()
        mydictionary1["checked_name"]=temparray[i].get_name()
        mydictionary1["checked_site"]=temparray[i].get_site()
        mydictionary1["checked_rating"]=temparray[i].get_rating()
        #Add to overall dictionary
        mydictionary2[f"Website{i}"]=mydictionary1
    
    return mydictionary2
      
    # Writing to sample.json
    #with open("sample.json", "w") as outfile:
    #    outfile.write(json_object)            
   
def start(query):  
    print()      
    myobjarray=[]
    counter=0
    past=""
    #Code for grabbing url and organisting data in function calls
    for i in search(query, tld="co.in", num=20, stop=20, pause=2):
        if counter==5:
            break
        wd=website_data()       #set obj to store info
        url=i
        if url[0:20]!=past:
            print("url: ",url)
            past=url[0:20]
            wd.set_url(url)
            res = requests.get(url)
            soup = BeautifulSoup(res.text, 'html.parser')
            get_title(res,soup,wd)
            myobjarray.append(wd)
            counter=counter+1
            time.sleep(1)
            print()
        
    return create_jason(myobjarray)
    
######################################################
def main():
    app=Flask(__name__)
    api=Api(app)
    
    class HelloWorld(Resource):
        def get(self,name):
            return start(name)
    
    api.add_resource(HelloWorld,"/helloworld/<string:name>")
    
    if __name__=="__main__":
        app.run(debug=True)
main()
