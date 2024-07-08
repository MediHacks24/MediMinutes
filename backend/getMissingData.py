import json
import requests
from bs4 import BeautifulSoup


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
        # for item in data:
            # print(item.get_text())
        writeToJson(realdata)
        return realdata
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        return {"Error": "Somethign went wrong"}

                
def scrapeArticleData(link):
    response = requests.get(link)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

    data = soup.find_all('article', class_='sf-detail-body-wrapper')
    article_data = {}
    for article in data:
        counter = 0
        # Find all h2 tags
        h2_tags = article.find_all('h2')
        for h2 in h2_tags:
            counter += 1
            if counter == 1 and h2.get_text().lower() != 'key facts':
                counter = counter + 1
                
            # Print the text of the h2 tag
            # print(f'{h2.get_text()}')
            key = f'{counter}-{h2.get_text()}'
            article_data[key] = []
            
            # Get the next siblings of the h2 tag until the next h2 or end of article
            for sibling in h2.find_next_siblings():
                if sibling.name == 'h2':
                    print('\n')
                    break
                if sibling.name == 'ul':
                    for li in sibling.find_all('li'):
                        article_data[key].append(li.get_text())
                        # print(f'{li.get_text()}')
                    break
                if sibling.name == 'p':
                    article_data[key].append(sibling.get_text())
                    # print(f'{sibling.get_text()}')
                elif sibling.name == 'ul' or sibling.name == 'ol':
                    for li in sibling.find_all('li'):
                        article_data[key].append(li.get_text())
                        # print(f'{li.get_text()}')
            
    return article_data

def alternateKeyFactsScrape(link):
    response = requests.get(link)
    article_data = {}
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
    data = soup.find_all('div', class_='list-bold separator-line')
    for article in data:
        h2_tags = article.find_all('h2')        
        for h2 in h2_tags:
            if h2.get_text() == "Key facts":
                key = "Key Facts"
                article_data[key] = []
                for sibling in h2.find_next_siblings():
                    if sibling.name == 'h2':
                        print('\n')
                        return article_data
                    
                    if sibling.name == 'ul' or sibling.name == 'ol':
                        for li in sibling.find_all('li'):
                            article_data[key].append(li.get_text())
                            # print(f'{li.get_text()}')
                        return article_data

def iterateSections():
    filename = 'links.json'
    with open(filename) as f:
        file = json.load(f)

        info_dict = {}
        
        for key, value in file.items():
            print("===" + key + "===")
            url = value
            article_data = scrapeArticleData(url)
            article_data['url'] = url
            
            
            print(article_data)
            if '1-Key facts' not in article_data:

                keyFacts = alternateKeyFactsScrape(url)
                print(keyFacts)
                if keyFacts:
                    article_data['1-Key Facts'] = keyFacts['Key Facts']
            #     if keyFacts and len(keyFacts) > 0:
            #         for key, value in keyFacts.items():
            #             article_data["0-Key Facts"] = value
            #             break

                    
            #         dataArray = keyFacts["Key Facts"]
            #         article_data["0-Key Facts"] = keyFacts
            #         info_dict[key] = article_data
            #         print(key, article_data)
            # else:
            #     print(article_data['1-Key facts'])
               
            # print(key, article_data)
            info_dict[key] = article_data

        writeToJson(info_dict)
    
def writeToJson(info_dict):
    with open('test123.json', 'w') as fp:
        json.dump(info_dict, fp)             

# print(alternateKeyFactsScrape("http://www.who.int/news-room/fact-sheets/detail/abortion"))
# scrapeFactsSection("https://www.who.int/news-room/fact-sheets/detail/alcohol")
iterateSections()
# scrapePossibleOptions()
# article_data = scrapeArticleData("https://www.who.int/news-room/fact-sheets/detail/adolescent-pregnancy")
# writeToJson(article_data)

# print(alternateKeyFactsScrape("https://www.who.int/news-room/fact-sheets/detail/abortion"))

# print("\n\n================================\n\n")

# print(scrapeArticleData("https://www.who.int/news-room/fact-sheets/detail/adolescent-pregnancy"))
# print("\n\n================================\n\n")
# print(scrapeArticleData("https://www.who.int/news-room/fact-sheets/detail/abortion"))