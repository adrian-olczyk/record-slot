'use strict';

import mongoose from 'mongoose';

var RecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  slots: [{
    provider: Number,
    options: String
  }]
});

RecordSchema.virtual('configuration_id').get(function(){
  return this._id;
});

export default mongoose.model('Record', RecordSchema);
