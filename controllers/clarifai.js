const Clarifai = require('clarifai');

const app = new Clarifai.App({
   apiKey: 'a0a7fed94e2c4f72bdf8855669197c0d'
})

const handleClarifaiAPI = (req, res) => {
   app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.inputText)
   .then(response => {
      return res.json(response)
   })
}

module.exports = {
   handleClarifaiAPI: handleClarifaiAPI
}