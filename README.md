# Factual
Questioning whether that one rumor you heard is true? Need to verify a quick fact? Factual is the app that can help you answer all your questions and give a reliability rating for each source too! 

## MVP

- User should be able to search some claim or query, like "5G causes COVID-19"
- App will return snippets of articles that support or refute that claim, and provide some context as to the reliability of the source / article
- User can tap articles to visit them online and read them fully
- User can save articles for future reference, and share articles from the app itself

## Milestones

### Front-end: 
- Optional login page (user can choose to log in or not)
- Article search page
- Article results page, which should have articles in cards under the search query
- Somewhere on this page, for each article, the app should flag the credibility of the article and / or the biases present in it
- Article interaction: The user should be able to tap the article card and be sent to the full article page
- Tapping and holding the article card can prompt user to choose from a list of options: save article, share article, view full article page
- Saved articles page: User should be able to see all articles that they have saved
### Back-end:
- Connect to Google Fact Check Tools API 
- Connect to API that can pull links to articles based on the user’s search
- JSONify the article results, along with its biases: { query: “query”, results: { art1: bias1 art2: bias2, … }  }
- Set up a database for user accounts where articles can be saved

## Tech Stack

### Front-end: 
We can really go either way here, so Flutter, React Native, or React.js
- Flutter: pair with Django
- Pros:
  -  Hot-reload for ease of development
  - Platform-agnostic
- Cons:
  - Smaller community / younger language, so less available help online
- React Native: pair with Node.js
- Pros:
  - Shares codebase with web apps, so creating web app / mobile application is possible
  - Uses Javascript
- Cons:
  - Worse performance
- React.js: pair with Node.js
- Pros: 
  - Widely used and great performance for web development
- Cons: 
  - If you want a mobile application this isn’t the way to go, use react native instead
### Back-end: 
- Flask, Django, or Node.js
- Flask: 
- Pros: 
  - Very fast for building micro-applications or smaller applications
  - Very easy to understand (Python)
- Cons: 
  - Not as many features built in as Django or Node.js
- Django: 
- Pros: 
  - Built-in tools for creating and managing webpages
- Cons: 
- Might be too large, somewhat hard to navigate when on a tight deadline and working on a smaller project
- Node.js:
- Pros: 
  - Widely used
  - Has a package manager that takes care of most of the issues with having to install packages
- Cons: 
  - Javascript is not as readable as python
- Database in MongoDB or SQL, or use Firebase
  - Firebase would be really good as it has DB and auth handling
  - With MongoDB and SQL, would have to build authentication

## Software to Install

- Django / Flask / Node.js (with Express and Nodemon)
- (maybe) Android Studio for prototyping
- IDE is up to you, but I recommend VS Code

## Resources
- [Google Fact Check Tools API] (https://developers.google.com/fact-check/tools/api)
