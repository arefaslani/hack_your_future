const express = require('express')
const db = require('../db')

const router = express.Router()

// A middleware that logs time of request plus query parameters
router.use((req, _res, next) => {
  const time = new Date()
  console.log('request made at:', time.toLocaleString(), 'with params:', req.query)
  next()
})

router.get('/accounts', async (req, res) => {
  // SQL: SELECT accounts.*, users.first_name AS owner_first_name, users.last_name AS owner_last_name
  //  FROM ACCOUNTS
  //  INNER JOIN users ON users.id = acconts.owner_id
  let query = db('accounts')
    .select(
      'accounts.*', // select all columns from accounts table
      'users.first_name as owner_first_name', // rename users.first_name to owner_first_name
      'users.last_name as owner_last_name', // rename users.last_name to owner_last_name
    )
    .innerJoin('users', 'users.id', 'accounts.owner_id');

  // if minBalance query param is provided
  if (req.query.minBalance) {
    // convert the string minBalance value to integer
    const minBalance = parseInt(req.query.minBalance);
    // if the provided value is a number, add the WHERE condition to the SQL query
    if (!isNaN(minBalance)) {
      // SQL: SELECT balance >= ${minBalance}
      query = query.where('balance', '>=', minBalance);
    }
  }

  // if maxBalance query param is provided
  if (req.query.maxBalance) {
    // convert the string maxBalance value to integer
    const maxBalance = parseInt(req.query.maxBalance);
    // if the provided value is a number, add the WHERE condition to the SQL query
    if (!isNaN(maxBalance)) {
      // SQL: SELECT balance <= ${maxBalance}
      query = query.where('balance', '<=', maxBalance);
    }
  }

  try {
    // execute the database query
    const accounts = await query;
    const serializedAccounts = accounts.map((account) => ({
      ...account,
      // remove owner_first_name field
      owner_first_name: undefined,
      // remove owner_first_name field
      owner_last_name: undefined,
      // add owner object
      owner: {
        first_name: account.owner_first_name,
        last_name: account.owner_last_name,
      }
    }))

    // render serialized results as JSON
    res.json(serializedAccounts);
  } catch (error) {
    // Proper error handling goes here
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router
