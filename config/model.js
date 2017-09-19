const objection = require('objection');
const ObjectionModel = objection.Model;
const db = require('./db');
const guid = require('objection-guid')();

ObjectionModel.knex(db);

class Model extends ObjectionModel {
  $beforeInsert () {
        if (this.constructor.timestamps) {
            const now = new Date().toISOString();
            this.created_at = now;
            this.updated_at = now;
        }
    }

    $beforeUpdate () {
        if (this.constructor.timestamps) {
            const now = new Date().toISOString();
            this.updated_at = now;
        }
    }
}

module.exports = guid(Model);
