CREATE TRIGGER trg_cliente_operacao
ON tbLekkus_Cliente
AFTER INSERT, UPDATE
AS
BEGIN
    -- Declarando as variáveis
    DECLARE @codCliente INT;
    DECLARE @RazaoSocial NVARCHAR(255);
    DECLARE @NomeFantasia NVARCHAR(255);
    DECLARE @Cnpj NVARCHAR(25);
    DECLARE @json NVARCHAR(MAX);
    DECLARE @metodo NVARCHAR(10);
	DECLARE @isValid BIT;

    -- Selecionando os valores inseridos ou atualizados da tabela cliente
    SELECT 
        @codCliente = i.codCliente,
        @RazaoSocial = i.RazaoSocial,
        @NomeFantasia = i.NomeFantasia,
        @Cnpj = i.Cnpj
    FROM inserted i;

    -- Determinando se a operação foi um INSERT ou UPDATE
    IF EXISTS (SELECT 1 FROM inserted i JOIN deleted d ON i.codCliente = d.codCliente)
    BEGIN
        SET @metodo = 'PUT';  -- UPDATE
    END
    ELSE
    BEGIN
        SET @metodo = 'POST'; -- INSERT
    END

    -- Criando o JSON com os dados do cliente
    SET @json = (SELECT @codCliente AS codCliente,
						@RazaoSocial AS RazaoSocial,
                        @NomeFantasia AS NomeFantasia,
                        @Cnpj AS Cnpj,
                        @metodo AS metodo
                 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER);

	-- Validando o JSON
    SET @isValid = CASE WHEN ISJSON(@json) = 1 THEN 1 ELSE 0 END;
    
	-- Inserindo o JSON na tabela transacional
    INSERT INTO TRANSACIONAL (EMPRESA, OPERACAO_JSON, JSON_VALIDO,METODO,TABELA_REFERENCIA,AMBIENTE)
    VALUES ('CASAELETRECISTA', @json, @isValid, @metodo, 'CLIENTES',0 );
END;
GO

