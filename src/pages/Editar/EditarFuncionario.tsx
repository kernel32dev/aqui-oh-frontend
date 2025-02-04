import React from 'react';
import './EditarFuncionario.css';
import Header from '../../shared/components/Header';
import { Link } from 'react-router-dom';

const EditarFuncionario: React.FC = () => {
    const usuario_atual = JSON.parse(localStorage.getItem("me") || '{}');
    
    const [inputNome, setInputNome] = React.useState<string>(usuario_atual.name)
    const [inputEmail, setInputEmail] = React.useState<string>(usuario_atual.email || '')
    const [inputSenha, setInputSenha] = React.useState<string>('')
    const [inputRepetirSenha, setInputRepetirSenha] = React.useState<string>('')

    async function getUser() {

        const token_usuario = localStorage.getItem("jwt_access");
        try {
            const response = await fetch(`/api/user/${usuario_atual.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token_usuario}` // Substitua pelo seu token de acesso, se necessário
                }
            });
        
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
        
            const data = await response.json();
            console.log(data);
        } catch (error: any) {
            console.error('Erro ao buscar usuário:', error.message);
        }
    }

    async function atualizarCadastro(formData:any) {
        console.log("fez cadrastro")
        const nome=formData.get('campo_nome')
        const email=formData.get('campo_email')
        const senha=formData.get('campo_senha')
        const repetir_senha=formData.get('campo_repetir_senha')
    
        const token_usuario = localStorage.getItem("jwt_access");
        const usuario_atual = JSON.parse(localStorage.getItem("me") || '{}');
        const competenciaId = usuario_atual?.competeciaId;
        console.log(usuario_atual)
        console.log(competenciaId)
    
        const response = await fetch('/api/user/'+usuario_atual.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_usuario}` // Substitua pelo seu token de acesso, se necessário
            },
            body: JSON.stringify({
                email: `${email}`,
                name: `${nome}`,
                password: `${senha}`,
                competeciaId: `${competenciaId}` // Opcional
            })
        });
    
        const data = await response.json();
        console.log(data);
    
       }
    

    React.useEffect(() => {
        const fetchData = async () => {
            const usuario_atual = JSON.parse(localStorage.getItem("me") || '{}');

            await getUser();
            setInputNome(usuario_atual.name || '');
            setInputEmail(usuario_atual.email || '');
        };

        fetchData();
    }, []);
    
        return (
            <div className="cadrastro-usuario">
                <Header />
                
    
    
                <section className="container_campos_cadrastro">
                <h1>Editar Perfil</h1>
                    {/* <h1>Página de cadrastro</h1> */}
                    <form action={atualizarCadastro} className="container_form_login" >
                        <div className="container_campo_nome">
                        <label htmlFor="label_nome">Nome:</label>
                        <input type="text" name="campo_nome" id="label_nome" value={inputNome}  onChange={(e) => setInputNome(e.target.value)}/>
                        </div>
                        <div className="container_campo_email">
                        <label htmlFor="label_email">Email:</label>
                        <input type="text" name="campo_email" id="label_email"  value={inputEmail}   onChange={(e) => setInputEmail(e.target.value)} />
                        </div>
                        <div className="container_campo_senha">
                            <label htmlFor="label_senha">Nova Senha:</label>
                            <input type="text" name="campo_senha" id="label_senha" placeholder='Digite a nova senha (opcional)' />
                        </div>
                        <div className="container_campo_senha">
                        <label htmlFor="label_repetir_senha">Repetir a Senha:</label>
                        <input type="text" name="campo_repetir_senha" id="label_repetir_senha" placeholder='Repita a nova senha...'/>
                        </div>
                        
                        
                        <button type="submit" className="butao-cadrastro"><Link to="/" id='linkHome'>Atualizar Dados</Link></button>
    
                    </form>
                </section>
                        {/* Adicione o conteúdo do componente aqui */}
            </div>
    
            
        );
};

export default EditarFuncionario;