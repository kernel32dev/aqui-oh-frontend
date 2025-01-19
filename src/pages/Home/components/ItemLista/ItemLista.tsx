import React from 'react';
import './ItemLista.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { retornarNomeDaClasseCss } from '../../../../utils/utils';

interface ItemListaProps {
    id?:string;
    title: string;
    data?: string;
    local?:string;
    status?:string;
    competenciaId?:string;    
}

const ItemLista: React.FC<ItemListaProps> = ({ id, title, data, local="Teresina-PI", status, competenciaId }) => {
    let classe_css_que_representa_o_status_reclamacao=retornarNomeDaClasseCss(status || "")

    return (

        <div className="item-lista">
            <div className='container-info'>
                <h3 className="item-lista-title">{title}</h3>
                <span className="item-lista-data"> <FontAwesomeIcon icon={faCalendarAlt} /> {data}</span>
                <span className="item-lista-local"> <FontAwesomeIcon icon={faMapMarkerAlt} /> {local || "Teresina-PI"}</span>
            </div>

            <div className='container-status'>
                
                <span className={classe_css_que_representa_o_status_reclamacao}>{status}</span>
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