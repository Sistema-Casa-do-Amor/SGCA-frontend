export async function loginApi(username: string, password: string): Promise<{ token: string }> {
  // Simula um atraso da API
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Aqui você pode criar lógica de validação fake
  if (username === "admin" && password === "123") {
    return { token: "token-admin" };
  } else {
    throw new Error("Usuário ou senha inválidos");
  }
}
