export function chooseAction(context, rules) {
  for (const r of rules) {
    if (r.when(context)) return r.do(context)
  }
  return { type: 'Check' }
}

