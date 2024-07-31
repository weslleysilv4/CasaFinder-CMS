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
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  createdBy: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  address: Joi.string().min(5).required(),
  imgURL: Joi.string().uri().optional(),
  markdown: Joi.string().min(5).optional(),
  url: Joi.string().required().min(4),
})

module.exports = {
  createUserValidator,
  createPostValidator,
}
