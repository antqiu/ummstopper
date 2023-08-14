# UmmStopper

## Description

An AI-integrated web application that uses intended for college students to practice their interviewing skills and to detect their use of filler words in speech.

## Features

- Speech-to-text transcription
- Filler word detection
- Automatic interview response grading

## Technologies

- Node.js
- Express.js
- React.js
- MongoDB

## Configuration

1. Clone the repository

```
$ git clone https://github.com/antqiu/ummstopper
```

2. Install the node modules

```
$ cd /client
$ npm install
$ cd ../server
$ npm install
$ mv .env.example .env
```

3. Configure `.env`

```
CLOUD_API_KEY = ''
CLOUD_API_SECRET = ''
ASSEMBLY_SECRET = ''
MONGO_DB_LINK = ''
```

**CLOUD_API_KEY:** Your API key for [Cloudinary](https://cloudinary.com/).

**CLOUD_API_SECRET:** Your API secret for [Cloudinary](https://cloudinary.com/). This is provided alongside your API key in your dashboard.

**ASSEMBLY_SECRET:** This is the secret key for [AssemblyAI](https://www.assemblyai.com/).

**MONGO_DB_LINK:** The MongoDB connection string for connecting to your MongoDB instance. Replace the following with your own credentials `mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.pudwbqw.mongodb.net/<DATABASE>`

4. Run the application

```
$ cd /client
$ npm run dev
$ cd ../server
$ npm run dev
```

5. Navigate to http://localhost:5173/ to access the application
