const chalk = require('chalk')

const tmplRe = /%([bcijefostTuvxX])(\(([a-zA-Z.]+)\))?/g

const formatFns = {
  b: (v) => parseInt(v, 10).toString(2),
  c: (v) => String.fromCharCode(parseInt(v, 10)),
  i: (v) => parseInt(v, 10),
  j: (v) => JSON.stringify(v),
  e: (v) => parseFloat(v).toExponential(),
  f: (v) => parseFloat(v),
  o: (v) => v.toString(8),
  s: (v) => String(v),
  t: (v) => String(!!v),
  T: (v) => type(v),
  u: (v) => parseInt(v, 10) >>> 0,
  v: (v) => v.valueOf(),
  x: (v) => parseInt(v, 10).toString(16),
  X: (v) => parseInt(v, 10).toString(16).toUpperCase()
}

function type (v) {
  if (Array.isArray(v)) return 'array'
  if (typeof v === 'number') return 'number'
  if (typeof v === 'string') return 'string'
  if (v === null) return 'null'
  return typeof v
}

function carbonate (input) {
  if (typeof input !== 'string') {
    throw new Error(`Expecting template to be a string, got ${typeof input}.`)
  }

  const vars = Array.prototype.splice.call(arguments, 1)
  let interpolated = input
  let i = -1
  let matches

  while ((matches = tmplRe.exec(interpolated)) !== null) {
    i++

    if (typeof vars[i] === 'undefined') {
      return
    }

    const formatter = formatFns[matches[1]]
    const start = matches.index
    const end = matches.index + matches[0].length
    const seen = ['chalk']

    const fn = matches[3] ? matches[3].split('.').reduce((chain, prop) => {
      seen.push(prop)

      if (!chain[prop]) {
        throw new Error(`[carbonate] ${seen.join('.')} does not exist.`)
      }

      return chain[prop]
    }, chalk) : (v) => v

    if (!formatter) {
      throw new Error(`[carbonate] unrecognised type specifier "${matches[1]}".`)
    }

    let newStr = interpolated.substr(0, start)
    newStr += fn(formatter(vars[i]))
    newStr += interpolated.substr(end)
    interpolated = newStr
  }

  return interpolated
}

module.exports = carbonate

module.exports.log = function () {
  const interpolated = carbonate.apply(null, arguments)
  console.log(interpolated)
}
