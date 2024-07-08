import requests
from bs4 import BeautifulSoup


def specificPageScrape(page):
    # URL of the website to scrape
    url = 'https://www.who.int'

    # Send a GET request to the webpage
    response = requests.get(url+page)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find the data within specific HTML tags
        data = soup.find_all('div', class_='list-bold separator-line')
        
        # Extract and print the data
        keyfacts = []
        dataDict = {}
        print(f"Data from {page}")
        for item in data:
            # print(item.get_text())
            keyfacts.append(item.get_text())
            article_data = scrapeArticleData(url + page)
            article_data["Key Facts"] = keyfacts
            dataDict["Article Data"] = article_data
        return dataDict
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        
    
    
def scrapePossibleOptions():
    baselink = 'https://www.who.int/news-room/fact-sheets'
    
    response = requests.get(baselink)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find the data within specific HTML tags
        # data = soup.find_all('ul', class_='alphabetical-nav alphabetical-nav--list')
        links = soup.find_all('a', href=True)
        
        realdata = {}
        # Extract and print the href attribute
        for link in links:
            if link['href'].startswith('/news-room/fact-sheets/detail/'):
                # print(link['href'])
                realdata[link.get_text()] = link['href']
        # Extract and print the data
        # for item in data:
            # print(item.get_text())
        return realdata
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        return {"Error": "Somethign went wrong"}

def scrapeArticleData(link):

    response = requests.get(link)

    # Check if the request was successful
    if response.status_code == 200:
    # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

    # Find the data within specific HTML tags
    # data = soup.find_all('ul', class_='alphabetical-nav alphabetical-nav--list')
    data = soup.find_all('article', class_='sf-detail-body-wrapper')
    # Extract and print the href attribute
    article_data = {}
    for article in data:
        # Find all h2 tags
        h2_tags = article.find_all('h2')
        for h2 in h2_tags:
            # Print the text of the h2 tag
            print(f'{h2.get_text()}')
            article_data[h2.get_text()] = []
            
            # Get the next siblings of the h2 tag until the next h2 or end of article
            for sibling in h2.find_next_siblings():
                if sibling.name == 'h2':
                    print('\n')
                    break
                if sibling.name == 'p':
                    article_data[h2.get_text()].append(sibling.get_text())
                    print(f'{sibling.get_text()}')
    return article_data
    # Extract and print the data
    # for item in data:
        # print(item.get_text())


      
        
links = scrapePossibleOptions()
# print(links)
combined_data = {}
for key, value in links.items():
    print(key)
    print(value)
    linkData = specificPageScrape(value)
    combined_data[key] = {value: linkData}
# specificPageScrape('/news-room/fact-sheets/detail/hepatitis-d')

# 
# scrapeArticleData('https://www.who.int/news-room/fact-sheets/detail/hepatitis-d')



# print(combined_data)


import json
with open('data.json', 'w') as fp:
    json.dump(combined_data, fp)

# # f = open('data.json', 'wb')
# # f.write(combined_data)