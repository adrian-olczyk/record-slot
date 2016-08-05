'use strict';

var _ = require('lodash');
var async = require('async');
var app = require('../..');
import request from 'supertest';
import Record from './record.model';

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
      var newRecordData = {
        name: 'Test record ' + Math.round((Math.random() * 1000)),
        description: 'Aenean eleifend sodales nibh ac sagittis.',
        slots: []
      };

      createNewRecord(newRecordData, function(err, result){
        expect(err).to.be.null;
        result = _.omit(result, ['__v', '_id', 'id', 'configuration_id']);
        expect(result).to.deep.equal(newRecordData);
        done();
      });
    });

    it('should respond with the newly created record that has one slot', function(done) {
      var newRecordData = {
        name: 'Test record ' + Math.round((Math.random() * 1000)),
        description: 'Aenean eleifend sodales nibh ac sagittis.',
        slots: [{
          provider: 2,
          options: 'Aenean eleifend sodales nibh ac sagittis.'
        }]
      };

      createNewRecord(newRecordData, function(err, record){
        expect(err).to.be.null;

        expect(record.name).to.equal(newRecordData.name);
        expect(record.description).to.equal(newRecordData.description);

        expect(record.slots).to.be.instanceOf(Array);
        expect(record.slots).to.have.lengthOf(1);
        expect(record.slots[0].provider).to.equal(newRecordData.slots[0].provider);
        expect(record.slots[0].options).to.equal(newRecordData.slots[0].options);

        done();
      });
    });

    it('should create multiple records', function(done) {
      var newRecordData = {
        name: 'Test record ' + Math.round((Math.random() * 1000)),
        description: 'Aenean eleifend sodales nibh ac sagittis.',
        slots: [{
          provider: 2,
          options: 'Aenean eleifend sodales nibh ac sagittis.'
        }]
      };
      var numberOfRecordsToCreate = 5;
      var createRecordFunctions = Array(numberOfRecordsToCreate).fill(createNewRecord.bind(null, newRecordData));

      async.parallel(createRecordFunctions, function(err){
        expect(err).to.be.null;
        Record.count({}).then((count) => {
          expect(count).to.be.equal(numberOfRecordsToCreate);
          done();
        });
      });
    });

    it('should respond with validation error if record name is missing', function(done) {
      var newRecordData = {
        name: '',
        description: 'Aenean eleifend sodales nibh ac sagittis.'
      };

      request(app)
        .post('/api/records')
        .send(newRecordData)
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          done(null);
        });
    });

    it('should respond with validation error if slot provider is not an integer', function(done) {
      var newRecordData = {
        name: 'Record name',
        description: 'Aenean eleifend sodales nibh ac sagittis.',
        slots: [{
          provider: 'ivalid-provider',
          description: ''
        }]
      };

      request(app)
        .post('/api/records')
        .send(newRecordData)
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          done(null);
        });
    });

    it('should respond with validation error if slot is not an object', function(done) {
      var newRecordData = {
        name: 'Record name',
        description: 'Aenean eleifend sodales nibh ac sagittis.',
        slots: [ 'cake-is-a-lie' ]
      };

      request(app)
        .post('/api/records')
        .send(newRecordData)
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          done(null);
        });
    });

    it('should respond with validation error if slots are not an array or null', function(done) {
      var newRecordData = {
        name: 'Record name',
        description: 'Aenean eleifend sodales nibh ac sagittis.',
        slots: 'cake-is-a-lie'
      };

      request(app)
        .post('/api/records')
        .send(newRecordData)
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(err).to.be.null;
          done(null);
        });
    });

    afterEach(removeAllRecords);
  });

  describe('GET /api/records/:id', function() {
    var newRecord;

    beforeEach(function(done) {
      createNewRecord({ name: 'New record', description: '-' }, function(err, record){
        expect(err).to.be.null;
        newRecord = record;
        done();
      });
    });

    it('should respond with the requested record', function(done) {
      getRecord(newRecord._id, function(err, record){
        expect(err).to.be.null;

        expect(record._id).to.equal(newRecord._id);
        expect(record.name).to.equal(newRecord.name);
        expect(record.description).to.equal(newRecord.description);
        // FIXME test slots

        done();
      });
    });

    afterEach(removeAllRecords);
  });

  describe('PUT /api/records/:id', function() {
    var newRecord;

    beforeEach(function(done) {
      createNewRecord({ name: 'New record', description: '-' }, function(err, record){
        expect(err).to.be.null;
        newRecord = record;
        done();
      });
    });

    it('should respond with the updated record', function(done) {
      var updatedRecord = {
        name: 'Updated Record',
        description: 'This is the updated record!!!',
        slots: [
          { provider: 1, options: 'Test 1' },
          { provider: 2, options: 'Test 2' },
          { provider: 3, options: 'Test 3' }
        ]
      };

      updateRecord(newRecord._id, updatedRecord, function(err, record){
        expect(err).to.be.null;

        expect(record.name).to.equal(updatedRecord.name);
        expect(record.description).to.equal(updatedRecord.description);

        done();
      });
    });

    it('should remove slots from the new record', function(done) {
      var updatedRecord = {
        name: 'Updated Record',
        description: 'This is the updated record!!!',
        slots: [
          { provider: 1, options: 'Test 1' },
          { provider: 3, options: 'Test 3' }
        ]
      };

      updateRecord(newRecord._id, updatedRecord, function(err, record){
        expect(err).to.be.null;

        expect(record.name).to.equal(updatedRecord.name);
        expect(record.description).to.equal(updatedRecord.description);

        expect(updatedRecord.slots).to.have.lengthOf(2);

        done();
      });
    });

    afterEach(removeAllRecords);
  });

  describe('DELETE /api/records/:id', function() {
    var newRecord;

    beforeEach(function(done){
      createNewRecord({ name: 'Record', description: '-' }, function(err, record){
        expect(err).to.be.null;
        newRecord = record;
        done();
      });
    });

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/records/' + newRecord._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Record.count({}).then((count) => {
            expect(count).to.be.equal(0);
            done();
          });
        });
    });

    it('should respond with 404 when record does not exist', function(done) {
      request(app)
        .delete('/api/records/apple-pie')
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    afterEach(removeAllRecords);
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
        return done(err, res);
      }
      done(null, res.body);
    });
}

/**
 *
 * @param {String} recordId
 * @param {Function} done
 */
function getRecord(recordId, done){
  request(app)
    .get('/api/records/' + recordId)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      done(null, res.body);
    });
}

/**
 *
 * @param {String} recordId
 * @param {Object} recordData
 * @param {Function} done
 */
function updateRecord(recordId, recordData, done){
  request(app)
    .put('/api/records/' + recordId)
    .send(recordData)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      done(null, res.body);
    });
}

/**
 *
 * @param done
 */
function removeAllRecords(done){
  Record.find({}).remove(done);
}
