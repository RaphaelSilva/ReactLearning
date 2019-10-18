/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueryOptions, queryCallback, createPool } from 'mysql'
import { EntitiId } from '../models/Entities'

interface ResultQuery {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}

export default class ADao<K extends EntitiId> {
  static pool = createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 8081,
    user: 'admin',
    password: 'admin',
    database: 'db_spaziord'
  })

  static debug = false
  public table: string
  public fields: string

  constructor (table: string, fields?: string) {
    this.table = table
    this.fields = fields
  }

  protected selectWhere (clause: string, fields?: string): string {
    const select = this.buildSelect(fields) + this.fromTable()
    return select + ' where ' + clause
  }

  protected executeQuery<T> (query: QueryOptions,
    exec: (err, result: queryCallback | ResultQuery, resolve: (value?: T) => void, reject: any) => void
  ): Promise<T> {
    return new Promise<T>(
      (resolve, reject) => {
        ADao.pool.getConnection((errCon, connection) => {
          if (errCon) { reject(errCon) } else {
            connection.query(query, (err, rows: queryCallback | ResultQuery) => {
              if (ADao.debug) console.log(rows)
              exec(err, rows, resolve, reject)
              connection.destroy()
            })
          }
        })
      })
  }

  public getResult<T> (query: QueryOptions,
    /* parser function for specialization */ parser?: (data: any) => T): Promise<T> {
    if (ADao.debug) console.log(query)
    return this.executeQuery<T>(query, (err, rows: queryCallback, resolve: (value?: T) => void, reject: any) => {
      if (err || rows.length > 1) {
        reject(err)
      } else if (rows.length < 1) {
        reject(new Error('Consulta com mais de 1 item'))
      } else {
        resolve(parser ? parser(rows[0])
          : rows[0] as T)
      }
    })
  }

  public getResults<T> (query: QueryOptions,
    /* parser function for specialization */ parser?: Function): Promise<Array<T>> {
    if (ADao.debug) console.log(query)
    return this.executeQuery<Array<T>>(query, (err, rows: queryCallback, resolve: (value?: Array<T>) => void, reject: any) => {
      if (err) { reject(err) } else {
        resolve(parser ? parser(rows)
          : rows as unknown as Array<T>)
      }
    })
  }

  protected insertData (obj: K, query: QueryOptions): Promise<K> {
    if (ADao.debug) console.log(query)
    return this.executeQuery<K>(query, (err, result: ResultQuery, resolve: (value?: K) => void, reject: any) => {
      if (err) {
        reject(err)
      } else {
        obj.id = result.insertId
        resolve(obj)
      }
    })
  }

  protected updateData (obj: K, query: QueryOptions): Promise<ResultQuery> {
    if (ADao.debug) console.log(query)
    return this.executeQuery<ResultQuery>(query, (err, result: ResultQuery, resolve: (value?: ResultQuery) => void, reject: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }

  protected removeData (obj: K, query: QueryOptions): Promise<K> {
    if (ADao.debug) console.log(query)
    return this.executeQuery<K>(query, (err, result: ResultQuery, resolve: (value?: K) => void, reject: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(null)
      }
    })
  }

  public concatTableFields (fields?: string): string {
    if (fields) {
      const mTable = this.table + '.'
      const nField = mTable + fields.replace(/,/g, ',' + mTable)
      return nField
    } else {
      return '*'
    }
  }

  protected buildSelect (fields?: string): string {
    return 'select ' + this.concatTableFields(fields)
  }

  protected fromTable (): string {
    return ' from ' + this.table
  }

  protected getObjSqlFields (obj: K, fields: string): K {
    const cObj = {}
    fields.split(',').forEach(field => {
      cObj[field] = Reflect.get(obj, field)
    })
    return cObj as K
  }

  protected getObjValuesFields (obj: K, fields: string) {
    const flds = fields.split(',')
    const vls = [flds.length]
    for (let i = 0; i < flds.length; i++) {
      vls[i] = Reflect.get(obj, flds[i])
    }
    return vls
  }

  protected buildInsertInto (fields: string): string {
    let insert = 'insert into ' + this.table
    insert += ' (' + fields + ')'
    insert += ' values ( '
    const flds = fields.split(',')
    for (let i = 0; i < flds.length - 1; i++) {
      insert += '?, '
    }
    insert += '? ) '
    return insert
  }

  protected buildDelete (cls = 'id = ?'): string {
    return 'delete from ' + this.table + ' where ' + cls
  }

  public list = (parse?: Function): Promise<Array<K>> => {
    const select = this.buildSelect() + this.fromTable()
    return this.getResults<K>({ sql: select }, parse)
  }

  public fetchBy (
    param: string | number | Array<string | number>,
    whereParam = 'id = ?'): Promise<Array<K>> {
    return this.getResults<K>({
      sql: this.selectWhere(whereParam),
      values: param
    })
  }

  public fetchById (id: number): Promise<K> {
    return this.getResult<K>({
      sql: this.selectWhere(this.table + '.id = ?'),
      values: [id]
    })
  }

  public add (obj: K): Promise<K> {
    return this.insertData(obj, {
      sql: 'insert into ' + this.table + ' set ?',
      values: this.getObjSqlFields(obj, this.fields)
    })
  }

  public update (obj: K): Promise<ResultQuery> {
    return this.updateData(obj, {
      sql: 'update ' + this.table + ' set ? where id = ?',
      values: [this.getObjSqlFields(obj, this.fields), obj.id]
    })
  }

  public deleteData (obj: K): Promise<K> {
    return this.removeData(obj, {
      sql: this.buildDelete(),
      values: [obj.id]
    })
  }

  public deleteAll = (): Promise<K> => {
    return this.removeData(null, {
      sql: this.buildDelete('id > 0')
    })
  }

  public getComplexlist<N> (cls: string, parans: any, nfields: string, relation: string): Promise<Array<N>> {
    const select = `${this.buildSelect(this.fields)},${nfields} ${this.fromTable()} ${relation} where ${cls}`
    return this.getResults<N>({
      sql: select,
      values: parans
    })
  }

  public valideField (obj: K): Array<{
    msg: string;
    data: any;
    status: string;
  }> {
    const ret = []
    this.fields.split(',').forEach(field => {
      const value = Reflect.get(obj, field)
      if (typeof value === 'undefined') {
        ret.push({
          msg: `${this.table}.${field} => ${value}`,
          data: value,
          status: 'undefined'
        })
      }
    })
    return ret
  }
}
