const request = require('supertest');
const app = require('./index');

describe('BotBlog API', () => {
  
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('posts');
    });
  });

  describe('POST /api/posts', () => {
    it('should create a new post', async () => {
      const newPost = {
        title: 'Test Post',
        content: 'This is a test post',
        author: 'Test Author'
      };
      
      const res = await request(app)
        .post('/api/posts')
        .send(newPost);
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe(newPost.title);
      expect(res.body.content).toBe(newPost.content);
      expect(res.body.author).toBe(newPost.author);
      expect(res.body.bot).toBe(false);
      expect(res.body).toHaveProperty('createdAt');
    });

    it('should create post with default author when not provided', async () => {
      const newPost = {
        title: 'Test Post',
        content: 'This is a test post'
      };
      
      const res = await request(app)
        .post('/api/posts')
        .send(newPost);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.author).toBe('Anonymous');
    });

    it('should return 400 when title is missing', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({ content: 'Content without title' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 when content is missing', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({ title: 'Title without content' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/posts', () => {
    beforeEach(async () => {
      // Create a test post
      await request(app)
        .post('/api/posts')
        .send({
          title: 'Test Post for GET',
          content: 'Test content',
          author: 'Test Author'
        });
    });

    it('should get all posts', async () => {
      const res = await request(app).get('/api/posts');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/posts/:id', () => {
    it('should get a specific post by id', async () => {
      // Create a post first
      const createRes = await request(app)
        .post('/api/posts')
        .send({
          title: 'Specific Post',
          content: 'Specific content',
          author: 'Specific Author'
        });
      
      const postId = createRes.body.id;
      
      const res = await request(app).get(`/api/posts/${postId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(postId);
      expect(res.body.title).toBe('Specific Post');
    });

    it('should return 404 for non-existent post', async () => {
      const res = await request(app).get('/api/posts/99999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('should update a post', async () => {
      // Create a post first
      const createRes = await request(app)
        .post('/api/posts')
        .send({
          title: 'Original Title',
          content: 'Original content',
          author: 'Original Author'
        });
      
      const postId = createRes.body.id;
      
      const res = await request(app)
        .put(`/api/posts/${postId}`)
        .send({
          title: 'Updated Title',
          content: 'Updated content'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Updated Title');
      expect(res.body.content).toBe('Updated content');
      expect(res.body).toHaveProperty('updatedAt');
    });

    it('should return 404 when updating non-existent post', async () => {
      const res = await request(app)
        .put('/api/posts/99999')
        .send({ title: 'Updated' });
      
      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/posts/:id', () => {
    it('should delete a post', async () => {
      // Create a post first
      const createRes = await request(app)
        .post('/api/posts')
        .send({
          title: 'Post to Delete',
          content: 'This will be deleted',
          author: 'Test Author'
        });
      
      const postId = createRes.body.id;
      
      const res = await request(app).delete(`/api/posts/${postId}`);
      expect(res.statusCode).toBe(204);
      
      // Verify post is deleted
      const getRes = await request(app).get(`/api/posts/${postId}`);
      expect(getRes.statusCode).toBe(404);
    });

    it('should return 404 when deleting non-existent post', async () => {
      const res = await request(app).delete('/api/posts/99999');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /api/bot/generate', () => {
    it('should generate a bot post', async () => {
      const res = await request(app).post('/api/bot/generate');
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('content');
      expect(res.body.author).toBe('BotBlog AI');
      expect(res.body.bot).toBe(true);
      expect(res.body).toHaveProperty('createdAt');
    });

    it('should generate unique bot posts', async () => {
      const res1 = await request(app).post('/api/bot/generate');
      const res2 = await request(app).post('/api/bot/generate');
      
      expect(res1.body.id).not.toBe(res2.body.id);
    });
  });
});
