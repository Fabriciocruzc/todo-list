import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Profile(){
    const [tarefas, setTarefas] = useState([]);

    const history = useHistory();

    const usuarioNome = localStorage.getItem('usuarioNome');
    const usuarioId = localStorage.getItem('usuarioId');

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: usuarioId,
            }
        }).then(response => {
            setTarefas(response.data);
        })
    }, [usuarioId]);

    async function handleDeleteTask(id){
        try{
            await api.delete(`tarefas/${id}`, {
               headers:{
                   Authorization: usuarioId,
               }
            });

            setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
        }catch (err){
            alert('Erro ao deletar tarefa, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear()

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <span>Bem vido as suas tarefas, {usuarioNome}</span>
                <Link className="button" to="/tarefas/new" >Cadastra uma nova tarefa</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#a6c613" />
                </button>
            </header>

            <h1>Tarefas cadastradas</h1>
            <ul>
                {tarefas.map(tarefa => (
                    <li key={tarefa.id}>
                    <strong>Tarefa:</strong>
                    <p>{tarefa.tarefa}</p>

                    <strong>Data:</strong>
                    <p>{tarefa.data}</p>

                    <button onClick={() => handleDeleteTask(tarefa.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}