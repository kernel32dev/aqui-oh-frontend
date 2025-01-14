
import ItemLista from '../ItemLista/ItemLista';
import './ContainerListagem.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Reclamacao {
    id: string;
    title: string;
    createdAt: string;
    local: string;
    status: string;
}

interface ContainerListagemProps {
    searchTerm: string;
    filterStatus: string;
    startDate: string;
    endDate: string;
    filtragem: boolean;
}

const ContainerListagem: React.FC<ContainerListagemProps> = ({ searchTerm, filterStatus, startDate, endDate,filtragem }) => {
    const [reclamacoes, setReclamacoes] = useState<Reclamacao[]>([]);

    const [FiltragemListaReclamacoes, setFiltragemListaReclamacoes] = useState<Reclamacao[]>([]);
    const [foiFeitoFiltragem, setFoiFeitoFiltragem] = useState(filtragem || false);

    useEffect(() => {
        const fetchReclamacoes = async () => {
            try {
                const token_usuario = localStorage.getItem("jwt_access");
                const response = await axios.get('http://localhost:3001/api/reclamacao', {
                    headers: {
                        Authorization: `Bearer ${token_usuario}`
                    }
                });
                console.log('Reclamações:', response.data);



                setReclamacoes(response.data as Reclamacao[]);
            } catch (error) {
                console.error('Erro ao buscar reclamações:', error);
            }
        };

        fetchReclamacoes();

    }, []);
    
    useEffect(() => {
        const filtrarReclamacoes = async () => {
            try {
                
                if (searchTerm=="" && filterStatus=="" && startDate=="" && endDate=="") {
                    setFoiFeitoFiltragem(false);
                    setFiltragemListaReclamacoes([] as Reclamacao[]);
                    return;
                }
                
                const filteredReclamacoes = (reclamacoes as Reclamacao[]).filter(reclamacao => {
                    const matchesSearchTerm = reclamacao.title.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesStatus = filterStatus ? reclamacao.status === filterStatus : false;
                    const matchesStartDate = startDate ? new Date(reclamacao.createdAt) >= new Date(startDate) : false;
                    const matchesEndDate = endDate ? new Date(reclamacao.createdAt) <= new Date(endDate) : false;
                    return matchesSearchTerm && matchesStatus && matchesStartDate && matchesEndDate;
                });

                
                console.log('Reclamações filtradas:', filteredReclamacoes);
                setFoiFeitoFiltragem(true);
                setFiltragemListaReclamacoes(filteredReclamacoes as Reclamacao[]);


            } catch (error) {
                console.error('Erro ao buscar reclamações:', error);
            }
        };
    
        filtrarReclamacoes();
    }, [searchTerm, filterStatus, startDate, endDate]);



    


    return (


        <>
            <h1>Lista de reclamacoes</h1>
            
                <div className="container-listagem">
                    


                    {/* <ItemLista title="Falta de iluminacao na rua 2"   data='2024-01-12' local='Altos-PI' status='Aberto'/>
                    <ItemLista title="Falta de iluminacao na rua 2"   data='2024-01-12' local='Altos-PI' status='Aberto'/>
                    <ItemLista title="Falta de iluminacao na rua 2"   data='2024-01-12' local='Altos-PI' status='Aberto'/> */}

                    {/* {reclamacoes.map((reclamacao) => (
                          <ItemLista
                            key={reclamacao.id}
                            title={reclamacao.title}
                            data={new Date(reclamacao.createdAt).toLocaleDateString()}
                            local={reclamacao.local}
                            status={reclamacao.status }
                          />
                    ))} */}

                    { (foiFeitoFiltragem)==false && 

                        reclamacoes.map((reclamacao) => (
                            <ItemLista
                            key={reclamacao.id}
                            title={reclamacao.title}
                            data={new Date(reclamacao.createdAt).toLocaleDateString()}
                            local={reclamacao.local}
                            status={reclamacao.status }
                            />
                        ))
                    }
                    

                    { foiFeitoFiltragem==true && 

                        FiltragemListaReclamacoes.map((reclamacao) => (
                            <ItemLista
                              key={reclamacao.id}
                              title={reclamacao.title}
                              data={new Date(reclamacao.createdAt).toLocaleDateString()}
                              local={reclamacao.local}
                              status={reclamacao.status }
                            />
                        ))
                    }


                    
                </div>      

                
           
        
        </>
      
    );
};

export default ContainerListagem;