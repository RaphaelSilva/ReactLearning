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
        daoTest.testRemoveById()
      })
  })
