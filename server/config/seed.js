/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Record from '../api/record/record.model';

Record.find({}).remove()
  .then(() => {
    // Record.create();
  });

