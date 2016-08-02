'use strict';

var _ = require('lodash');
var app = require('../..');
import request from 'supertest';
import Record from './record.model';

var newRecord;

describe('Record API:', function() {

  describe('GET /api/records', function() {
    var records;

    beforeEach(function(done) {
      request(app)
        .get('/api/records')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          records = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      // FIXME test more!
      expect(records).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/records', function() {
    it('should respond with the newly created record', function(done) {
      var newRecord = {
        name: 'Test record ' + Math.round((Math.random() * 1000)),
        description: 'Aenean eleifend sodales nibh ac sagittis.',
        slots: []
      };

      createNewRecord(newRecord, function(err, result){
        expect(err).to.be.null;
        result = _.omit(result, ['__v', '_id']);
        expect(result).to.deep.equal(newRecord);
        done();
      });
    });

    it('should respond with the newly created record that has one slot', function(done) {
      var newRecord = {
        name: 'Test record ' + Math.round((Math.random() * 1000)),
        description: 'Aenean eleifend sodales nibh ac sagittis.',
        slots: [{
          provider: 2,
          options: 'Aenean eleifend sodales nibh ac sagittis.'
        }]
      };

      createNewRecord(newRecord, function(err, record){
        expect(err).to.be.null;

        expect(record.name).to.equal(newRecord.name);
        expect(record.description).to.equal(newRecord.description);

        expect(record.slots).to.be.instanceOf(Array);
        expect(record.slots).to.have.lengthOf(1);
        expect(record.slots[0].provider).to.equal(newRecord.slots[0].provider);
        expect(record.slots[0].options).to.equal(newRecord.slots[0].options);

        done();
      });
    });

    it.skip('should return an error if record is invalid', function(done){
      // FIXME
    });

    it.skip('should return an error if record\'s slot is invalid', function(done){
      // FIXME
    });

    afterEach(function(done){
      Record.find({}).remove(done);
    });
  });

  return;

  describe('GET /api/records/:id', function() {
    var record;

    beforeEach(function(done) {
      request(app)
        .get('/api/records/' + newRecord._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          record = res.body;
          done();
        });
    });

    afterEach(function() {
      record = {};
    });

    it('should respond with the requested record', function() {
      expect(record.name).to.equal('New Record');
      expect(record.info).to.equal('This is the brand new record!!!');
    });

  });

  describe('PUT /api/records/:id', function() {
    var updatedRecord;

    beforeEach(function(done) {
      request(app)
        .put('/api/records/' + newRecord._id)
        .send({
          name: 'Updated Record',
          info: 'This is the updated record!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRecord = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRecord = {};
    });

    it('should respond with the updated record', function() {
      expect(updatedRecord.name).to.equal('Updated Record');
      expect(updatedRecord.info).to.equal('This is the updated record!!!');
    });

  });

  describe('DELETE /api/records/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/records/' + newRecord._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when record does not exist', function(done) {
      request(app)
        .delete('/api/records/' + newRecord._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

/**
 *
 * @param {Object} data
 * @param {Function} done
 */
function createNewRecord(data, done){
  request(app)
    .post('/api/records')
    .send(data)
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      done(null, res.body);
    });
}
