import request from 'supertest';
import app from '../src/app';

describe('GET / Endpoint', () => {
  it('should return 200 OK with message "Backend Connected Successfully"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Backend Connected Successfully',
    });
  });

  it('should return 200 OK on GET /api as well', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Backend Connected Successfully',
    });
  });
});
