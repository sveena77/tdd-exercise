import express from 'express'

const app = express()

app.get('/', (req, res, next) => {
  res.send('Das hat geklappt')
})

const port = process.env.port || 3000
app.listen(port, () => {
  console.log(`server is runnung on port ${port}`)
})

export default app
