import { useState, useEffect } from 'react'

export function AddressForm({ initial, onChange }) {
  const [addr, setAddr] = useState(initial)

  useEffect(() => {
    setAddr(initial)
  }, [initial])

  if (!addr) return null

  const handle = field => e => {
    const next = { ...addr, [field]: e.target.value }
    setAddr(next)
    onChange(next)
  }

  return (
    <div className="mb-3">
      <div className="row g-2">
        <div className="col-12">
          <input
            className="form-control"
            value={addr.logradouro}
            onChange={handle('logradouro')}
            placeholder="Logradouro"
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            value={addr.bairro}
            onChange={handle('bairro')}
            placeholder="Bairro"
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            value={addr.localidade}
            onChange={handle('localidade')}
            placeholder="Cidade"
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            value={addr.estado}
            onChange={handle('estado')}
            placeholder="Estado"
          />
        </div>
      </div>
    </div>
  )
}