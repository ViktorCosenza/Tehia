const app = require('./src/app')

const PORT = process.env.PORT || 3010

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}... `)
})