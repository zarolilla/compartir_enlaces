const handleError = require('./handleError');
const handleNotFound = require('./handleNotFound');
const validateAuth = require('./validateAuth');
const checkAdmin = require('./checkAdmin');
const userExists = require('./userExists');
const canEditUser = require('./canEditUser');

module.exports = {
  handleError,
  handleNotFound,
  validateAuth,
  checkAdmin,
  userExists,
  canEditUser,
};
