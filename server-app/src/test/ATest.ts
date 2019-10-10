import ADao from '../dao/ADao'
import { EntitiId } from '../models/Entities'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateObj (data1: any, data2: any, clazz: string, fields: string): void {
  const f = fields.split(',')
  f.forEach(field => {
    const v1 = Reflect.get(data1, field)
    let v2 = Reflect.get(data2, field)
    if (typeof v1 === 'boolean' && typeof v2 === 'number') v2 = (v2 === 1)
    console.assert(v1 === v2,
      '@validateObj[' + clazz + '] Property [' + field + '] is -\t-> [' + v1 + '] != [' + v2 + ']')
  })
}

export function testDeleteData<K extends EntitiId> (data: K, dao: ADao<K>, clazz: string): Promise<K> {
  return new Promise<K>((resolve, reject): void => {
    dao.deleteData(data)
      .then((resultDeleted) => {
        console.assert(resultDeleted == null, `@testDeleteData[${clazz}]`)
        resolve(resultDeleted)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function testFetch<K extends EntitiId> (id: number, data: K, dao: ADao<K>, clazz: string): Promise<K> {
  return new Promise<K>((resolve, reject): void => {
    dao.fetchById(id)
      .then((resultFetch) => {
        validateObj(data, resultFetch, clazz, dao.fields)
        resolve(resultFetch)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function testInsert<K extends EntitiId> (data: K, dao: ADao<K>, clazz: string): Promise<K> {
  return new Promise<K>((resolve, reject): void => {
    dao.add(data).then((savedData) => {
      console.assert(savedData.id, '@validateObj[' + clazz + '] Property [id] is [' + savedData.id + ']')
      validateObj(data, savedData, clazz, dao.fields)
      resolve(savedData)
    }).catch((error) => {
      reject(error)
    })
  })
}
