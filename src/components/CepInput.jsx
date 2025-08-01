import { useState } from 'react'
import { fetchCep } from '../services/Api'

export function CepInput({ onSuccess }) {
  const [cep, setCep] = useState('')
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => {
    setCep(e.target.value.replace(/\D/g, '').slice(0, 8))
  }

  const handleConsult = async () => {
    setError('')
    if (cep.length !== 8) {
      setError('O CEP deve ter 8 dígitos.')
      return
    }
    try {
      const data = await fetchCep(cep)
       onSuccess({ ...data, cep })
      setValidated(true)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleReset = () => {
    setCep('')
    setValidated(false)
    setError('')
    onSuccess(null)
  }

  return (
    <div className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="CEP (8 dígitos)"
          value={cep}
          onChange={handleChange}
          disabled={validated}
        />
        <button
          className="btn btn-outline-primary"
          onClick={handleConsult}
          disabled={validated}
        >
          Consultar CEP
        </button>
        {validated && (
          <button
            className="btn btn-outline-secondary"
            onClick={handleReset}
          >
            Resetar
          </button>
        )}
      </div>
      {error && <div className="text-danger mt-1">{error}</div>}
    </div>
  )
}