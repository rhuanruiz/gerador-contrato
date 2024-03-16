import { Injectable } from "@nestjs/common";


@Injectable()
export class StringFormatService {
    constructor(
    ) {}

    async formatarEndereco(input: string): Promise<string> {
        try {
            const palavras = input.toLowerCase().split(' ');
            const palavrasMaiusculo = palavras.map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1));
            const output = palavrasMaiusculo .join(' ');
            return output;
        } catch(error) {
            return input;
        }
    }   

    async formatarCEP(input: string): Promise<string> {
        try {
            const cep = input.replace(/\D/g, '');
            const output = `${cep.slice(0, 5)}-${cep.slice(5)}`;
            return output;
        } catch(error) {
            return input;
        }
    }

    async formatarTelefone(input: string): Promise<string> {
        try {
            const telefone = input.replace(/\D/g, '');
            const output = `${telefone.slice(0, 4)}-${telefone.slice(4)}`;
            return output;
        } catch(error) {
            return input;
        }
    }

    async formatarCNPJ(input: string): Promise<string> {
        try {
            const cnpj = input.replace(/\D/g, '');
            const output = `${cnpj.slice(0, 2)}.${cnpj.slice(2,5)}.${cnpj.slice(5,8)}/${cnpj.slice(8,12)}-${cnpj.slice(12)}`;
            return output;
        } catch(error) {
            return input;
        }
    }
}