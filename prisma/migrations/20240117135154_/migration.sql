-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "ddd" VARCHAR(3) NOT NULL,
    "telefone" VARCHAR(16) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Representante" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "estadoCivil" VARCHAR(30) NOT NULL,
    "profissao" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,

    CONSTRAINT "Representante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroGeral" (
    "id" SERIAL NOT NULL,
    "numero" VARCHAR(14) NOT NULL,
    "orgaoExpedidor" VARCHAR(20) NOT NULL,
    "representanteId" INTEGER NOT NULL,

    CONSTRAINT "RegistroGeral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnderecoEmpresa" (
    "id" SERIAL NOT NULL,
    "tipo_logradouro" VARCHAR(20) NOT NULL,
    "logradouro" VARCHAR(20) NOT NULL,
    "numero" VARCHAR(10) NOT NULL,
    "complemento" VARCHAR(30) NOT NULL,
    "bairro" VARCHAR(20) NOT NULL,
    "cidade" VARCHAR(20) NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "EnderecoEmpresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnderecoRepresentante" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "cidade" VARCHAR(20) NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "representanteId" INTEGER NOT NULL,

    CONSTRAINT "EnderecoRepresentante_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Representante_cpf_key" ON "Representante"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "RegistroGeral_numero_key" ON "RegistroGeral"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "RegistroGeral_representanteId_key" ON "RegistroGeral"("representanteId");

-- CreateIndex
CREATE UNIQUE INDEX "EnderecoEmpresa_empresaId_key" ON "EnderecoEmpresa"("empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "EnderecoRepresentante_representanteId_key" ON "EnderecoRepresentante"("representanteId");

-- AddForeignKey
ALTER TABLE "RegistroGeral" ADD CONSTRAINT "RegistroGeral_representanteId_fkey" FOREIGN KEY ("representanteId") REFERENCES "Representante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnderecoEmpresa" ADD CONSTRAINT "EnderecoEmpresa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnderecoRepresentante" ADD CONSTRAINT "EnderecoRepresentante_representanteId_fkey" FOREIGN KEY ("representanteId") REFERENCES "Representante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
