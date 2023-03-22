// export const production_stage = {
//     onHold: "On Hold",
//     inProduction: "In Production",
//     finished: "Finished",
//     sold: "Sold"
// }

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
