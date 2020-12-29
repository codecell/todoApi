process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const server = require('../server');
const { connect, close } = require('../db');

describe('GET /todos', () => {
  before((done) => {
    connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('On success, should return a list of todos', (done) => {
    request(server).get('/todos')
      .then(res => {
        const { body } = res;
        try {
          expect(body.status).to.equal('Success');
          expect(body.message).to.match(/Showing/i);

          done();
        } catch(err) {
          done(err);
        }
      })
  });

  it('On success, should return todos list of length greater than 0', (done) => {
    request(server).post('/todos')
      .send({ priority: 1, description: 'Run another form of get test' })
      .then(res => {

        request(server).get('/todos')
        .then((res) => {
          const { body } = res;

          try {
            expect(body.status).to.equal('Success');
            expect(body.data[0]).to.contain.property('_id');
    
            done();
          } catch(err) {
            done(err);
          }
        });        
      })
  });
})
