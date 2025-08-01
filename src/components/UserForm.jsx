import { useState, useEffect } from 'react'

export function UserForm({
  initialData = {},
  onSubmit,
  submitLabel = 'Salvar Usuário'
}) {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [error, setError] = useState('')

  // popula campos ao mudar initialData (no edit)
  useEffect(() => {
    if (initialData) {
      setName(initialData.nome || '')
      setCpf(initialData.cpf || '')
    }
  }, [initialData])

  const handleSave = async () => {
    setError('')
    if (!name.trim() || !cpf.trim()) {
      setError('Nome e CPF são obrigatórios.')
      return
    }
    try {
      await onSubmit({
        nome: name,
        cpf: cpf.replace(/\D/g, '')
      })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="mb-3">
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Nome completo"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={100}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="CPF (apenas números)"
          value={cpf}
          onChange={e => setCpf(e.target.value.replace(/\D/g, '').slice(0, 11))}
          maxLength={11}
        />
      </div>
      <button className="btn btn-success" onClick={handleSave}>
        {submitLabel}
      </button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  )
}