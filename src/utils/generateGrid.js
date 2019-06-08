module.exports = {
  generateGrid: () => {
    const res = []

    for (let i = 0; i < 10; ++i) {
      let esquina = {
        n1: {
          cars: Math.floor(Math.random() * 10),
          vias: Math.floor(Math.random() * 3) + 1
        },
        n2: {
          cars: Math.floor(Math.random() * 10),
          vias: Math.floor(Math.random() * 3) + 1
        }
      }

      res.push(esquina)
    }

    return res
  },

  calcThreshold: (light) => {
    return light.cars / light.vias
  },

  calcTimes: (city) => {
    const res = []
    for (const lights of city) {
      let signal
      this.calcThreshold(lights.n1) > this.calcThreshold(lights.n2) ? signal = 1 : signal = 2

      res.push({
        n: signal,
        time: 30
      })
    }
  }
}
