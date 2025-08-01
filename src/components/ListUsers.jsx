import { useEffect, useState } from 'react'
import { fetchUsers, deleteUser } from '../services/Api'

export function ListUsers() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')

    const loadUsers = () => {
        setError('')
        fetchUsers()
            .then(data => setUsers(data))
            .catch(err => setError(err.message))
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return
        try {
            await deleteUser(id)
            loadUsers()
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="table-light">
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>CEP</th>
                            <th>Logradouro</th>
                            <th>Bairro</th>
                            <th>Estado</th>
                            <th>Criado em</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.cpf}>
                                <td>{u.nome}</td>
                                <td>{u.cpf}</td>
                                <td>{u.cep}</td>
                                <td>{u.logradouro}</td>
                                <td>{u.bairro}</td>
                                <td>{u.estado}</td>
                                <td>{new Date(u.dataCriacao).toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-sm btn-primary me-2">
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(u.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}