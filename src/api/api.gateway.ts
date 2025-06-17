import axios, { type AxiosInstance } from 'axios';
import { configDotenv } from "dotenv";
import type { PessoaFisicaDTO } from './api.gateway.dto';

configDotenv();

const API_BASE_URL = process.env.API_BASE_URL;

class ApiGateway {
  public gateway: AxiosInstance;

  constructor() {
    this.gateway = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  public createPessoaFisica(token: string, pessoa: PessoaFisicaDTO) {
    return this.gateway.post('/api/1.0/pessoa-fisica', pessoa, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  public getPessoaFisicaById(id: number) {
    return this.gateway.get(`/api/1.0/pessoa-fisica/${id}`);
  }

  public getPessoaFisicaByNome(nome: string) {
    return this.gateway.get(`/api/1.0/pessoa-fisica/${nome}/nome`);
  }

  public getPessoaFisicaByCpf(cpf: string) {
    return this.gateway.get(`/api/1.0/pessoa-fisica/${cpf}/cpf`);
  }

  public getAllPessoaFisica() {
    return this.gateway.get('/api/1.0/pessoa-fisica');
  }

  public updatePessoaFisica(id: number, pessoa: PessoaFisicaDTO) {
    return this.gateway.patch(`/api/1.0/pessoa-fisica/${id}`, pessoa);
  }

  public deletePessoaFisica(id: number) {
    return this.gateway.delete(`/api/1.0/pessoa-fisica/${id}`);
  }

}


export const apiGateway = new ApiGateway();



