import { useState } from 'react'
import { CepInput } from './components/CepInput'
import { AddressForm } from './components/AddressForm'
import { UserForm } from './components/UserForm'
import { ListUsers } from './components/ListUsers'
import {
  saveUser,
  fetchUsers,
  deleteUser,
  updateUser
} from './services/Api'

function App() {
  const [view, setView] = useState('menu')
  const [address, setAddress] = useState(null)
  const [editing, setEditing] = useState(null)

  // handlers para create
  const handleCreate = async (userPayload) => {
    const dto = {
      nome: userPayload.nome,
      cpf: userPayload.cpf,
      cep: address.cep,
      logradouro: address.logradouro,
      bairro: address.bairro,
      cidade: address.localidade,
      estado: address.estado
    }
    await saveUser(dto)
    alert('Criado com sucesso!')
    setView('menu')
  }

  // handlers para update
  const handleUpdate = async (userPayload) => {
    const dto = {
      nome: userPayload.nome,
      cpf: userPayload.cpf,
      cep: address.cep,
      logradouro: address?.logradouro,
      bairro: address?.bairro,
      cidade: address?.localidade,
      estado: address?.estado
    }
    await updateUser(editing.id, dto)
    alert('Atualizado com sucesso!')
    setView('list')
  }

  return (
    <div className="container-fluid p-0">
      {view === 'menu' && (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: '100vh' }}
        >
          <button
            className="btn btn-primary mb-3"
            onClick={() => { setAddress(null); setEditing(null); setView('cadastro') }}
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
        <div className="mt-5 container">
          <button className="btn btn-link mb-3" onClick={() => setView('menu')}>
            &larr; Voltar
          </button>
          <h2>Cadastrar Usuário</h2>
          <CepInput onSuccess={setAddress} />
          <AddressForm initial={address} onChange={setAddress} />
          {address && (
            <UserForm
              initialData={null}
              onSubmit={handleCreate}
              submitLabel="Salvar Usuário"
            />
          )}
        </div>
      )}

      {view === 'list' && (
        <div className="mt-5 container">
          <button className="btn btn-link mb-3" onClick={() => setView('menu')}>
            &larr; Voltar
          </button>
          <h2>Lista de Usuários</h2>
          <ListUsers
            onEdit={u => {
              setEditing(u)
              setAddress({
                cep: u.cep,
                logradouro: u.logradouro,
                bairro: u.bairro,
                localidade: u.cidade,
                estado: u.estado
              })
              setView('edit')
            }}
            onDelete={async id => {
              if (confirm('Confirma exclusão?')) {
                await deleteUser(id)
                setView('list')
              }
            }}
          />
        </div>
      )}

      {view === 'edit' && editing && (
        <div className="mt-5 container">
          <button className="btn btn-link mb-3" onClick={() => setView('list')}>
            &larr; Voltar
          </button>
          <h2>Editar Usuário</h2>
          <CepInput onSuccess={addrOrUpdater => {
            setAddress(prev => typeof addrOrUpdater === 'function' ? addrOrUpdater(prev) : addrOrUpdater)
          }} initialCep={editing?.cep}
            skipInitialFetch={true} />
          <AddressForm
            initial={address}
            onChange={setAddress}
          />
          {address && (
            <UserForm
              initialData={editing}
              onSubmit={handleUpdate}
              submitLabel="Atualizar Usuário"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default App