import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css';

export default function NewTask(){
    const [tarefa, setTerefas] = useState('');
    const [data, setDate] = useState('');

    const history = useHistory();

    const usuarioId = localStorage.getItem('usuarioId')

    async function handleNewTask(e){
        e.preventDefault();

        const dados ={
            tarefa,
            data,
        };

        try{
            await api.post('tarefas', dados, {
                headers: {
                    Authorization: usuarioId, 
                }
            })

            history.push('/profile');
        }catch(err){
            alert('erro ao Cadastra caso, tente novamente.')
        }
    }


    return (
        <div className="newtask-container">
           <div className="content">
                <section>
                    <h1>Cadastrar nova tarefa</h1>
                    <p>Faça o cadastro de sua tarefa para que você possa lembra no futuro.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#a6c613" />
                       Voltar para Lista de tarefas
                    </Link>
                </section>

                <form onSubmit={handleNewTask} >
                    <input
                     placeholder="Tarefa"
                     value={tarefa}
                     onChange={e => setTerefas(e.target.value)}
                    />
                    <input 
                     type="date"
                     placeholder="DD/MM/AAAA"
                     value={data}
                     onChange={e => setDate(e.target.value)} 
                    />

                    <button className="button" type="submit"> 
                        Cadastrar
                    </button>
                </form>
           </div>
       </div>
    );
}