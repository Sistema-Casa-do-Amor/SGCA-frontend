import { z } from 'zod';
import {
  cpfSchema,
  dateSchema,
  rgSchema,
  phoneSchema,
  cepSchema,
  requiredString,
} from './commonValidation';

export const patientSchema = z.object({
  // Usando requiredString para campos obrigatórios de texto
  nomeCompletoPaciente: requiredString.max(255, "Nome muito longo."),
  cpfPaciente: cpfSchema,
  dataNascimento: dateSchema,
  idade: z.string(),
  naturalidade: requiredString,
  rg: rgSchema,
  nomeMae: requiredString,
  profissao: requiredString,
  telefone: phoneSchema,
  cep: cepSchema,
  endereco: requiredString,
  bairro: requiredString,
  numero: requiredString,
  complemento: z.string().optional(),
  acompanhante: requiredString,
  cpfAcompanhante: cpfSchema,
  telefoneAcompanhante: phoneSchema,

  /* 
  campos opcionais que podem vir vazios mas precisam de validação se preenchidos usamos z.union com o schema opcional, o literal vazio e transform para garantir undefined se for vazio.
  adicionar .catch(undefined) se quiser que Zod trate erros de validação interna como undefined. 
  */
  cepAcompanhante: z.union([cepSchema.optional(), z.literal("")]).transform(e => e === "" ? undefined : e) as z.ZodType<string | undefined>,
  enderecoAcompanhante: z.string().optional(),
  bairroAcompanhante: z.string().optional(),
  numeroAcompanhante: z.string().optional(),
  complementoAcompanhante: z.string().optional(),
  tratamento: z.string().optional(),
  diagnostico: requiredString,
  vinculoPaciente: requiredString,
  podeAjudarCozinha: z.enum(["sim", "nao"], {
    errorMap: () => ({ message: "Selecione se pode ajudar na cozinha." }),
  }),
  acompanhanteResponsavel: z.enum(["sim", "nao"], {
    errorMap: () => ({ message: "Selecione se o acompanhante é responsável." }),
  }),
  condicaoChegada: z.enum(["de_ambulancia", "maca", "cadeira_rodas", "nenhum"], {
    errorMap: () => ({ message: "Selecione a condição de chegada." }),
  }),
  usoCurativo: z.enum(["sim", "nao"], {
    errorMap: () => ({ message: "Selecione sobre o uso de curativo." }),
  }),
  usoOxigenoterapia: z.enum(["sim", "nao"], {
    errorMap: () => ({ message: "Selecione sobre o uso de oxigenoterapia." }),
  }),
  usoSonda: z.enum(["nao", "sonda_foley", "cislostomia", "outra"], {
    errorMap: () => ({ message: "Selecione sobre o uso de sonda." }),
  }),
  seForOutra: z.string().optional().transform(e => e === "" ? undefined : e),
}).superRefine((data, ctx) => {

  // Lógica de validação condicional para 'seForOutra'
  if (data.usoSonda === 'outra' && (!data.seForOutra || data.seForOutra.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Campo obrigatório se 'Outra' for selecionado.",
      path: ['seForOutra'],
    });
  }

});

// --- Exporta o tipo TypeScript inferido a partir do schema ---
export type PatientFormInputs = z.infer<typeof patientSchema>;