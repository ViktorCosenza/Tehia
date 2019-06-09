/* const generateLights = () => {
  const cars = Math.floor(Math.random() * 10) + 1
  const vias = Math.floor(Math.random() * 3) + 1
  let limiar = Math.floor(Math.random() * 3) + 1

  if (cars / vias > limiar) { limiar = Math.floor(cars / vias) + 1 }

  return {
    cars: cars,
    vias: vias,
    limiar: limiar
  }
} */

const generateLights = (imgPath) => {
  const spawn = require('child_process').spawn
  const pythonProcess = spawn('python', ['./Yolo/get_vehicles.py', `--image_file ${imgPath}`])

  const vias = Math.floor(Math.random() * 3) + 1
  let limiar = Math.floor(Math.random() * 3) + 1

  pythonProcess.stdout.on('data', (cars) => {
    if (cars / vias > limiar) { limiar = Math.floor(cars / vias) + 1 }
    return {
      cars: cars,
      vias: vias,
      limiar: limiar
    }
  })
}

const calcThreshold = (light) => {
  return Math.floor(light.cars / light.vias) + 1
}

module.exports = {

  generateGrid: () => {
    const res = []
    for (let i = 0; i < 12; ++i) {
      let esquina = {
        n1: generateLights(),
        n2: generateLights()
      }

      res.push(esquina)
    }

    return { grid: res }
  },

  calcTimes: (quarter) => {
    let signal
    let ticks
    let threshold = {
      n1: calcThreshold(quarter.n1),
      n2: calcThreshold(quarter.n2)
    }

    threshold.n1 / quarter.n1.limiar > threshold.n2 / quarter.n2.limiar ? signal = 1 : signal = 2

    signal === 1 ? ticks = threshold.n1 + 1 : ticks = threshold.n2 + 1

    return {
      n: signal,
      ticks: ticks
    }
  }
}
