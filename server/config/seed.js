/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Record from '../api/record/record.model';

Record.find({}).remove()
  .then(() => {
    Record.create({
      name: 'First test record',
      description: 'Fusce in sem dapibus, pulvinar tortor in, semper tortor. Duis.',
      slots: [{
        provider: 1,
        options: 'Fusce in sem dapibus'
      },{
        provider: 2,
        options: 'Sed vestibulum mollis felis, vel.'
      },{
        provider: 5,
        options: 'Etiam nisi nulla.'
      }]
    },{
      name: 'Second test record',
      description: 'Donec tempus cursus magna, eget dapibus lectus aliquam ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed consequat maximus ex, nec dictum erat semper eu. Quisque eget nunc condimentum, eleifend purus non, bibendum elit. Proin semper ex a metus vulputate, quis rhoncus leo fringilla. Aenean scelerisque leo nec diam interdum lacinia',
      slots: [{
        provider: 1,
        options: 'Fusce in sem dapibus'
      }]
    },{
        name: 'Other test record',
        description: 'Fusce consequat erat mi, nec iaculis ante aliquet sit amet. Maecenas non feugiat leo.',
        slots: [{
          provider: 2,
          options: 'Sed vestibulum mollis felis, vel.'
        },{
          provider: 1,
          options: 'Fusce in sem dapibus'
        }]
      }
    );
  });

