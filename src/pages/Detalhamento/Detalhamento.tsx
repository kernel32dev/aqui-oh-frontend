import React, { useEffect, useState } from 'react';
import './Detalhamento.css';
import Header from '../../shared/components/Header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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

    useEffect(() => {
        const fetchMensagens = async () => {
            try {
                const token_usuario = localStorage.getItem("jwt_access");
                const response = await axios.get('http://localhost:3001/api/mensagem/'+id, {
                    headers: {
                        Authorization: `Bearer ${token_usuario}`
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

                <h1>{title}</h1>

                <div className='container-info'>
                    <span> <FontAwesomeIcon icon={faCalendarAlt} /> Data: {data}</span>
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> Local: {local}</span>
                    <span>Status: {status}</span>
                    {/* <span>id: {id}</span> */}
                </div>

                {/* <div className='container-imagem'>
                    <span>Imagem:</span>
                    <br />
                    <img src="" alt="imagem de exemplo da denuncia" />
                </div> */}

             
                {listaMensgens.map((mensagem) => (
                    <div key={mensagem.id} className='container-imagem'>
                        {mensagem.image && (
                            <div className='container-imagem'>
                        
                                <img src={mensagem.image} alt="imagem de exemplo da denuncia" />
                            </div>
                        )}
                    </div>
                ))}

                {/* <div className='container-mensagem'>
                    <span>Mensagem:</span>
                    <p>Texto da mensagem</p>
                </div> */}


                {listaMensgens.map((mensagem) => (
                    <div key={mensagem.id} className='container-mensagem'>
                        <span>Mensagem:</span>
                        <p>{mensagem.text}</p>
                    </div>
                ))}

               

                <div className='container-butao-chat2'>
                    <button>Ir para chat</button>
                </div>
            </section>
         
        </>
    );
};

export default Detalhamento;

