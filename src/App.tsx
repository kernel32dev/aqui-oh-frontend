import './App.css';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from './pages/Login/auth';
import { useEffect } from 'react';
import Home from './pages/Home/Home';
import Detalhamento from './pages/Detalhamento/Detalhamento';
import CadastroUsuario from './pages/Cadrastro/CadastroUsuario';
import EditarFuncionario from './pages/Editar/EditarFuncionario';


const App = () => {
    const [me, setJwts] = useAuth();

    if (!me) return (
        <Router>
            <Routes>
                <Route path="*" element={
                    <Login setJwts={setJwts} />
                } />
            </Routes>
        </Router>
    );

    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                    <Login setJwts={setJwts} />
                } />
                <Route path="/" element={
                    <Home me={me} setJwts={setJwts} />
                } />
                <Route path="*" element={
                    <Redirect to="/" />
                } />

                <Route path="/detalhamento" element={
                    <Detalhamento competenciaId={''} />
                } />
                <Route path="/cadastro" element={
                    <CadastroUsuario />
                } />
                <Route path="/editar" element={
                   <EditarFuncionario></EditarFuncionario>
                } />
            </Routes>
        </Router>
    );
};

export default App;

const Redirect = (props: {to: string}) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(props.to, { replace: true });
    }, [navigate, props.to]);
    return <></>;
}
