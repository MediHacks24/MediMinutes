import json
import requests
from bs4 import BeautifulSoup

# scrapes the facts from the page
def specificPageScrape(page):
    url = 'https://www.who.int'

    response = requests.get(page)

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
        
# scrapes the links from the list of articles
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
                betterLink = (f"{'https://www.who.int'}{link['href']}")
                realdata[link.get_text()] = betterLink
        # Extract and print the data
        for item in link:
            print(item.get_text())
        return realdata
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        return {"Error": "Somethign went wrong"}

# scrapes article data from the page and returns
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
        counter = 0
        # Find all h2 tags
        h2_tags = article.find_all('h2')
        for h2 in h2_tags:
            counter += 1
            # Print the text of the h2 tag
            print(f'{h2.get_text()}')
            key = f'{counter}-{h2.get_text()}'
            article_data[key] = []
            
            # Get the next siblings of the h2 tag until the next h2 or end of article
            for sibling in h2.find_next_siblings():
                if sibling.name == 'h2':
                    print('\n')
                    break
                if sibling.name == 'p':
                    article_data[key].append(sibling.get_text())
                    print(f'{sibling.get_text()}')
    return article_data


      
def main():      
    links = scrapePossibleOptions()
    # print(links)
    combined_data = {}
    for key, value in links.items():
        print(key)
        print(value)
        linkData = specificPageScrape(value)
        combined_data[key] = {value: linkData}


    with open('otherData.json', 'w') as fp:
        json.dump(combined_data, fp)

main()
# data = scrapePossibleOptions()
# print(data)
# scrapeArticleData("https://www.who.int/news-room/fact-sheets/detail/alcohol")