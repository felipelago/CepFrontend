import { useState } from 'react'
import { saveUser } from '../services/Api'

export function UserForm({ address }) {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [error, setError] = useState('')

  const handleSave = async () => {
    setError('')
    if (!name.trim() || !cpf.trim()) {
      setError('Nome e CPF são obrigatórios.')
      return
    }

    const payload = {
      nome: name,
      cpf: cpf.replace(/\D/g, ''),
      cep: address.cep,
      logradouro: address.logradouro,
      bairro: address.bairro,
      cidade: address.localidade,
      estado: address.estado,
    }

    try {
      await saveUser(payload)
      alert('Usuário salvo com sucesso!')
      setName(''); setCpf('')
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
        Salvar Usuário
      </button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  )
}