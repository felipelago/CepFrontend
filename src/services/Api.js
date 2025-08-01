export async function fetchCep(cep) {
  const res = await fetch(`/api/v1/viaCep/${cep}`);
  if (!res.ok) throw new Error('CEP inválido ou não encontrado');
  return res.json();
}

export async function saveUser(payload) {
  const res = await fetch('/api/v1/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || 'Erro ao salvar usuário');
  }
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch('/api/v1/usuarios/listar-usuarios')
  if (!res.ok) throw new Error('Erro ao listar usuários')
  return res.json()
}

export async function deleteUser(id) {
  const res = await fetch(`/api/v1/usuarios/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) {
    throw new Error(`Erro ao excluir usuário (status ${res.status})`)
  }
}
