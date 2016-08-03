'use strict';

import mongoose from 'mongoose';

var RecordSchema = new mongoose.Schema({
  configuration_id: {
    type: String,
    unique: true
  },
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

export default mongoose.model('Record', RecordSchema);
