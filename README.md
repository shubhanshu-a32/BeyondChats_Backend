# BeyondChats Backend Assignment

A robust Express.js backend that serves articles to the BeyondChats frontend. It includes a web scraper to fetch real data from the BeyondChats blog and a MongoDB database integration.

## 🚀 Features

- **RESTful API**: Provides endpoints to fetch, create, update, and delete articles.
- **Web Scraper**: Automated script (`cheerio` + `axios`) to scrape blog posts from [BeyondChats Blogs](https://beyondchats.com/blogs/).
- **MongoDB Integration**: Uses **Mongoose** for schema validation and database interactions.
- **Controller-Service Architecture**: Separation of concerns with dedicated controllers for business logic.
- **Global Error Handling**: Centralized error management to prevent server crashes.
- **Vercel Ready**: Configured for effortless deployment as a serverless function.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Scraping**: [Cheerio](https://cheerio.js.org/), [Axios](https://axios-http.com/)
- **Utilities**: Dotenv, Cors

## 📦 Installation

Prerequisites: Node.js (v14+) and a MongoDB instance (Local or Atlas).

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## ⚙️ Configuration

Create a `.env` file in the `backend` root directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
PORT=4000
```

- `MONGO_URI`: Your MongoDB connection string.
- `PORT`: The port the server listens on (default: 4000).

## 🏃‍♂️ Running Locally

1.  **Start the server**:
    ```bash
    npm run dev
    ```
    The API will be available at `http://localhost:4000/api`.

2.  **Run the Scraper**:
    To populate your database with real articles:
    ```bash
    node scripts/scrapeOldestArticles.js
    ```

## 🔌 API Endpoints

### Articles (`/api/articles`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Fetch all articles |
| `POST` | `/` | Create a new article |
| `PUT` | `/:id` | Update an existing article |
| `DELETE` | `/:id` | Delete an article |

## 📂 Project Structure

```
backend/
├── controllers/         # Business logic (e.g., articleController.js)
├── models/              # Mongoose schemas (e.g., Article.js)
├── routes/              # API route definitions
├── scripts/             # Utility scripts (e.g., scraper)
├── app.js               # Express application setup
├── package.json         # Dependencies and scripts
└── .env                 # Environment variables
```

## ☁️ Deployment

The project is configured for **Vercel**. The `app.js` exports the express app to function as a serverless entry point.

Ensure you set the `MONGO_URI` environment variable in your Vercel project settings.
