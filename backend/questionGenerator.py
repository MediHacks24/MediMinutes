from bs4 import BeautifulSoup
from openai import OpenAI
import requests
import json
client = OpenAI()


def sectionDataInput(section_data):
  #completion = client.chat.completions.create(
  #model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "Using the data, you generate between 5-10 MC questions. Do not generalize, only test on info given. No extrapolation on your part. Option a) needs to be the correct answer every time"},
    {"role": "user", "content": section_data}
  ]

  completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.5,
        top_p=1
    )
  
  questions_dict = {}

  content = completion.choices[0].message.content
  print(content)
  print("\n")
  print("\n")

  print("\n")

  with open('questions.json', 'w') as f:
    json.dump(content, f, indent=2)
  return content

  
    






def scrapeArticleData(link):
    response = requests.get(link)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Collect all text content into a single string
        data = ""
        for element in soup.find_all(['h2', 'p']):
            text = element.get_text().strip()
            if text:
                data += text + "\n\n"  # Adding double newline for separation
        
        
        return data.strip()  # Strip any leading/trailing whitespace
    
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        return None


def dataParse(content):
  question = content.split('\n\n')
  question_dict = {}

  for question_block in question:
      lines = question_block.split('\n')
      if len(lines) > 1:
          question_number = lines[0].split('.')[0].strip()
          question_text = ' '.join(lines[0].split('.')[1:]).strip()

          options = ['']*4
          for line in lines[1:]:
              if line.startswith('a)'):
                  options[0] = line[3:].strip()
              elif line.startswith('b)'):
                  options[1] = line[3:].strip()
              elif line.startswith('c)'):
                  options[2] = line[3:].strip()
              elif line.startswith('d)'):
                  options[3] = line[3:].strip()

          question_dict[question_text] = options
  return question_dict


def main():
  filename = "links.json"
  with open(filename) as f:
    file = json.load(f)

  questions_dict = {}

  for key, value in file.items():
    url = value
    section_data = scrapeArticleData(url)
  # if section_data:
  #        with open('section_data.json', 'w') as f:
  #             json.dump(section_data, f, indent=2)
  #        print("Scraping and saving data completed successfully.")
  # else:
  #        print("Scraping failed. Check your internet connection or the URL.")
    content = sectionDataInput(section_data)
    questions_dict[key] = dataParse(content)


  with open('questions.json', 'w') as f:
    json.dump(questions_dict, f, indent=2)
  print(questions_dict)



main()