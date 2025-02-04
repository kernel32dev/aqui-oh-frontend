import React, { useEffect, useState } from 'react';
import './Detalhamento.css';
import Header from '../../shared/components/Header';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface DetalhamentoProps {
    title?: string;
    data?: string;
    local?: string;
    status?: string;
    competenciaId: string;
}

interface Mensagem {
    type: string;
    id: string;
    text: string;
    image: string;
    dth: string;
    lat: string;
    lng: string;
    userId: string;
}

const Detalhamento: React.FC<DetalhamentoProps> = () => {
    const location = useLocation();
    const { id, title, data, local, status, competenciaId } = location.state as { id: string; title: string; data: string; local: string; status: string, competenciaId: string };

    const [listaMensagens, setListaMensagens] = useState<Mensagem[]>([]);
    const [statusReclamacao, setStatusReclamacao] = useState<string>(status);
    const [novaMensagem, setNovaMensagem] = useState<string>('');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [nomesUsuarios, setNomesUsuarios] = useState<{ [key: string]: string }>({}); // Mapeamento userId -> nome

    async function obterNomeUsuario(userId: string): Promise<string> {
        if (nomesUsuarios[userId]) { // Evitar chamadas repetidas
            return nomesUsuarios[userId];
        }

        try {
            const token_usuario = localStorage.getItem("jwt_access");
            const response = await fetch(`/api/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token_usuario}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            
            // Atualiza o estado com o novo nome do usuário
            setNomesUsuarios(prev => ({ ...prev, [userId]: data.name }));
            return data.name;
        } catch (error) {
            console.error('Erro ao obter nome do usuário:', error);
            return 'Desconhecido';
        }
    }

    useEffect(() => {
        const token_usuario = localStorage.getItem("jwt_access");
        const url = new URL(`/api/mensagem/${id}?auth=Bearer ${token_usuario}`, window.location.href);
        const ws = new WebSocket(url.href.replace(/^http/, "ws"));

        ws.onopen = () => console.log("Conexão WebSocket aberta");
        ws.onmessage = (event) => {
            const novaMensagem: Mensagem = JSON.parse(event.data);
            if (novaMensagem.type === "Reclamacao") return;

            setListaMensagens(prevMensagens => {
                const jaExiste = prevMensagens.some(msg => msg.id === novaMensagem.id);
                return jaExiste ? prevMensagens : [...prevMensagens, novaMensagem];
            });
        
            if (!nomesUsuarios[novaMensagem.userId]) {
                obterNomeUsuario(novaMensagem.userId);
            }
        };
        ws.onclose = () => console.log("Conexão WebSocket fechada");
        ws.onerror = (error) => console.error("Erro no WebSocket:", error);

        setWs(ws);
        return () => ws.close();
    }, [id]);

    const enviarMensagem = () => {
        if (ws && novaMensagem.trim() !== '') {
            const userId = JSON.parse(localStorage.getItem("me") || '{}').id;
            const mensagem: Mensagem = {
                type: "Mensagem",
                id: '', // O servidor deve definir o ID único
                text: novaMensagem,
                image: '',
                dth: new Date().toISOString(),
                lat: '',
                lng: '',
                userId,
            };
    
            ws.send(JSON.stringify(mensagem));
            setNovaMensagem('');
            // Removido o setListaMensagens aqui para evitar duplicação
        }
    };

    return (
        <>
            <Header />
            <section className='container-detalhamento'>
                <h1>{title}</h1>
                <div className='container-info'>
                    <span><FontAwesomeIcon icon={faCalendarAlt} /> Data: {data}</span>
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> Local: {local}</span>
                    <span>Status atual: {statusReclamacao}</span>
                </div>

                {listaMensagens.map((mensagem) => (
    <div key={mensagem.id || `${mensagem.userId}-${mensagem.dth}`} className='container-mensagem'>
        <span>Autor: {nomesUsuarios[mensagem.userId] || 'Carregando...'}</span>
        <p>{mensagem.text}</p>
        {mensagem.image && (
            <img src={mensagem.image} alt="Imagem da denúncia" />
        )}
    </div>
))}

                <div className='container-input'>
                    <input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={novaMensagem}
                        onChange={(e) => setNovaMensagem(e.target.value)}
                        className='textoMensagemEnvio-input'
                    />
                    <button onClick={enviarMensagem} className='textoMensagemEnvio-button'>Enviar</button>
                </div>
            </section>
        </>
    );
};

export default Detalhamento;
