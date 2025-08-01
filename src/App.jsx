import { useState } from 'react'
import { CepInput } from './components/CepInput'
import { AddressForm } from './components/AddressForm'
import { UserForm } from './components/UserForm'
import { ListUsers } from './components/ListUsers'

function App() {
  const [view, setView] = useState('menu')
  const [address, setAddress] = useState(null)

  return (
    <div className="container-fluid p-0">
      {view === 'menu' && (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
          <button
            className="btn btn-primary mb-3"
            onClick={() => { setAddress(null); setView('cadastro') }}
          >
            Consultar CEP e Cadastrar
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setView('list')}
          >
            Listar Usuários
          </button>
        </div>
      )}

      {view === 'cadastro' && (
        <div className="mt-5">
          <button className="btn btn-link mb-3" onClick={() => setView('menu')}>
            &larr; Voltar
          </button>
          <h2>Cadastro de Usuário</h2>
          <CepInput onSuccess={setAddress} />
          <AddressForm initial={address} onChange={setAddress} />
          {address && <UserForm address={address} />}
        </div>
      )}

      {view === 'list' && (
        <div className="mt-5">
          <button className="btn btn-link mb-3" onClick={() => setView('menu')}>
            &larr; Voltar
          </button>
          <h2>Lista de Usuários</h2>
          <ListUsers />
        </div>
      )}
    </div>
  )
}

export default App