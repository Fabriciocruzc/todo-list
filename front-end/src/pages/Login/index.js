import {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import loginImg from "../../assets/Login.jpg";

export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault(); 

        try{
            const response = await api.post('session', {id})
            localStorage.setItem('usuarioId', id);
            localStorage.setItem('usuarioNome', response.data.nome);

            history.push('/profile')
        }catch{

            alert('Falha no login, tente novamente.');

        }
    }
    return (
        <div className="login-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>

                    <input
                     placeholder="Seu ID" 
                     value={id}
                     onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link  to="/register">
                        <FiLogIn size={16} color="#a6c613" />
                        Clique aqui para fazer seus cadastro
                    </Link>
                </form>
            </section>

            <img src={loginImg} alt="Tarefas" />

        </div>
    );
}