class website_data():
        def __init__(self):
            #Original artical
            self.url="none"
            self.title="none"
            self.description1="hi"
            self.description2="none"
            #API google fact check
            self.claim="none"
            self.source="none"
            self.Artical="none"
            self.link="none"
            #second source
            self.name="none"
            self.site="none"
            self.rating="none"
        #Setter
        def set_url(self,info):
            self.url=info
        def set_title(self,info):
            self.title=info
        def set_description1(self,info):
            self.description1=info
        def set_description2(self, info):
            self.description2=info
        def set_claim(self, info):
            self.claim=info  
        def set_source(self, info):
            self.source=info  
        def set_Artical(self, info):
            self.Artical=info  
        def set_link(self, info):
            self.link=info  
        def set_name(self, info):
            self.name=info 
        def set_site(self, info):
            self.site=info 
        def set_rating(self, info):
            self.rating=info  
        #Getter
        def get_url(self):
            return self.url
        def get_title(self):
            return self.title
        def get_description1(self):
            return self.description1
        def get_description2(self):
            return self.description2
        def get_claim(self):
            return self.claim
        def get_source(self):
            return self.source
        def get_Artical(self):
            return self.Artical
        def get_link(self):
            return self.link
        def get_name(self):
            return self.name
        def get_site(self):
            return self.site
        def get_rating(self):
            return self.rating