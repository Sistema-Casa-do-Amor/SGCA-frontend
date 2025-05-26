import { z } from 'zod';
import {
  cpfSchema,
  dateSchema,
  rgSchema,
  phoneSchema,
  cepSchema,
  requiredString,
  numberStringSchema,
} from './commonValidation';

export const patientSchema = z.object({
  // Usando requiredString para campos obrigatórios de texto
  nomeCompletoPaciente: requiredString.max(255, "Nome muito longo."),
  cpfPaciente: cpfSchema,
  dataNascimento: dateSchema,
  idade: numberStringSchema.max(3, "Idade inválida (máx 3 dígitos)"),
  naturalidade: requiredString,
  rg: rgSchema,
  nomeMae: requiredString,
  profissao: z.string().optional(),
  telefone: phoneSchema,
  cep: cepSchema,
  endereco: requiredString,
  bairro: requiredString,
  numero: requiredString,
  complemento: z.string().optional(),
  acompanhante: z.string().optional(),

  // Para campos opcionais que podem vir vazios mas precisam de validação se preenchidos
  // Usamos z.union com o schema opcional e o literal vazio para tipagem correta
  // e transform para garantir undefined se for vazio.
  // Note: z.union com z.literal("") e .transform() é uma forma robusta.
  // Você pode precisar adicionar .catch(undefined) se quiser que Zod trate erros de validação interna como undefined.
  cpfAcompanhante: z.union([cpfSchema.optional(), z.literal("")]).transform(e => e === "" ? undefined : e) as z.ZodType<string | undefined>,
  telefoneAcompanhante: z.union([phoneSchema.optional(), z.literal("")]).transform(e => e === "" ? undefined : e) as z.ZodType<string | undefined>,
  cepAcompanhante: z.union([cepSchema.optional(), z.literal("")]).transform(e => e === "" ? undefined : e) as z.ZodType<string | undefined>,

  enderecoAcompanhante: z.string().optional(),
  bairroAcompanhante: z.string().optional(),
  numeroAcompanhante: z.string().optional(),
  complementoAcompanhante: z.string().optional(),
  tratamento: z.string().optional(),
  diagnostico: z.string().optional(),
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
  usoSonda: z.enum(["nao", "sonda_foley", "cislostomia", "outra"], {
    errorMap: () => ({ message: "Selecione sobre o uso de sonda." }),
  }),
  usoCurativo: z.enum(["sim", "nao"], {
    errorMap: () => ({ message: "Selecione sobre o uso de curativo." }),
  }),
  usoOxigenoterapia: z.enum(["sim", "nao"], {
    errorMap: () => ({ message: "Selecione sobre o uso de oxigenoterapia." }),
  }),
  // 'seForOutra' é opcional e a validação condicional está no superRefine
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