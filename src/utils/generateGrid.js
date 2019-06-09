const fs = require('fs')
const path = require('path')
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

const generateLights = (cars) => {
  const vias = Math.floor(Math.random() * 3) + 1
  let limiar = Math.floor(Math.random() * 3) + 1

  if (cars / vias > limiar) { limiar = Math.floor(cars / vias) + 1 }
  return {
    cars: cars,
    vias: vias,
    limiar: limiar
  }
}

const calcThreshold = (light) => {
  return Math.floor(light.cars / light.vias) + 1
}

module.exports = {
  generateGrid: () => {
    const res = []
    const vehicleCount = fs.readFileSync(path.join(__dirname, './vehicle_count.csv')).toString().split(',')
    
    for (const count of vehicleCount) {
      let esquina = {
        n1: generateLights(parseInt(count) + 2),
        n2: generateLights(Math.floor(parseInt(count) * 2) + 2)
      }
      res.push(esquina)
    }
    return { grid: res }
  },

  /* calcTimes: (quarter) => {
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
 */
  calcTimes: (city) => {
    let signal
    let ticks
    const res = []
    city.map((quarter) => { 
      let threshold = {
        n1: calcThreshold(quarter.n1),
        n2: calcThreshold(quarter.n2)
      }
  
      threshold.n1 / quarter.n1.limiar > threshold.n2 / quarter.n2.limiar ? signal = 1 : signal = 2
  
      signal === 1 ? ticks = threshold.n1 + 1 : ticks = threshold.n2 + 1
      res.push({
        n: signal,
        ticks: ticks 
      }) 
    })
    return res
  }
}
