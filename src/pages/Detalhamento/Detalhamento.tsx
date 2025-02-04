import React, { useEffect, useState } from 'react';
import './Detalhamento.css';
import Header from '../../shared/components/Header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { formatarTextoStatus } from '../../utils/utils';
interface Mensagem {
    id: string;
    text:string;
    image:string;
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


interface DetalhamentoProps {
   tituloReclamacao?: string;
   dataReclamacao?: string;
   localReclamacao?: string;

   title?:string;
   data?:string;
   local?:string;
   status?:string;
   competenciaId:string;
}


const Detalhamento: React.FC <DetalhamentoProps>= () => {
    const location = useLocation();
    const { id,title, data, local, status,competenciaId } = location.state as { id:string; title: string; data: string; local: string; status: string,competenciaId:string };
    
    const [listaMensgens,setListaMensagens] = useState<Mensagem[]>([]);

    const [statusReclamacao, setStatusReclamacao] = useState<string>(status);
    const [novaMensagem, setNovaMensagem] = useState<string>('');

 
    async function atualizarStatusReclamacao(status_atual: string) {
        console.log('Status atual no momento:', statusReclamacao);
        try {
            const token_usuario = localStorage.getItem("jwt_access");
            console.log('Enviando requisição para atualizar status...');
            const body =await JSON.stringify({ status: status_atual });
            setStatusReclamacao(formatarTextoStatus(status_atual));
            const response = await fetch(`/api/reclamacao/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token_usuario}`,
                    'Content-Type': 'application/json',
                },
                body: body
            });
            

            if (!response.ok) {
                throw new Error('Erro na requisição');
            }

            const data = await response.json();
            console.log('Status atualizado:', data);
            setStatusReclamacao(status_atual);
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
        }
    }

    useEffect(() => {
        const fetchMensagens = async () => {
            try {
                const token_usuario = localStorage.getItem("jwt_access");
                const response = await axios.get('/api/mensagem/'+id, {
                    headers: {
                        Authorization: `Bearer ${token_usuario}`,
                         ContentType: 'application/json',
                    }
                });
                console.log('Mensagens:', response.data);



                setListaMensagens(response.data as Mensagem[]);
            } catch (error) {
                console.error('Erro ao buscar reclamações:', error);
            }
        };

        fetchMensagens();

    }, []);
    
    
    return (
        <>

            <Header />

            <section className='container-detalhamento'>

                <h1 id='titulo-reclamacao' style={{fontSize:"22px"}}>{title}</h1>

                <div className='container-info'>
                    <span> <FontAwesomeIcon icon={faCalendarAlt} /> Data: {data}</span>
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> Local: {local}</span>
                    <span>Status atual: {statusReclamacao}</span>

                    <form  >
                        <label htmlFor="status">Selecione o status:</label>
                        <select name="status" id="status" onChange={ (evento) => { atualizarStatusReclamacao(evento.target.value) }    }   >
                            <option value="aberto" >Aberto</option>
                            <option value="em_andamento">Em andamento</option>
                            <option value="resolvido">Resolvido</option>
                        </select>
                        
                    </form>
                    {/* <span>id: {id}</span> */}
                </div>

                <div className='container-imagem'>
                        
                    <img src="https://th.bing.com/th/id/OIP.dIW9qe3--A4I-gMSjtjQjgHaFi?w=800&h=599&rs=1&pid=ImgDetMain" alt="imagem de exemplo da denuncia" />
                </div>

                <div className='container-mensagem'>
                        <span>Mensagem:</span>
                        <p>Gostaria de registrar uma denúncia sobre um problema que está acontecendo na Rua Antônio Ribeiro. Tem um buraco bem grande no meio da rua, que está dificultando a passagem de carros e também é perigoso para pedestres, principalmente à noite, porque é difícil de enxergar. Já vi alguns motoristas precisando desviar de repente, e isso pode acabar causando um acidente. Acho importante que a prefeitura tome providências para sinalizar e consertar o buraco o mais rápido possível, antes que aconteça algo mais grave.</p>
                </div>


             
                {/* {listaMensgens.map((mensagem) => (
                    <div key={mensagem.id} className='container-imagem'>
                        {mensagem.image && (
                            <div className='container-imagem'>
                        
                                <img src={mensagem.image} alt="imagem de exemplo da denuncia" />
                            </div>
                        )}
                    </div>
                ))}

           


                {listaMensgens.map((mensagem) => (
                    <div key={mensagem.id} className='container-mensagem'>
                        <span>Mensagem:</span>
                        <p>{mensagem.text}</p>
                    </div>
                ))} */}



               

                {/* <div className='container-butao-chat2'>
                    <button>Ir para chat</button>
                </div> */}

          <div className='container-input'>
                    <input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={novaMensagem}
                        onChange={(e) => setNovaMensagem(e.target.value)}
                        className="textoMensagemEnvio-input"
                    />
                    <button type="button"  className="textoMensagemEnvio-button">Enviar</button>
                </div>
            </section>
         
        </>
    );
};

export default Detalhamento;

