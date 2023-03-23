import Joi from 'joi'

export const validateClientData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    phoneNumber: Joi.string().allow('').max(50),
    phoneCountryCode: Joi.string().allow('').max(50),
    address: Joi.string().min(0).max(200).allow(''),
    uiName: Joi.string().min(1).max(100).required()
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
    uiName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(50).required(),
    nationality: Joi.string().allow('').max(50),
    phoneNumber: Joi.string().allow('').max(50),
    phoneCountryCode: Joi.string().allow('').max(50),
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
    uiName: Joi.string().min(1).max(100).required(),
    nit: Joi.string().allow(''),
    country: Joi.string().max(50).allow(''),
    city: Joi.string().max(50).allow(''),
    phoneNumber: Joi.string().allow('').max(50),
    phoneCountryCode: Joi.string().allow('').max(50),
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
  const schema = Joi.object({
    productName: Joi.string().max(50).required(),
    productType: Joi.string().max(50).required(),
    productPrice: Joi.number().required(),
    productDozenPrice: Joi.number().required(),
    uiName: Joi.string().min(1).max(100).required(),
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
    orderClient: Joi.string().required(),
    listOfInventoryOutputs: Joi.array().items(
      Joi.object({
        inventoryOutput: Joi.string().required()
      })
    ),
    listOfIncomes: Joi.array().items(
      Joi.object({
        incomes: Joi.string().required()
      })
    ),
    orderProduct: Joi.string().required(),
    orderNumber: Joi.string().required().max(50),
    orderProductAmount: Joi.number().required(),
    orderProductAmountType: Joi.string().max(50).required(),
    orderPrice: Joi.number().required(),
    orderPayedPrice: Joi.number().required(),
    orderBalance: Joi.number().required(),
    orderCreationDate: Joi.date().required(),
    orderDeliveryDate: Joi.date().required(),
    orderState: Joi.string().max(50).required(),
    orderStateNumber: Joi.number().required(),
    orderPaidState: Joi.string().max(50).required(),
    orderPaidStateNumber: Joi.number().required(),
    uiName: Joi.string().min(1).max(100).required(),
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

export const validateRawMaterialData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    uiName: Joi.string().min(1).max(100).required(),
    unitMeasure: Joi.object({
      _id: Joi.string().max(10),
      name: Joi.string().max(50),
      uiName: Joi.string().max(50),
      pluralName: Joi.string().max(50),
      spanishName: Joi.string().max(50),
      pluralSpanishName: Joi.string().max(50),
      abbreviation: Joi.string().max(10)
    }).required(),
    features: Joi.array().items(
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

export const validateIncomeData = (req, res, next) => {
  const schema = Joi.object({
    accountingSeat: Joi.string().required(),
    client: Joi.string().required(),
    order: Joi.string().required(),
    date: Joi.string().required(),
    amount: Joi.string().required(),
    concept: Joi.string().required()
  })
  const { error } = schema.validate(req.body)

  if (error) {
    console.log(error.details[0].message)
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}

export const validateExpenseData = (req, res, next) => {
  const schema = Joi.object({
    accountingSeat: Joi.string().required(),
    category: Joi.string().required(),
    inventoryInput: Joi.string().allow(''),
    creditorEmployee: Joi.string().allow(''),
    creditorProvider: Joi.string().allow(''),
    creditorEntity: Joi.string().allow(''),
    date: Joi.date().required(),
    amount: Joi.number().required(),
    concept: Joi.string().required()
  })
  const { error } = schema.validate(req.body)

  if (error) {
    console.log(error.details[0].message)
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}

export const validateInventoryInputData = (req, res, next) => {
  const schema = Joi.object({
    numberOfInput: Joi.string().required(),
    provider: Joi.string().required(),
    date: Joi.date().required(),
    listOfMaterials: Joi.array().items(
      Joi.object({
        rawMaterial: Joi.string().required(),
        amount: Joi.number().required(),
        unitMeasure: Joi.string().required(),
        price: Joi.number().required()
      })
    ),
    totalPrice: Joi.number().required()
  })
  const { error } = schema.validate(req.body)

  if (error) {
    console.log(error.details[0].message)
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}

export const validateInventoryOutputData = (req, res, next) => {
  const schema = Joi.object({
    numberOfInput: Joi.string().required(),
    // employee: Joi.string().required(),
    order: Joi.string().required(),
    date: Joi.date().required(),
    listOfMaterials: Joi.array().items(
      Joi.object({
        rawMaterial: Joi.string().required(),
        amount: Joi.number().required(),
        unitMeasure: Joi.string().required(),
        price: Joi.number().required()
      })
    ),
    estimatedPrice: Joi.number().required()
  })
  const { error } = schema.validate(req.body)

  if (error) {
    console.log(error.details[0].message)
    return res.status(400).json({ message: error.details[0].message })
  }
  next()
}
