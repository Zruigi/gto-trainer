import { chooseAction } from './decisionTree.js'

export function actFish(context) {
  const rules = [
    { when: ctx => ctx.hasAnyPair || ctx.hasAnyDraw, do: ctx => ({ type: 'Call' }) }
  ]
  return chooseAction(context, rules)
}

