
import ItemLista from '../ItemLista/ItemLista';
import './ContainerListagem.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {formatarTextoStatus} from "./../../../../utils/utils";

interface Reclamacao {
    id: string;
    title: string;
    createdAt: string;
    local: string;
    status: string;
    competecia: {
        id: "cm5uc3ing0000kkv8mi759vsq",
    }
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
                    const matchesStatus = filterStatus ? reclamacao.status === filterStatus : true;
                    const matchesStartDate = startDate ? new Date(reclamacao.createdAt) >= new Date(startDate) : true;
                    const matchesEndDate = endDate ? new Date(reclamacao.createdAt) <= new Date(endDate) : true;
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


        <div className='div-geral'>
            <h1>Lista de reclamações</h1>
            
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
                            id={reclamacao.id}
                            title={reclamacao.title}
                            data={`${new Date(reclamacao.createdAt).getDate().toString()}/0${(new Date(reclamacao.createdAt).getMonth()+1).toString()}/${new Date(reclamacao.createdAt).getFullYear().toString()} `}
                            local={reclamacao.local}
                            status={ formatarTextoStatus(reclamacao.status) }
                            competenciaId={reclamacao.competecia.id}
                            
                            />
                        ))
                    }
                    

                    { foiFeitoFiltragem==true && 

                        FiltragemListaReclamacoes.map((reclamacao) => (
                            <ItemLista
                              key={reclamacao.id}
                              id={reclamacao.id}
                              title={reclamacao.title}
                              data={new Date(reclamacao.createdAt).toLocaleDateString()}
                              local={reclamacao.local}
                              status={ formatarTextoStatus(reclamacao.status) }
                              competenciaId={reclamacao.competecia.id}
                            />
                        ))
                    }


                    
                </div>      

                
           
        
        </div>
      
    );
};

export default ContainerListagem;