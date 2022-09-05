const handleEntryCount = (req, res, db) => {
   const { id } = req.body;

   db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(response => {
      const data = {
         status : 1,
         entries: response[0].entries
      }
      return res.json(data)
  })
  .catch(err => res.status(400).json("Unable to update entries."))
}

module.exports = {
   handleEntryCount: handleEntryCount
}