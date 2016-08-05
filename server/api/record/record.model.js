'use strict';

import mongoose from 'mongoose';

var schemaOptions = {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
};

var RecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  slots: [{
    _id: false,
    provider: Number,
    options: String
  }]
}, schemaOptions);

RecordSchema.virtual('configuration_id').get(function() {
  return this._id;
});

export default mongoose.model('Record', RecordSchema);
