import { z } from 'zod';

// --- REGEX Comuns ---
export const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;
export const RG_REGEX = /^\d{2}\.\d{3}\.\d{3}-\d{2}$/;
export const PHONE_REGEX = /^\d{2} \d{5}-\d{4}$/;
export const CEP_REGEX = /^\d{5}-\d{3}$/;

// --- Mini-Schemas Zod Reusáveis ---

export const requiredString = z.string().min(1, "Campo obrigatório.");

export const cpfSchema = z.string()
  .min(1, "CPF é obrigatório.")
  .regex(CPF_REGEX, "Formato de CPF inválido (XXX.XXX.XXX-XX).");

export const dateSchema = z.string()
  .min(1, "Data é obrigatória.")
  .regex(DATE_REGEX, "Formato de data inválido (DD/MM/AAAA).");

export const rgSchema = z.string()
  .min(1, "RG é obrigatório.")
  .regex(RG_REGEX, "Formato de RG inválido (XX.XXX.XXX-X)."); // Ajuste o formato da mensagem se necessário

export const phoneSchema = z.string()
  .min(1, "Telefone é obrigatório.")
  .regex(PHONE_REGEX, "Formato de telefone inválido (DD XXXXX-XXXX).");

export const cepSchema = z.string()
  .min(1, "CEP é obrigatório.")
  .regex(CEP_REGEX, "Formato de CEP inválido (XXXXX-XXX).");

// --- Exemplo de um schema para números (idade) ---
export const numberStringSchema = z.string()
  .min(1, "Campo numérico obrigatório.")
  .regex(/^\d+$/, "Deve ser um número.");

