import { Injectable } from "@nestjs/common";
import { 
    Empresa, 
    EnderecoEmpresa 
} from "@prisma/client";
import { PrismaService } from "src/Services/PrismaService";

@Injectable()
export class EmpresaRepository {
    constructor( 
        private readonly prismaService: PrismaService
    ) {}
    
    async buscarEmpresa(idEmpresa: number): Promise<Empresa> {
        return await this.prismaService.empresa.findFirst({
            where: {
                id: idEmpresa
            },
            include: {
                enderecoEmpresa: true
            }
        });
    }

    async buscarEmpresas(): Promise<any> {
        return await this.prismaService.empresa.findMany();
    }

    async cadastrarEmpresa( 
        dadosEmpresa: {
            nome: string,
            ddd: string,
            telefone: string,
            cnpj: string,
            enderecoEmpresa: EnderecoEmpresa
    }): Promise<Empresa> {
        const {
            nome,
            ddd,
            telefone,
            cnpj,
            enderecoEmpresa
        } = dadosEmpresa;
        return await this.prismaService.empresa.create({
            data: {
                nome,
                ddd,
                telefone,
                cnpj,
                enderecoEmpresa: {
                    create: enderecoEmpresa
                }
            }
        });
    }

    async editarEmpresa(
        idEmpresa: number, 
        dadosEmpresa: {
            nome: string,
            ddd: string,
            telefone: string,
            cnpj: string,
            enderecoEmpresa: EnderecoEmpresa
    }): Promise<Empresa> {
        const {
            nome,
            ddd,
            telefone,
            cnpj,
            enderecoEmpresa
        } = dadosEmpresa;
        return await this.prismaService.empresa.update({
            where: { 
                id: idEmpresa 
            },
            data: {
                nome,
                ddd,
                telefone,
                cnpj,
                enderecoEmpresa: {
                    update: enderecoEmpresa
                }
            }
        });
    }

    async excluirEmpresa(idEmpresa: number): Promise<Empresa> {
        return await this.prismaService.empresa.delete({
            where: {
                id: idEmpresa
            }
        });
    }


}