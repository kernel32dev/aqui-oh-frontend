import "./Home.css";
import { Link } from "react-router-dom";
import type { Me, SetJwts } from "./auth";

const Home = (props: { me: Me, setJwts: SetJwts }) => {
    return (
        <div className="home-container">
            <h1>Bem vindo(a) {props.me.name}</h1>
            <br />
            <Link to="/login">Voltar para o Login</Link>
            <br />
            <Link to="/login" onClick={() => props.setJwts(null)}>Logoff</Link>
        </div>
    );
};

export default Home;