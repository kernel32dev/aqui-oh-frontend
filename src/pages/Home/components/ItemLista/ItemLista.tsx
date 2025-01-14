import React from 'react';
import './ItemLista.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface ItemListaProps {
    title: string;
    data?: string;
    local?:string
    status?:string;    
}

const ItemLista: React.FC<ItemListaProps> = ({ title,data,local,status}) => {
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
                <button>Ver detalhes</button>
            </div>


        </div>
    );
};

export default ItemLista;