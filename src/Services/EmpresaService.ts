import { 
    BadRequestException, 
    Injectable, 
    InternalServerErrorException, 
    NotFoundException 
} from "@nestjs/common";
import { EnderecoEmpresa } from "@prisma/client";
import { EmpresaRepository } from "src/Repositories/EmpresaRepository";
const consultarCNPJ = require("consultar-cnpj");

@Injectable()
export class EmpresaService {
    constructor( 
        private readonly empresaRepository: EmpresaRepository
    ) {}

    async consultarCnpj(cnpj: string): Promise<any> {

        const empresa = await consultarCNPJ(cnpj);
        if (!empresa) {
            throw new BadRequestException("Este cnpj não existe.")
        }

        const dadosEndereco = {
            tipo_logradouro: empresa.estabelecimento.tipo_logradouro,
            logradouro: empresa.estabelecimento.logradouro,
            numero: empresa.estabelecimento.numero,
            complemento: empresa.estabelecimento.complemento,
            bairro: empresa.estabelecimento.bairro,
            cidade: empresa.estabelecimento.cidade.nome,
            estado: empresa.estabelecimento.estado.sigla,
            cep: empresa.estabelecimento.cep
        };

        const dadosEmpresa = {
            nome: empresa.razao_social,
            ddd: empresa.estabelecimento.ddd1,
            telefone: empresa.estabelecimento.telefone1,
            cnpj: cnpj,
            enderecoEmpresa: dadosEndereco
        };

        return dadosEmpresa;
    }

    async buscarEmpresa(idEmpresa: number): Promise<any> {
        try {
            return await this.empresaRepository.buscarEmpresa(idEmpresa);
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

    async buscarEmpresas(): Promise<any> {

        try {
            return await this.empresaRepository.buscarEmpresas();
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

    async cadastrarEmpresa(dados): Promise<any> {

        const { cnpj } = dados;
        const dadosEmpresa = await this.consultarCnpj(cnpj);
        
        try {
            const empresa = await this.empresaRepository.cadastrarEmpresa(dadosEmpresa);
            return empresa;
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

    async editarEmpresa(
        idEmpresa: number, 
        dadosEmpresa: {
            nome: string,
            ddd: string,
            telefone: string,
            cnpj: string,
            enderecoEmpresa: EnderecoEmpresa
    }): Promise<any> {

        if (!await this.empresaRepository.buscarEmpresa(idEmpresa)) {
            throw new NotFoundException("Não há registros desta empresa.")
        }

        try {
            const empresa = await this.empresaRepository.editarEmpresa(Number(idEmpresa), dadosEmpresa);
            return "Sucesso!";
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

    async excluirEmpresa(idEmpresa: number): Promise<any> {

        if (!await this.empresaRepository.buscarEmpresa(idEmpresa)) {
            throw new NotFoundException("Não há registros desta empresa.")
        }

        try {
            const empresa = await this.empresaRepository.excluirEmpresa(Number(idEmpresa));
            return "Sucesso!";
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException("Oops, ocorreu um erro. Tente novamente!");
        }
    }

}