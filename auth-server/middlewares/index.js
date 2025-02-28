const validateFields = require('./validate-fields');
const validateJWToken = require('./validate-jwt');


module.exports = {
    ...validateFields,
    ...validateJWToken
}