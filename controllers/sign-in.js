const handleSignIn = (req, res, db, bcrypt) => {
   let { email, password } = req.body;
   db.select('email', 'hash').from('login')
   .where('email', '=', email)
   .then(data => {
      const isPasswordValid = bcrypt.compareSync(password, data[0].hash);
      if(isPasswordValid){
         return db.select('*').from('users')
         .where('email', '=', email)
         .then(user => {
            let { id, name, email, entries, joined } = user[0];
            const data = {
               status: 1,
               userdetails: { id, name, email, entries, joined }
            }
            res.json(data)
         })
         .catch(err => res.status(400).json('Unable to get user'))
      } else {
         res.status(400).json("Invalid credentials")
      }
   })
   .catch(err => res.status(400).json("Invalid credentials"))
}

module.exports = {
   handleSignIn: handleSignIn
}