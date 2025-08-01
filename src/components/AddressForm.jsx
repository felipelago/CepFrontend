import { useState, useEffect } from 'react';

export function AddressForm({ initial, onChange }) {
  const [addr, setAddr] = useState(initial);

  useEffect(() => {
    setAddr(initial);
  }, [initial]);

  if (!addr) return null;

  const handle = field => e => {
    const next = { ...addr, [field]: e.target.value };
    setAddr(next);
    onChange(next);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <label>
        Logradouro:&nbsp;
        <input value={addr.logradouro} onChange={handle('logradouro')} />
      </label>
      <br />
      <label>
        Bairro:&nbsp;
        <input value={addr.bairro} onChange={handle('bairro')} />
      </label>
      <br />
      <label>
        Cidade:&nbsp;
        <input value={addr.localidade} onChange={handle('localidade')} />
      </label>
      <br />
      <label>
        Estado:&nbsp;
        <input value={addr.uf} onChange={handle('uf')} />
      </label>
    </div>
  );
}