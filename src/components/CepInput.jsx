import { useState } from 'react';
import { fetchCep } from '../services/Api';

export function CepInput({ onSuccess }) {
  const [cep, setCep]             = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError]         = useState('');

  const handleChange = e => {
    setCep(e.target.value.replace(/\D/g, '').slice(0, 8));
  };

  const handleConsult = async () => {
    setError('');
    if (cep.length !== 8) {
      setError('O CEP deve ter 8 dígitos.');
      return;
    }
    try {
      const data = await fetchCep(cep);
      onSuccess(data);
      setValidated(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setCep('');
    setValidated(false);
    setError('');
    onSuccess(null);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="text"
        placeholder="CEP (8 dígitos)"
        value={cep}
        onChange={handleChange}
        disabled={validated}
      />
      <button onClick={handleConsult} disabled={validated}>
        Consultar CEP
      </button>
      {validated && (
        <button onClick={handleReset} style={{ marginLeft: 8 }}>
          Resetar
        </button>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
