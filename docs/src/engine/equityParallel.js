export async function equityParallel(hero, position, board=[], trials=2000, threads=2) {
  const per = Math.ceil(trials / threads)
  if (typeof Worker === 'undefined') {
    const { equityVsRange } = await import('./equityMonteCarlo.js')
    return equityVsRange(hero, position, board, trials)
  }
  const workers = []
  const promises = []
  for (let i = 0; i < threads; i++) {
    const w = new Worker(new URL('../workers/equityWorker.js', import.meta.url), { type: 'module' })
    workers.push(w)
    promises.push(new Promise(resolve => {
      w.onmessage = e => resolve(e.data)
    }))
    w.postMessage({ hero, position, board, trials: per })
  }
  const results = await Promise.all(promises)
  for (const w of workers) w.terminate()
  const equity = results.reduce((a,b)=>a+b.equity,0) / results.length
  return { equity }
}

