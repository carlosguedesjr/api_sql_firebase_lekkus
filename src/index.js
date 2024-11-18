import express from "express";
import cors from "cors";
import { getOperacoes, postOperacao } from "./queries.js";
import config from "./sqlserver.js";
import sqlserver from "mssql"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/operacoes", async (request, response) => {
  const result = await getOperacoes();
  return response.json(result);
});

app.post("/operacoes", async (request, response) => {
  const operacao = request.body;c
  const result = await postOperacao(operacao);
  return response.json({ created: result });
});

const cron = async (  ) => {
 try {
  
  const connection = await sqlserver.connect(config);

  const {rowsAffected, recordset} = await sqlserver.query("select * from transacional where INTEGRADO = 0 AND JSON_VALIDO = 1")
  

  if (rowsAffected > 0){
    console.log('rowsAffected->' + rowsAffected);
    const idsTransacional = recordset.map( item => `'${item.ID}'`).join(',')
  
    await processamentoTransacional(1,idsTransacional);
  
    recordset.forEach( async (item) =>  {
  
      if(item['DT_CADASTRO']){
        var dataHora = new Date(item['DT_CADASTRO']);
        var dataFormatada = ("0" + dataHora.getDate()).slice(-2) + "/" +
                            ("0" + (dataHora.getMonth() + 1)).slice(-2) + "/" + 
                            dataHora.getFullYear() + " " + 
                            ("0" + dataHora.getHours()).slice(-2) + ":" + 
                            ("0" + dataHora.getMinutes()).slice(-2) + ":" + 
                            ("0" + dataHora.getSeconds()).slice(-2);
      }
      var param =  {
        "data_hora": dataFormatada,
        "metodo":item['METODO']? item['METODO'].trim():'',
        "request":item['OPERACAO_JSON'],
        "tabela_referencia":item['TABELA_REFERENCIA']? item['TABELA_REFERENCIA'].trim():'NÃO INFORMADO',
        "url": item['URL']? item['URL'].trim(): '',
        "id_origem": item['ID'],
        "empresa": item['EMPRESA'] ,
        "status": 0,
        "integracao": 0,
      }
  
      await postOperacao(param)     
    })
  
    await processamentoTransacional(2,idsTransacional);
  
  }
  
  await connection.close();
  
 } catch (error) {
  console.log(error);
 }
}

setInterval(() => {
  cron();  
}, 3000);//5minutos


app.listen(3333, () => {
  console.log("Servidor rodando");
});


async function processamentoTransacional(processoIntegrado, idsTransacional){
  const updateResult= await sqlserver.query(`UPDATE TRANSACIONAL SET INTEGRADO = ${processoIntegrado} WHERE ID IN (${idsTransacional})`)
}