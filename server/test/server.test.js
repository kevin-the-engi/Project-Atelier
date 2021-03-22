const request = require('supertest');
const app = require('../index.js');
const db = require('../../database');

describe("GET / ", () => {
  const productID = 1;

  it('should respond with Product info', async (done) => {
    const res = await request(app).get('/products/' + productID);

    expect(res.status).toBe(200);
    expect(Object.keys(res.body).length).toBeGreaterThan(0);
    expect(Array.isArray(res.body.features)).toBe(true);
    done();
  })

  it('should respond with Style info', async (done) => {
    const res = await request(app).get(`/products/${productID}/styles`);

    expect(res.status).toBe(200);
    expect(Object.keys(res.body).length).toBe(2);
    expect(res.body.results.length).toBeGreaterThan(0);
    done();
  })

  it('should respond with Style info and photos', async (done) => {
    const res = await request(app).get(`/products/${productID}/styles`);

    expect(res.body.results[0].photos.length).toBeGreaterThan(0);
    done();
  })

  it('should respond with Style info and skus', async (done) => {
    const res = await request(app).get(`/products/${productID}/styles`);

    expect(Object.keys(res.body.results[0].skus).length).toBeGreaterThan(0);
    done();
  })
});