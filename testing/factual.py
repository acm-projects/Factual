import requests
#textlob

myfile=open(r"C:\Users\danie\OneDrive\Desktop\UT_Dallas\ACM_Projects\key.txt","r")
key=myfile.read().replace("\n", "")

claim="trump lost 2020"

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
                except:
                    text=None
                try:
                    claimant=myclaims[i]['claimant']
                except:
                    claimant=None
                try:
                    title=review['title']
                except:
                    title=None
                try:
                   newurl=review['url']
                except:
                    newurl=None
                try:
                    name=review['publisher']['name']
                except:
                    name=None
                try:
                    site=review['publisher']['site']
                except:
                    site=None
                try:
                    rating=review['textualRating']
                except:
                    rating=None
                    

                print(f"Origin #{i}")
                print(f"     Claim: {text}")
                print(f"     Source: {claimant}")
                print("Review")
                print(f"     Artical: {title}")
                print(f"     Link: {newurl}")
                print(f"     Publisher: {name} From: {site}")
                print(f"     Claim rated as: {rating}")
                if (i!=len(myclaims)-1):
                    print("________________________________________________")
        else:
            print("No results")
        
    else:
        print("fail")
        
    
except ConnectionError:
    print("Connection Error")