import TestDao from './TestDao'

console.clear()
console.log('@##########################################################@')
console.log('@##########################################################@')
console.log('@##########################################################@')

const daoTest = new TestDao()
daoTest.testInsertData()
  .then(() => {
    daoTest.testFetchById()
      .then(() => {
        daoTest.testRemoveById().catch((error) => {
          console.log('testRemoveById')
          console.log(error)
        })
      }).catch((error) => {
        console.log('testFetchById')
        console.log(error)
      })
  }).catch((error) => {
    console.log('testInsertData')
    console.log(error)
  })
