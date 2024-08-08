const path = require('path');

const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().required(),
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().required(),
    SYSTEM_SECRET: Joi.string().required(),
    FRONTEND_URL: Joi.string().required().default('http://localhost:8081'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT || 5000,

  mongoose: {
    url: envVars.MONGODB_URL,
    options: {},
  },

  jwt: {
    secret: envVars.JWT_SECRET,
    expiration: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },

  system: {
    secret: envVars.SYSTEM_SECRET,
  },

  frontend: envVars.FRONTEND_URL,
};
