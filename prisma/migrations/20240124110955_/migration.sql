-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "nome" DROP NOT NULL,
ALTER COLUMN "ddd" DROP NOT NULL,
ALTER COLUMN "telefone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EnderecoEmpresa" ALTER COLUMN "tipo_logradouro" DROP NOT NULL,
ALTER COLUMN "logradouro" DROP NOT NULL,
ALTER COLUMN "numero" DROP NOT NULL,
ALTER COLUMN "complemento" DROP NOT NULL,
ALTER COLUMN "bairro" DROP NOT NULL,
ALTER COLUMN "cidade" DROP NOT NULL,
ALTER COLUMN "estado" DROP NOT NULL,
ALTER COLUMN "cep" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EnderecoRepresentante" ALTER COLUMN "enderecoCompleto" DROP NOT NULL,
ALTER COLUMN "cidade" DROP NOT NULL,
ALTER COLUMN "estado" DROP NOT NULL;
