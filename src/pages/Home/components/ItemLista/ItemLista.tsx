import React from 'react';
import './ItemLista.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface ItemListaProps {
    id?:string;
    title: string;
    data?: string;
    local?:string;
    status?:string;
    competenciaId?:string;    
}

const ItemLista: React.FC<ItemListaProps> = ({ id, title, data, local="Teresina-PI", status, competenciaId }) => {
    return (

        <div className="item-lista">
            <div className='container-info'>
                <h3 className="item-lista-title">{title}</h3>
                <span className="item-lista-data"> <FontAwesomeIcon icon={faCalendarAlt} /> {data}</span>
                <span className="item-lista-local"> <FontAwesomeIcon icon={faMapMarkerAlt} /> {local || "Teresina-PI"}</span>
            </div>

            <div className='container-status'>
                
                <span className="item-lista-status">{status}</span>
            </div>

            <div className='container-button'>
                <Link
                    to="/detalhamento"
                    state={{id, title, data, local, status, competenciaId }}
                >
                    <button>Ver detalhes</button>
                </Link>
            </div>


        </div>
    );
};

export default ItemLista;