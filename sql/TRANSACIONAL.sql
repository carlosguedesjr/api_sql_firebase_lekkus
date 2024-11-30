CREATE TABLE TRANSACIONAL (
    ID INT PRIMARY KEY IDENTITY(1,1) NOT NULL, --indentificador unico
	EMPRESA NVARCHAR(25), --chave unica para o monitor saber em qual banco ir� realizar a opera��o
    OPERACAO_JSON NVARCHAR(MAX), -- json com todos os campos para o Monitor atualizar o banco 
	JSON_VALIDO BIT DEFAULT 0 CHECK (JSON_VALIDO IN (0, 1)), -- 0 N�O || 1 SIM  apenas para saber se a trigger criou um Json valido 
    METODO CHAR(5) NOT NULL, --POST| PUT para saber se foi uma atualiza��o ou um novo registro no banco
	TABELA_REFERENCIA CHAR(20) NOT NULL, -- referencia para saber qual tabela o Monitor ir� atualizar 
    DT_CADASTRO DATETIME DEFAULT GETDATE() NOT NULL, --data que o registo entrou na transacional
    INTEGRADO INT DEFAULT 0 CHECK (INTEGRADO IN (0, 1, 2)), -- 0 N�O INTEGRADO || 1 EM PROCESSO || 2 INTEGRADO
	AMBIENTE BIT DEFAULT 0 CHECK (AMBIENTE IN (0, 1)), -- 0 Lekkus antigo e 1 Lekkus novo
);
