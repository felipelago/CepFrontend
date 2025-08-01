import { useState } from 'react';
import { CepInput }     from './components/CepInput';
import { AddressForm }  from './components/AddressForm';
import { UserForm }     from './components/UserForm';

function App() {
  const [address, setAddress] = useState(null);

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: 'auto' }}>
      <h1>Cadastro de Usuário</h1>

      <CepInput onSuccess={setAddress} />

      <AddressForm initial={address} onChange={setAddress} />

      {address && <UserForm address={address} />}
    </div>
  );
}

export default App;