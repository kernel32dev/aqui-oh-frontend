import "./Home.css";
import { Link } from "react-router-dom";
import type { Me, SetJwts } from "../Login/auth.ts"; // Ensure that the './auth' module exists and is correctly referenced

import "../../shared/components/Header.tsx";
import Header from "../../shared/components/Header.tsx";
import ContainerListagem from "./components/ContainerListagem/ContainerListagem.tsx";
import { useState } from "react";
import HeaderHome from "./components/HeaderHome/HeaderHome.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';


const Home = (props: { me: Me, setJwts: SetJwts }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const [foiFeitoFiltragem, setFoiFeitoFiltragem] = useState(false);
    let classe_css_que_representa_o_status_reclamacao="resolvida"

    const handleSearch = () => {
        // Implementar lógica de pesquisa e filtro aqui
        console.log('Pesquisar:', searchTerm, filterStatus, startDate, endDate);
        setFoiFeitoFiltragem(true);
        
    };



    return (

        <>
            <HeaderHome setJwts={props.setJwts}></HeaderHome>
            <nav id="menu-opcoes" className="menu-opcoes">
                <Link to="/cadastro" className="button-link">
                    <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '8px' }} /> Cadrastrar Funcionário
                </Link>
            </nav>    

             <div className="search-container">
                    <div className="search-row">
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>Pesquisar</button>

                        
                    </div>
                    <div className="date-filter-row">

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                           >
                            <option value="">Todos os Status</option>
                            <option value="aberto">Aberto</option>
                            <option value="em andamento">Em Andamento</option>
                            <option value="resolvido">Resolvido</option>
                        </select>
                           
                        <label htmlFor="start-date">Data de Início:</label>
                        <input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label htmlFor="end-date">Data Final:</label>
                        <input
                            id="end-date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    
                </div>

                <h1 className={classe_css_que_representa_o_status_reclamacao}>ola teste</h1>
             
             <ContainerListagem  
                    searchTerm={searchTerm}
                    filterStatus={filterStatus}
                    startDate={startDate}
                    endDate={endDate}
                    filtragem={foiFeitoFiltragem}
                    
                    />
            
                         
        
        </>
        
    );
};

export default Home;