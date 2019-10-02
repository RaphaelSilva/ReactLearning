/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueryOptions, queryCallback, createPool } from 'mysql'
import { EntitiId } from '../entities/IEntities'

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
  protected table: string
  protected fields: Array<string>

  constructor (table: string, fields?: Array<string>) {
    this.table = table
    this.fields = fields || []
  }

  protected selectWhere (clause: string, fields?: Array<string>): string {
    return this.buildSelect(fields) + ' where ' + clause
  }

  protected executeQuery<T> (query: QueryOptions,
    exec: (err, result: queryCallback | ResultQuery, resolve: (value?: T) => void, reject: any) => void
  ): Promise<T> {
    return new Promise<T>(
      (resolve, reject) => {
        ADao.pool.getConnection((errCon, connection) => {
          if (errCon) reject(errCon)
          connection.query(query, (err, rows: queryCallback) => {
            if (ADao.debug) console.log(rows)
            exec(err, rows, resolve, reject)
            connection.destroy()
          })
        })
      })
  }

  protected getResult<T> (query: QueryOptions,
    /* parser function for specialization */ parser?: (data: any) => T): Promise<T> {
    if (ADao.debug) console.log(query)
    return this.executeQuery<T>(query, (err, rows: queryCallback, resolve: (value?: T) => void, reject: any) => {
      if (err || rows.length > 1) reject(err)
      if (rows.length < 1) {
        resolve(null)
      } else {
        resolve(parser ? parser(rows[0])
          : rows[0] as T)
      }
    })
  }

  protected getResults<T> (query: QueryOptions,
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

  protected removeData (obj: K, query: QueryOptions): Promise<K> {
    if (ADao.debug) console.log(query)
    return this.executeQuery<K>(query, (err, result: ResultQuery, resolve: (value?: K) => void, reject: any) => {
      if (err) {
        reject(err)
      } else {
        obj.id = 0
        resolve(obj)
      }
    })
  }

  protected buildSelect (fields?: Array<string>): string {
    let select = 'select '
    select += fields && fields.length > 0 ? fields.toString() : '*'
    select += ' from ' + this.table
    return select
  }

  protected buildInsertInto (fields: Array<string>): string {
    let insert = 'insert into ' + this.table
    insert += ' (' + fields.toString() + ')'
    insert += ' values ( '
    for (let i = 0; i < fields.length - 1; i++) {
      insert += '?, '
    }
    insert += '? ) '
    return insert
  }

  protected buildDelete (cls = 'id = ?'): string {
    return 'delete from ' + this.table + ' where ' + cls
  }

  public list (parse?: Function): Promise<Array<K>> {
    return this.getResults<K>({ sql: this.buildSelect(this.fields) }, parse)
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
      sql: this.selectWhere('id = ?'),
      values: [id]
    })
  }

  public newData (obj: K): Promise<K> {
    const vls = [this.fields.length]
    for (let i = 0; i < this.fields.length; i++) {
      vls[i] = Reflect.get(obj, this.fields[i])
    }
    return this.insertData(obj, {
      sql: this.buildInsertInto(this.fields),
      values: vls
    })
  }

  public deleteData (obj: K): Promise<K> {
    return this.removeData(obj, {
      sql: this.buildDelete(),
      values: [obj.id]
    })
  }
}
