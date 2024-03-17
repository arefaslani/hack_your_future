const express = require('express')
const router = express.Router()

router.get('/accounts', (req, res) => {
  res.json({
    owner: 'John Doe',
    balance: 2000
  })
})

module.exports = router
