export function renderVarianceWarn(el, ev) {
  const msg = ev < 0 ? `这虽然中了，但长期会亏 ${Math.abs(Math.round(ev*100))}` : `长期期望为正 ${Math.round(ev*100)}`
  el.textContent = msg
  el.style.color = ev < 0 ? '#c00' : '#090'
}

