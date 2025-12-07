export function renderControls(el, onReset) {
  el.innerHTML = ''
  const btn = document.createElement('button')
  btn.textContent = '一秒一局'
  btn.onclick = onReset
  el.appendChild(btn)
}

