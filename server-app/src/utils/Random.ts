export function getRndInteger (min, max): number {
  return Math.floor(Math.random() * (max - min)) + min
}

export function getRandomString (nw: number, lw: number): string {
  const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVYWXZ'
  const letrasMinusculas = 'abcdefghijklmnopqrstuvywxz'
  let phrase = ''
  for (let j = 0; j < nw; j++) {
    let world = letrasMaiusculas.charAt(getRndInteger(0, letrasMaiusculas.length))
    for (let i = 1; i < lw; i++) {
      world += letrasMinusculas.charAt(getRndInteger(0, letrasMinusculas.length))
    }
    phrase += world + ' '
  }
  return phrase.trim()
}
