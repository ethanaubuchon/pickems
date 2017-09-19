const UserModel = require('./user-model');
const _ =  require('lodash');

module.exports.createUser = function (properties) {
  const required = ['email', 'password'];

  _.each(required, (field) => {
    if (!properties[field]) throw 'Missing mandatory field';
  });

  UserModel.hashPassword(properties.password)
  .then((hashedPassword) => {
    properties.password = hashedPassword;
    return UserModel.query().insert(properties);
  });
}
