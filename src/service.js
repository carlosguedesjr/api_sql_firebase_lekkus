import config from "./sqlserver";
import { getOperacoes, postOperacao } from "./queries.js";

const cron = ( execute ) => {
    const connection = new Connection(config);
    if(execute) {
        setInterval(() => {
            
            connection.on('connect', (err) => {
                if (err) {
                    console.error('Erro ao conectar:', err);
                    return;
                }
                console.log('Conectado ao banco de dados.');
        
                // Executar a consulta
                const request = new Request('SELECT * FROM transacional', (err, rowCount, rows) => {
                    if (err) {
                        console.error('Erro na consulta:', err);
                    } else {
                        console.log(`${rowCount} registros retornados:`);
                        rows.forEach((columns) => {
                            columns.forEach((column) => {
                                console.log(`${column.metadata.colName}: ${column.value}`);
                                //postOperacao(operacao);
                            });
                            
                        });
                    }
                    connection.close(); // Fechar a conexão após a consulta
                });
        
                connection.execSql(request);
            });
        
            connection.connect();
        

        }, 50000);
    }
}

export default cron