export async function fetchCep(cep) {
  const res = await fetch(`/api/viaCep/v1/${cep}`);
  if (!res.ok) throw new Error('CEP inválido ou não encontrado');
  return res.json();
}

export async function saveUser(payload) {
  const res = await fetch('/usuario/v1/cadastrar', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || 'Erro ao salvar usuário');
  }
  return res.json();
}
