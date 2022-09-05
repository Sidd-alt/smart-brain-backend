const handleRegister = (req, res, db, bcrypt) => {
   const { email, password, name } = req.body;
   var hash = bcrypt.hashSync(password);

   db.transaction(trx => {
      trx.insert({
         hash: hash,
         email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
         return trx('users')
         .returning('*')
         .insert({
            email: email,
            name: name,
            joined: new Date()
         })
         .then(response => {
            const { id, name, email, entries, joined } = response[0];
            const data = {
               status: 1,
               userdetails: { id, name, email, entries, joined }
            }
            res.json(data)
         })
      })
      .then(trx.commit)
      .catch(trx.rollback)   
   })
   .catch(err => res.status(400).json("Unable to register. Please try again later"))
}

module.exports = {
   handleRegister: handleRegister
}