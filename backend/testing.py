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
        print(f"Data from {page}")
        for item in data:
            print(item.get_text())
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        
    print("article data")
    
    scrapeArticleData(url + page)
        
    
    
    # PageContent_T0643CD2A003_Col00
    # PageContent_T0643CD2A003_Col00
    
    
    
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
        print(links)
        # Extract and print the href attribute
        for link in links:
            if link['href'].startswith('/news-room/fact-sheets/detail/'):
                print(link['href'])
        # Extract and print the data
        # for item in data:
            # print(item.get_text())
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        

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
    for article in data:
        divs = article.find_all('div')
        for div in divs:
            print(f'{div.get_text()}\n')  # Print the text content of each div
    # Extract and print the data
    # for item in data:
        # print(item.get_text())


        
        
# scrapePossibleOptions()

# specificPageScrape('/news-room/fact-sheets/detail/hepatitis-d')


scrapeArticleData('https://www.who.int/news-room/fact-sheets/detail/hepatitis-d')