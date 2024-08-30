# No.ff

Winrate prediction model and statistics lookup for the popular MOBA League of Legends.  
<br />

Unfortunately, due to numerous in-game changes and updates to the API, this project only works with data received before Patch 14.10.
That being said, the Winrate prediction model and League Chatbot are still fully functional.
# 📊 No.ff - League of Legends Statistical Analyzer

No.ff is an advanced tool designed for League of Legends enthusiasts who want to dive deep into game data. With capabilities ranging from data analysis to AI-based predictions, No.ff offers a comprehensive suite of features for players and analysts alike.

## 🎯 Key Features

- **Automated Data Collection**: Effortlessly collect and process over 100,000+ requests from the Riot API, turning in-game data into actionable insights.
- **AI-Powered Predictions**: Utilize a Sci-kit Learn/TensorFlow model, trained on 500k+ lines of data, to predict game outcomes with 70% accuracy.
- **RESTful API**: Developed using Django and Next.js, the API interacts with over 500+ active players and stores data efficiently in SQLite.
- **Interactive Chatbot**: Access game information through an AI-driven chatbot, powered by Gemini’s API.
- **Web Scraping**: Automated and precise data scraping using Selenium, boosting model accuracy by 6%.
- **Team Collaboration**: Built with a team of developers using Git and Agile methodologies, ensuring seamless communication and effective teamwork.

## 🛠️ Technologies Used

- **Backend**: Python, Django, SQLite
- **Frontend**: JavaScript, React.js, Next.js
- **Machine Learning**: Sci-kit Learn, TensorFlow
- **Automation**: Selenium
- **APIs**: Riot API, Gemini's API

## 🚀 Installation

To get started with No.ff on your local machine, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/no.ff.git
   cd no.ff

To run the Django backend, execute the following commands:

```sh
cd website
pip install -r requirements.txt
python manage.py runserver
```

To run the Nextjs server, execute: 
```sh
cd noff-next
npm install next
npm run dev
```
