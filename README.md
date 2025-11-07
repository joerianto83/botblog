# BotBlog

AI-powered blog platform with automated content generation capabilities.

## Features

- 📝 Create, read, update, and delete blog posts
- 🤖 Automated bot-generated content
- 🌐 Clean and responsive web interface
- 🔌 RESTful API for programmatic access
- 💾 In-memory storage (perfect for demos and testing)

## Installation

```bash
npm install
```

## Usage

### Start the server

```bash
npm start
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

### Access the web interface

Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Get all posts
```
GET /api/posts
```

### Get a single post
```
GET /api/posts/:id
```

### Create a new post
```
POST /api/posts
Content-Type: application/json

{
  "title": "My Blog Post",
  "content": "This is the content of my post",
  "author": "John Doe"  // optional, defaults to "Anonymous"
}
```

### Update a post
```
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "author": "Updated Author"
}
```

### Delete a post
```
DELETE /api/posts/:id
```

### Generate a bot post
```
POST /api/bot/generate
```

This endpoint automatically generates a blog post using predefined topics and templates.

### Health check
```
GET /health
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Example Usage

### Using curl

Create a post:
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","content":"Hello, world!","author":"John"}'
```

Generate a bot post:
```bash
curl -X POST http://localhost:3000/api/bot/generate
```

Get all posts:
```bash
curl http://localhost:3000/api/posts
```

### Using JavaScript

```javascript
// Create a post
fetch('http://localhost:3000/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Post',
    content: 'Post content',
    author: 'Jane Doe'
  })
});

// Generate a bot post
fetch('http://localhost:3000/api/bot/generate', {
  method: 'POST'
});
```

## Technology Stack

- **Backend**: Node.js with Express
- **Testing**: Jest and Supertest
- **Frontend**: Vanilla JavaScript with modern CSS

## License

ISC
