# Chicker

Chicker, the online social media app that revolution connect people and interact with others in the digital age. Designed with the goal of bringing people closer together, Chicker offers a dynamic platform where individuals from all walks of life can forge meaningful connections, share their stories, and engage in vibrant communities.  

---

## Key Features

1. User authorization
Users can sign up with their email accounts. Each email address can only be linked to
one user.
2. Guest user
Guest users are users who aren’t logged in. They can only read posts and other users’
profiles.
3. Normal user
Logged in users can read, like, share, comment on, save, publish, and report a post.
They can follow a user and read their profile as well.
4. Chat
Users can send messages to each other.
5. Dark mode
Users can choose to browse the website in dark mode.
6. User recommendation
The system will recommend nearby “chicks” to every user.
7. Content recommendation
The system will recommend posts to a user according to their interests.
8. Trend
The application will show topics being searched the most at present.
9. Real-time
Under each topic, the latest posts will be shown.

---

## Technologies

- HTML, CSS, JavaScript
- React
- Flask
- MongoDB

---

## How to Run Project

```bash
git clone https://github.com/VTiS15/Chicker.git
cd chicker
npm start
```

```bash
virtualenv .venv
source .venv/bin/activate
pip install -r requirements.txt
python chicker/src/Backend/app.py 
```

Make sure you have your .env file set up correctly.

---

## App Structure

```
chicker
└── src
    ├── Backend
    |   ├── mongo
    |   |   ├── chat.py
    |   |   ├── post.py
    |   |   └── user.py
    |   ├── resources
    |   |   ├── chat.py
    |   |   ├── post.py
    |   |   └── user.py
    |   ├── app.py
    |   ├── db.py
    |   ├── login.py
    |   └── utils.py
    ├── Frontend
    |   ├── components
    |   |   ├── posts.css
    |   |   ├── post.js
    |   |   ├── sidebar.css
    |   |   ├── sidebar.js
    |   |   ├── Usercard.css
    |   |   └── Usercard.js
    |   ├── functions
    |   |   ├── getUsers.js
    |   |   └── style.js
    |   ├── Pages
    |   |   ├── AdminPage.css
    |   |   ├── AdminPage.js
    |   |   ├── ChatPage.css
    |   |   ├── ChatPage.js
    |   |   ├── Home.css
    |   |   ├── Home.js
    |   |   ├── LoginPage.css
    |   |   ├── LoginPage.js
    |   |   ├── ProfilePage.css
    |   |   ├── ProfilePage.js
    |   |   ├── RegistrationPage.css
    |   |   ├── RegistrationPage.js
    |   |   ├── SearchPage.css
    |   |   ├── SearchPage.js
    |   |   ├── SettingPage.css
    |   |   └── SettingPage.js
    |   └── Layout.js
    ├── App.js
    └── index.js
```
