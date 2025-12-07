import { renderGraph } from './Graph.js'
import { renderAnalysis } from './AnalysisPanel.js'
import { renderControls } from './Controls.js'
import { parseHandString } from '../engine/ranges.js'
import { equityParallel } from '../engine/equityParallel.js'
import { requiredEquity } from '../game/betting.js'
import { renderVarianceWarn } from './VarianceWarn.js'
import { simulateFoldOutcome } from '../game/simulator.js'

const graphEl = document.getElementById('graph')
const analysisEl = document.getElementById('analysis')
const varianceEl = document.getElementById('variance')
const controlsEl = document.getElementById('controls')

let points = []

async function update() {
  const hero = parseHandString('AsKh')
  const r = await equityParallel(hero, 'EP', [], 1000, 2)
  const pot = 20
  const bet = 10
  const req = requiredEquity(bet, pot)
  const advice = r.equity >= req ? 'Value/Semi-bluff' : 'Check/Fold'
  renderAnalysis(analysisEl, { equity: r.equity, requiredEquity: req, advice })
  const f = simulateFoldOutcome(hero, 'EP', [], 500, pot)
  renderVarianceWarn(varianceEl, f.ev)
  points.push({ x: points.length, y: (Math.random()-0.4)*10 })
  renderGraph(graphEl, points)
}

function resetFast() {
  points = []
  update()
}

renderControls(controlsEl, resetFast)
update()
