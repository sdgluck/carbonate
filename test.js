const chalk = require('chalk')
const sprintf = require('./index')

test('handles no colour', () => {
  const str = sprintf('Hello %s, how are you?', 'Sam')
  expect(str).toBe('Hello Sam, how are you?')
})

test('handles single colour', () => {
  const str = sprintf('Hello %s(green), how are you?', 'Sam')
  expect(str).toBe(`Hello ${chalk.green('Sam')}, how are you?`)
})

test('handles chalk chains', () => {
  const str = sprintf('Hello %s(green.underline), how are you?', 'Sam')
  expect(str).toBe(`Hello ${chalk.green.underline('Sam')}, how are you?`)
})

test('handles multiple placeholders', () => {
  const str = sprintf('Hello %s(green.underline.bold), how are you %s(green.underline.bold)?', 'Sam', 'today')
  expect(str).toBe(`Hello ${chalk.green.underline.bold('Sam')}, how are you ${chalk.green.underline.bold('today')}?`)
})

test('multiple with and without colour', () => {
  const str = sprintf('Hello %s, how are you %s(green.underline.bold)?', 'Sam', 'today')
  expect(str).toBe(`Hello Sam, how are you ${chalk.green.underline.bold('today')}?`)
})

test('works with different specifiers', () => {
  const results = {
    b: [100, '1100100'],
    c: [97, 'a'],
    i: [10, '10'],
    j: [{a: 1}, '{"a":1}'],
    e: [100, '1e+2'],
    f: [10.1, '10.1'],
    o: [10, '12'],
    s: ['hi', 'hi'],
    t: [true, 'true'],
    T: [[], 'array'],
    u: [0o100, '64'],
    v: [{valueOf: () => 100}, '100'],
    x: [100, '64'],
    X: [1000, '3E8']
  }

  Object.keys(results).forEach((specifier) => {
    const [input, output] = results[specifier]
    const str = sprintf('%' + specifier, input)
    expect(str).toEqual(output)
  })
})
