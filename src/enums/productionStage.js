const productionStage = [
  {
    orderStateNumber: 0,
    state: 'On hold'
  },
  {
    orderStateNumber: 1,
    state: 'In production'
  },
  {
    orderStateNumber: 2,
    state: 'Finished'
  },
  {
    orderStateNumber: 3,
    state: 'Delivered'
  }
]

const maxProductionStage = productionStage.length - 1
const minProductionStage = 0

export { productionStage, maxProductionStage, minProductionStage }
