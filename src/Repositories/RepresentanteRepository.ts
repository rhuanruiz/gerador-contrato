import { Injectable } from "@nestjs/common";
import { 
    EnderecoRepresentante, 
    RegistroGeral, 
    Representante
} from "@prisma/client";
import { PrismaService } from "src/Services/PrismaService";


@Injectable()
export class RepresentanteRepository {
    constructor( 
        private readonly prismaService: PrismaService
    ) {}
    
    async buscarRepresentante(idRepresentante: number): Promise<Representante> {
        return await this.prismaService.representante.findFirst({
            where: {
                id: idRepresentante
            }
        });
    }

    async buscarRepresentantePorNome(nomeRepresentante: string): Promise<boolean> {
        const representante = await this.prismaService.representante.findFirst({
            where: {
                nome: nomeRepresentante
            }
        });
        if (representante) {
            return true;
        } else {
            return false;
        }
    }

    async buscarRepresentantes(): Promise<any> {
        return await this.prismaService.representante.findMany();
    }

    async cadastrarRepresentante( 
        dadosRepresentante: {
            nome: string,
            naturalidade: string,
            estadoCivil: string,
            profissao: string,
            cpf: string,
            registroGeral: RegistroGeral
            enderecoRepresentante: EnderecoRepresentante
    }): Promise<Representante> {
        const {
          nome,
          naturalidade,
          estadoCivil,
          profissao,
          cpf,
          registroGeral,
          enderecoRepresentante  
        } = dadosRepresentante;
        return await this.prismaService.representante.create({
            data: {
                nome,
                naturalidade,
                estadoCivil,
                profissao,
                cpf,
                enderecoRepresentante: {
                    create: enderecoRepresentante
                },
                registroGeral: {
                    create: registroGeral
                },
            }
        });
    }

    async editarRepresentante(
        idRepresentante: number, 
        dadosRepresentante: {
            nome: string,
            naturalidade: string,
            estadoCivil: string,
            profissao: string,
            cpf: string,
            registroGeral: RegistroGeral
            enderecoRepresentante: EnderecoRepresentante
    }): Promise<Representante> {
        const {
            nome,
            naturalidade,
            estadoCivil,
            profissao,
            cpf,
            registroGeral,
            enderecoRepresentante  
          } = dadosRepresentante;
        return await this.prismaService.representante.update({
            where: { 
                id: idRepresentante 
            },
            data: {
                nome,
                naturalidade,
                estadoCivil,
                profissao,
                cpf,
                registroGeral: {
                    update: registroGeral
                },
                enderecoRepresentante: {
                    update: enderecoRepresentante
                }
            }
        });
    }

    async excluirRepresentante(idRepresentante: number): Promise<Representante> {
        return await this.prismaService.representante.delete({
            where: {
                id: idRepresentante
            }
        });
    }
}