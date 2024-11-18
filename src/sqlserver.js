// Configurações de conexão SQL Server
const config = {
    user: 'sa',
    password: '021221',
    database: 'lekkus',
    server: 'localhost',
    port: 1433,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      trustServerCertificate: true
    }
  }
export default config 


