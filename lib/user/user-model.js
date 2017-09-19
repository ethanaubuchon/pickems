const Model = require('../../config/model');
const Bcrypt = require('bcrypt');
const Promise = require('bluebird');
const SALT_ROUNDS = 10;

class User extends Model {
  static get timestamps() {
    return true;
  }

  static get tableName() {
    return 'user';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],

      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        first_name: { type: 'string', minLength: 1, maxLength: 255 },
        last_name: { type: 'string', minLength: 1, maxLength: 255 },
        created_at: { type: 'datetime' },
        updated_at: { type: 'datetime' }
      }
    }
  }

  static get timestamp() {
    return true;
  }

  static hashPassword(password) {
    return Promise.promisify(Bcrypt.hash).call(this, password, SALT_ROUNDS);
  }

  checkPassword(password) {
    return Promise.promisify(Bcrypt.compare).call(this, password, this.password);
  }
}

module.exports = User;
