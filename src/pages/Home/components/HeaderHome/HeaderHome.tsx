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
                             <h5> {usuario_atual.name}</h5>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Item>Nome: {usuario_atual.name}</Nav.Item>
                            <Nav.Item>Email: {usuario_atual.email} </Nav.Item>
                            <Nav.Item>Compêtencia: {competencia?.name} </Nav.Item>
                            
                            <Link to="/editar">Editar dados</Link>
                            <Link to="/login" onClick={() => props.setJwts(null)}>Logoff</Link>
                            {/* <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link> */}
                           
                        {/* <NavDropdown
                            title="Dropdown"
                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                        >
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                            Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                            Something else here
                            </NavDropdown.Item>
                        </NavDropdown> */}
                        </Nav>
                        {/* <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                        </Form> */}


                   
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    
                </Container>
                
                </Navbar>
            ))}
            
           
        </header>
    );
};

export default HeaderHome;