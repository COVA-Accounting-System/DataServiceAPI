import Joi from 'joi'

export const validateClientData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    phoneNumber: Joi.string().allow(''),
    phoneCountryCode: Joi.string().allow(''),
    address: Joi.string().min(0).max(100).allow('')
  })

  const { error } = schema.validate(req.body)

  if (error) {
    console.log(error.details[0].message)
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}

export const validateEmployeeData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    nationality: Joi.string().min(1).max(50).allow(''),
    phoneNumber: Joi.string().allow(''),
    phoneCountryCode: Joi.string().allow(''),
    ci: Joi.number().required(),
    startDate: Joi.date().allow(''),
    birthday: Joi.date().allow('')
  })
  const { error } = schema.validate(req.body)

  if (error) {
    console.log(error.details[0].message)
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}

export const validateOrderData = (req, res, next) => {
  const schema = Joi.object({
    client: Joi.string().max(50).required(),
    creationDate: Joi.date().required(),
    orderNumber: Joi.number().required(),
    dataTable: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().max(50).required(),
          amount: Joi.number().required(),
          price: Joi.number().required()
        })
      )
      .required()
  })

  const { error } = schema.validate(req.body)
  // console.log(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}
