import app from './app'

const config = app.get('config')

app.listen(config.port, () => {
  console.log('Listening on port: ' + config.port)
})
