export function renderReplay(el, hand) {
  el.innerHTML = ''
  const list = document.createElement('ol')
  for (const step of hand.steps) {
    const li = document.createElement('li')
    li.textContent = `${step.actor} ${step.action} ${step.size || ''}`.trim()
    list.appendChild(li)
  }
  el.appendChild(list)
}

