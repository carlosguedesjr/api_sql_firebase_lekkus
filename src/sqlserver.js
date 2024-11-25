import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env
dotenv.config();

// Configurações de conexão SQL Server
const config = {
    user: process.env.sql_user,
    password: process.env.sql_password,
    database: process.env.sql_database,
    server: process.env.sql_server,
    port: Number(process.env.sql_port),
    pool: {
      max: Number(process.env.sql_pool_max),
      min: Number(process.env.sql_pool_min),
      idleTimeoutMillis: Number(process.env.sql_pool_idleTimeoutMillis)
    },
    options: {
      trustServerCertificate: true
    }
  }
export default config 


