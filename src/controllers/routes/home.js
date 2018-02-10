import Models from '../../models'

export default (app) => {
  const models = Models(app.get('knex'))

  function home(req, res) {
    res.render('views/home')
  }

  app.get('/', home)
}
