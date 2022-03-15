const jwt = require('jsonwebtoken');

const SECRET_KEY = 'DFfjk32#@#*$DKJF*#jdhf274dfhJDFH*dfy';

const createToken = (fields) => {
  const token = jwt.sign({ ...fields }, SECRET_KEY);
  return token;
};

module.exports = createToken;
