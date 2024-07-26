const Joi = require('joi')

const createUserValidator = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const createPostValidator = Joi.object({
  username: Joi.string().min(3).required(),
  city: Joi.string().required(),
  price: Joi.number().required(),
  state: Joi.string().required(),
  zipcode: Joi.string().required(),
  street: Joi.string().required(),
})

module.exports = {
  createUserValidator,
  createPostValidator,
}
