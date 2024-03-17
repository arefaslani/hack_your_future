require('dotenv').config()

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'hyf',
    },
    seeds: {
      directory: './seeds',
    },
  },
}
