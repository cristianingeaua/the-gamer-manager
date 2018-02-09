export default class ApiGenerator {
  constructor(app, model) {
    this.app = app
    this.model = model
    this.registerApis()
  }

  readList() {
    return (req, res) => {
      this.model.read(null, (err, results) => {
        res.json({
          errors: err,
          data: results
        })
      })
    }
  }

  readSingle() {
    return (req, res) => {
      let params = null
      try {
        params = JSON.parse('[' + req.params.id + ']')
      } catch(error) {
        return res.json({
          errors: [{
            code: 'invalid-parameter',
            message: 'The given parameter is not a valid id.'
          }],
          data: null
        })
      }
      params = (params.length == 1)? params[0] : params

      this.model.read({
        where: { id: params }
      }, (err, results) => {
        let result = null
        if (!err) {
          result = (results.length == 1)? results[0] : results
        }
        res.json({
          errors: err,
          data: result
        })
      })
    }
  }

  update() {
    return (req, res) => {
      this.model.update({
        fields: req.body,
        where: { id: req.params.id }
      }, (err, results) => {
        res.json({
          errors: err,
          data: results
        })
      })
    }
  }

  delete() {
    return (req, res) => {
      this.model.delete({
        where: { id: req.params.id }
      }, (err, results) => {
        res.json({
          errors: err,
          data: results
        })
      })
    }
  }

  registerApis() {
    this.app.get('/api/' + this.model.name, this.readList())
    this.app.get('/api/' + this.model.name + '/:id', this.readSingle())
    this.app.put('/api/' + this.model.name + '/:id', this.update())
    this.app.delete('/api/' + this.model.name + '/:id', this.delete())
  }
}
