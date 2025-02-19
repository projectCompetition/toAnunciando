export async function login(email: string, senha: string) {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) throw new Error("Falha no login");
  return response.json();
}
