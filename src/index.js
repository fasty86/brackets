module.exports = check
const braketPatterns = "123456()[]{}|78"
const specialChars = "|78"
function check(str, bracketsConfig) {
  if (str.length % 2 != 0) return false
  const parsedStr = parseStr2(str)
  if (!parsedStr) return false
  const parsedConfig = refactorConfig(bracketsConfig)
  let result = parsedStr.every((braket) => {
    return parsedConfig.includes(braket)
  })
  return result
}
const test = "([{}])"
const test2 = "((()))()"
const test3 = "|()|"
const test4 = "171272"
const config = [["(", ")"]]
const config2 = [
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
]
const config6 = [
  ["1", "2"],
  ["7", "7"],
]
function parseStr2(str) {
  let groups = []
  let parsed = []
  let i = 0
  for (let ch of str) {
    // console.log(
    //   `Curr: ${ch} vs ${parsed[parsed.length - 1]} stLength:${str.length}`
    // )
    // console.log(i++)
    let position = braketPatterns.indexOf(ch)
    if (position == -1) return false
    if (specialChars.indexOf(ch) != -1) {
      // если среди добавленных есть уже позиция особого символа
      if (parsed.includes(position)) {
        // console.log(`Curr: ${ch} vs ${parsed[parsed.length - 1]}`)
        // если  закрывающая пара равна текущему символу
        if (position == parsed.pop()) {
          let pair = `${braketPatterns[position]}${ch}`
          groups.includes(pair) == false ? groups.push(pair) : null
        }
        // если не равна
        else {
          return false
        }
      } else {
        parsed.push(position)
      }
    }
    if (position % 2 == 0 && specialChars.indexOf(ch) == -1) {
      parsed.push(position + 1)
    } else if (position % 2 != 0 && specialChars.indexOf(ch) == -1) {
      // console.log(`Curr: ${ch} vs ${parsed[parsed.length - 1]}`)
      if (position == parsed.pop()) {
        let pair = `${braketPatterns[position - 1]}${ch}`
        groups.includes(pair) == false ? groups.push(pair) : null
      } else {
        return false
      }
    }
  }
  return groups
}
// function parseStr(str) {
//   const parsedBrakets = []
//   str = str.split("")
//   while (str.length) {
//     parsedBrakets.push(`${str.shift()}${str.pop()}`)
//   }
//   console.log(parsedBrakets)
//   return parsedBrakets
// }
function refactorConfig(cfg) {
  return cfg.map((item) => {
    return item.join("")
  })
}

// console.log(check(test4, config6))
