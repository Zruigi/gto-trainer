export function renderAnalysis(el, data) {
  el.innerHTML = `
    <div>当前胜率：<strong>${(data.equity*100).toFixed(1)}%</strong></div>
    <div>所需赔率：<strong>${(data.requiredEquity*100).toFixed(1)}%</strong></div>
    <div>EV 建议：<strong>${data.advice}</strong></div>
  `
}

