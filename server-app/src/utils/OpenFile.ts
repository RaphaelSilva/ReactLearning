import * as fs from 'fs'

export default class OpenFile {
  static path = './SysFiles/tokens/'
  static rootPublic = ''

  static write<T> (uri: string, data: T): void {
    fs.writeFile(uri, JSON.stringify(data), (err) => {
      if (err) {
        console.log(err)
        throw err
      }
    })
  }

  static read<T> (uri: string): T {
    return JSON.parse(fs.readFileSync(uri, 'utf8'))
  }

  static FolderExtets (root: string, perfilTag: string): boolean {
    fs.stat(root + perfilTag, (err, stat) => {
      if (err) console.log(err)
      console.log(stat)
    })
    console.log('Folder will return')
    return true
  }

  static moveFileFrom (oldPath: fs.PathLike, newPath: fs.PathLike): void {
    try {
      fs.renameSync(oldPath, this.rootPublic + newPath)
    } catch (error) {
      try {
        fs.copyFileSync(oldPath, this.rootPublic + newPath)
      } catch (err) {
        console.log(error)
        console.log(err)
      }
    }
  }
}
