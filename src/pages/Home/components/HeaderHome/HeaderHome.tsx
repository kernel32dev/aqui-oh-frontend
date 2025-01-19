import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import './bootstrap.min.css';
import './HeaderHome.css';
import { height } from '@fortawesome/free-solid-svg-icons/fa2';

import logo from "../../../../assets/logo.png";
import { Me } from '../../../Login/auth';
import { Link } from 'react-router-dom';
import type { SetJwts } from "../../../Login/auth.ts";
import { useEffect, useState } from 'react';

interface HeaderHomeProps {
    setJwts: SetJwts;
}

const HeaderHome: React.FC<HeaderHomeProps> = (props) => {

    const usuario_atual = JSON.parse(localStorage.getItem("me") || '{}') ;
    const token_usuario = localStorage.getItem("jwt_access");
    const { setJwts } = props;

    

    interface Competencia {
        name: string;
        // Add other properties if needed
    }
    
    const [competencia, setCompetencia] = useState<Competencia | {name:""}> ({name:""});

    useEffect(() => {
        const fetchCompetencia = async () => {

            console.log(usuario_atual)

            const response = await fetch(`http://localhost:3001/api/competencia/${usuario_atual.competeciaId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token_usuario}` // Substitua pelo seu token de acesso, se necessário
                }
            });
        
            if (!response.ok) {
                console.error('Erro ao buscar competência:', response.statusText);
                return;
            }
        
            const competencia_encontrada = await response.json();
            console.log(competencia_encontrada);
            setCompetencia(competencia_encontrada)
        };

        fetchCompetencia();
    }, []);

    

    return (
        // Additional code can be added here if needed
        <header className="header-home" style={{backgroundColor: '#F36926' ,marginBottom:"0px"}}>
            {['false'].map((expand) => (
                <Navbar key={expand} expand={expand !== 'false' && expand} className="bg-body-tertiary mb-3">
                <Container fluid style={{backgroundColor: '#F36926',minHeight:"10vh"} }>
                    <Navbar.Brand href="#" style={{display:"block",height:"10vh"}}>
                        <img src={logo} alt="" style={{ height: '100%', width: 'auto' }} />
                        
                    </Navbar.Brand>
                  
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} >
                        <FontAwesomeIcon icon={faUser} />
                    </Navbar.Toggle>
                    <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                             <FontAwesomeIcon icon={faUser} />
                             <h5 style={{ marginLeft: '10px', display: 'inline-block' }}> {usuario_atual.name}</h5>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Item style={{ marginBottom: '10px' }}> <span style={{fontWeight:"bold"}}>Nome: </span>{usuario_atual.name}</Nav.Item>
                            <Nav.Item style={{ marginBottom: '10px' }}> <span style={{fontWeight:"bold"}}>Email: </span> {usuario_atual.email} </Nav.Item>
                            <Nav.Item style={{ marginBottom: '10px' }}> <span style={{fontWeight:"bold"}}>Competência: </span>    {competencia?.name} </Nav.Item>
                            
                            <div id='container-butao-profile'>
                                    <Link to="/editar" style={{ marginBottom: '10px', display: 'block' }}>Editar dados</Link>
                                    <Link to="/login" onClick={() => props.setJwts(null)} style={{ marginBottom: '10px', display: 'block',backgroundColor:"rgb(243, 105, 38)",color:"white" }} id='butao-logoff'>Logoff</Link>
                            </div>
                           
                        </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    
                </Container>
                
                </Navbar>
            ))}
            
           
        </header>
    );
};

export default HeaderHome;