const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory storage for blog posts
let posts = [];
let nextId = 1;

// Routes

// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Get a single post by ID
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// Create a new post
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  const post = {
    id: nextId++,
    title,
    content,
    author: author || 'Anonymous',
    createdAt: new Date().toISOString(),
    bot: false
  };
  
  posts.push(post);
  res.status(201).json(post);
});

// Update a post
app.put('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  const { title, content, author } = req.body;
  
  if (title) post.title = title;
  if (content) post.content = content;
  if (author) post.author = author;
  post.updatedAt = new Date().toISOString();
  
  res.json(post);
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  posts.splice(index, 1);
  res.status(204).send();
});

// Bot functionality - Generate an automated post
app.post('/api/bot/generate', (req, res) => {
  const topics = [
    'The Future of Technology',
    'Understanding Artificial Intelligence',
    'Web Development Best Practices',
    'The Power of Automation',
    'Cloud Computing Trends'
  ];
  
  const topic = topics[Math.floor(Math.random() * topics.length)];
  
  const post = {
    id: nextId++,
    title: `${topic} - Bot Generated`,
    content: `This is an automatically generated post about ${topic.toLowerCase()}. ` +
             `Blog automation allows for consistent content creation and scheduling. ` +
             `This post was created by the botblog system at ${new Date().toLocaleString()}.`,
    author: 'BotBlog AI',
    createdAt: new Date().toISOString(),
    bot: true
  };
  
  posts.push(post);
  res.status(201).json(post);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', posts: posts.length });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`BotBlog server running on port ${PORT}`);
  });
}

module.exports = app;
