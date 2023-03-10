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
    nationality: Joi.string().allow(''),
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

export const validateProviderData = (req, res, next) => {
  const schema = Joi.object({
    storeName: Joi.string().min(1).max(50).required(),
    nit: Joi.number().allow(''),
    country: Joi.string().max(50).allow(''),
    city: Joi.string().max(50).allow(''),
    phoneNumber: Joi.string().allow(''),
    phoneCountryCode: Joi.string().allow(''),
    address: Joi.string().max(100).allow('')
  })
  const { error } = schema.validate(req.body)

  if (error) {
    console.log(error.details[0].message)
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}

export const validateProductData = (req, res, next) => {
  console.log(req.body)
  const schema = Joi.object({
    productName: Joi.string().max(50).required(),
    productType: Joi.string().max(50).required(),
    productPrice: Joi.number().required(),
    productDozenPrice: Joi.number().required(),
    productFeatures: Joi.array().items(
      Joi.object({
        description: Joi.string()
      })
    )
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
    orderClient: Joi.object({
      uiName: Joi.string(),
      _id: Joi.string()
    }).required(),
    orderProduct: Joi.object({
      _id: Joi.string().required(),
      uiName: Joi.string().required(),
      productType: Joi.string().required()
      // productPrice: Joi.number().required(),
      // productDozenPrice: Joi.number().required()
    }).required(),
    orderNumber: Joi.number().required(),
    orderProductAmount: Joi.number().allow(''),
    orderProductAmountType: Joi.string().max(50).allow(''),
    orderPrice: Joi.number().required(),
    orderCreationDate: Joi.date().allow(''),
    orderDeliveryDate: Joi.date().allow(''),
    orderState: Joi.string().max(50).allow(''),
    orderStateNumber: Joi.number().allow(''),
    orderFeatures: Joi.array().items(
      Joi.object({
        description: Joi.string()
      })
    )
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}
