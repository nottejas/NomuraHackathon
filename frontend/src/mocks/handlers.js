import { rest } from 'msw';

const API_URL = 'http://localhost:5000/api';

export const handlers = [
  // Auth handlers
  rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
    const { username, password } = req.body;
    
    if (username === 'testuser' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({
          msg: 'Login successful',
          username: 'testuser',
          token: 'mock-jwt-token',
        })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({ msg: 'Invalid credentials' })
    );
  }),

  rest.post(`${API_URL}/auth/register`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ msg: 'User registered successfully' })
    );
  }),

  // Event handlers
  rest.get(`${API_URL}/event`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          _id: '1',
          title: 'Beach Cleanup',
          description: 'Clean the beach',
          location: 'Marina Beach',
          date: '2024-12-01',
          volunteers: [],
        },
        {
          _id: '2',
          title: 'Park Cleanup',
          description: 'Clean the park',
          location: 'Central Park',
          date: '2024-12-05',
          volunteers: [],
        },
      ])
    );
  }),

  rest.post(`${API_URL}/event/create`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ msg: 'Event created successfully' })
    );
  }),

  rest.post(`${API_URL}/event/enroll/:eventId`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ msg: 'Enrollment successful' })
    );
  }),

  // User handlers
  rest.get(`${API_URL}/user/profile/:username`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'testuser',
        email: 'test@example.com',
        bio: 'Environmental activist',
        location: 'Mumbai',
      })
    );
  }),

  rest.get(`${API_URL}/user/stats/:username`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        eventsAttended: 12,
        wasteCollected: 145,
        co2Saved: 108,
        hoursVolunteered: 36,
        treesEquivalent: 12,
      })
    );
  }),

  rest.get(`${API_URL}/user/leaderboard`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { username: 'user1', score: 1000, rank: 1 },
        { username: 'user2', score: 900, rank: 2 },
        { username: 'user3', score: 800, rank: 3 },
      ])
    );
  }),
];
