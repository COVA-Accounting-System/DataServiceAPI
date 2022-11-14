import Joi from 'joi'

export const validateClientData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30),
    phone: Joi.number(),
    inDebt: Joi.number(),
    address: Joi.string().min(2).max(40)
  })

  const { error } = schema.validate(req.body)

  if (error) {
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
