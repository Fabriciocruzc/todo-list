import { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';
import './styles.css';

export default function Register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data ={
            nome,
            email,
        }

       try {
        const response = await api.post('usuario', data);

        alert(`Seu ID de acesso: ${response.data.id}`)

        history.push('/');
       } catch (err){
           alert('Erro no cadastro, tente novamente')
       }
    }
    return (
       <div className="register-container">
           <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, enter na plateforma e register suas liastas de tarefas.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#a6c613" />
                       Login
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                     placeholder="Nome"
                     value={nome}
                     onChange={e => setNome(e.target.value)}
                    />
                    <input
                     type="email" 
                     placeholder="E-mail" 
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                    />

                    <button className="button" type="submit"> 
                        Cadastrar
                    </button>
                </form>
           </div>
       </div>
    );
}