import * as fs from 'fs'

class OpenFile {
  static path = './SysFiles/tokens/'

  static write <T> (uri: string, data: T): void {
    fs.writeFile(uri, JSON.stringify(data), (err) => {
      if (err) {
        console.log(err)
        throw err
      }
    })
  }

  static read <T> (uri: string): T {
    return JSON.parse(fs.readFileSync(uri, 'utf8'))
  }
}

export default OpenFile
