process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const server = require('../server');
const { connect, close } = require('../db');

describe('POST /todos', () => {
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

  it('On success, creates a new todo item', (done) => {
    request(server).post('/todos')
      .send({
        priority: 1,
        description: 'Test description'
      })
      .then(res => {
        const { data } = res.body;
        try {
          expect(data).to.contain.property('id');
          expect(data).to.contain.property('priority');
          expect(data).to.contain.property('description');

          done();
        } catch(err) {
          done(err);
        }
      })
  });

  it('On Failure with no descritpion given, Requires description ', (done) => {
    request(server).post('/todos')
      .send({
        priority: 1
      })
      .then(res => {
        const { body } = res;
        console.log(body)
        try {
          expect(body.status).to.equal('Error');
          expect(body.error).to.match(/This field is required/i);
  
          done();
        } catch(err) {
          done(err);
        }
      })
  });
})
