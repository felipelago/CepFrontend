import { useState } from 'react';
import { saveUser } from '../services/Api';

export function UserForm({ address }) {
  const [name, setName] = useState('');
  const [cpf,  setCpf]  = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');
    if (!name.trim() || !cpf.trim()) {
      setError('Nome e CPF são obrigatórios.');
      return;
    }

    const payload = {
      nome:       name,
      cpf:        cpf.replace(/\D/g, ''),
      cep:        address.cep,
      logradouro: address.logradouro,
      bairro:     address.bairro,
      cidade:     address.localidade,
      estado:     address.uf,
    };

    try {
      await saveUser(payload);
      alert('Usuário salvo com sucesso!');
      setName('');
      setCpf('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <label>
        Nome completo:&nbsp;
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={100}
        />
      </label>
      <br />
      <label>
        CPF:&nbsp;
        <input
          type="text"
          value={cpf}
          onChange={e => setCpf(e.target.value.replace(/\D/g, '').slice(0, 11))}
          maxLength={11}
        />
      </label>
      <br />
      <button onClick={handleSave} style={{ marginTop: 16 }}>
        Salvar Usuário
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}