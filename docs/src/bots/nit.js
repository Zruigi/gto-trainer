import { chooseAction } from './decisionTree.js'

export function actNit(context) {
  const rules = [
    { when: ctx => !ctx.preflopTop15, do: ctx => ({ type: 'Fold' }) },
    { when: ctx => !(ctx.hasTopPair || ctx.hasStrongDraw), do: ctx => ({ type: 'Fold' }) }
  ]
  return chooseAction(context, rules)
}

