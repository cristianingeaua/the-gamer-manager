export default {
  port: 8080,
  database: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'the-gamer',
    },
    migrations: {
      tableName: 'migrations'
    }
  }
}

