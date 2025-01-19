import React from 'react';
import './CadastroUsuario.css';
import Header from '../../shared/components/Header';


const CadastroUsuario = () => {


    
   async function realizarCadastro(formData:any) {
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

    const response = await fetch('http://localhost:3001/api/user', {
        method: 'POST',
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


    return (
        <div className="cadrastro-usuario">
            <Header />
            


            <section className="container_campos_cadrastro">
            <h1>Cadastro de Funcionário</h1>
                {/* <h1>Página de cadrastro</h1> */}
                <form action={realizarCadastro} className="container_form_login" >
                    <div className="container_campo_nome">
                    <label htmlFor="label_nome">Nome:</label>
                    <input type="text" name="campo_nome" id="label_nome" />
                    </div>
                    <div className="container_campo_email">
                    <label htmlFor="label_email">Email:</label>
                    <input type="text" name="campo_email" id="label_email" />
                    </div>
                    <div className="container_campo_senha">
                        <label htmlFor="label_senha">Senha:</label>
                        <input type="text" name="campo_senha" id="label_senha" />
                    </div>
                    <div className="container_campo_senha">
                    <label htmlFor="label_repetir_senha">Repetir a Senha:</label>
                    <input type="text" name="campo_repetir_senha" id="label_repetir_senha" />
                    </div>

                    <button type="submit" className="butao-cadrastro">Cadrastrar</button>

                </form>
            </section>
                    {/* Adicione o conteúdo do componente aqui */}
        </div>

        
    );
};

export default CadastroUsuario;