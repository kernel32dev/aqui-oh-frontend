section.container-detalhamento {
    border: 1px solid black; /* Borda verde para a seção */
   
    margin: 0 auto;
    margin-top: 30px;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    max-width: 1000px;
    width: 95vw;
    

}

.container-info {
    /* border: 2px solid #2196F3; Borda azul para a div de informações */
    padding-block: 10px;
    padding-inline: 0;
    margin: 10px 10px;
    
    border-radius: 30px;
   
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-weight: bold;
}

.container-mensagem {
    border: 1px solid black; /* Borda laranja para a div de mensagem */
    padding: 10px;
    margin: 30px 0;
    border-radius: 8px;
    background-color: #7052ff;
    color: white;
    font-weight: bold;

    margin-inline: 10px;
    max-width: 1000px;
    min-width: 300px;
}
.container-mensagem span{ 
    font-size: 17px;
}.container-mensagem p{ 
    font-size: 16px;
    font-weight: normal;
    color: rgba(255, 255, 255, 0.741);
}


.container-imagem {
    /* border: 2px solid #F44336;   Borda vermelha para a div de imagem */
     /* padding: 10px;
    margin: 10px 0; 
    border-radius: 8px; */
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    width: 100%;
    padding-left: 5px;
}

.container-imagem img {
    align-self: flex-start;
  width: 300px;
}

.container-butao-chat2 {
    /* border: 2px solid #9C27B0; Borda roxa para a div de botão */
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    background-color: #f3e5f5;
    text-align: center;
}

/* button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #9C27B0;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #7B1FA2;
} */

section.container-detalhamento h1 {
    text-align: center;
    background-color: #7052ff;
    color: white;
    margin-bottom: 0px;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    padding-block: 10px;
    
}

/* span {
    font-size: 16px;
    color: #333;
}

p {
    font-size: 14px;
    color: #555;
} */


.container-input {
    display: flex;
    align-items: center;
    padding: 10px;
    /* border: 2px solid #9C27B0; Borda roxa */
    border-radius: 8px;
    background-color: #f3e5f5;
    margin-top: 20px;
}

.textoMensagemEnvio-input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 4px;
    margin-right: 10px;
    font-size: 16px;
    min-width: 300px;
    max-width: 800px;
    border: 1px solid black;
}

.textoMensagemEnvio-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #9C27B0;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

}

.textoMensagemEnvio-button:hover {
    background-color: #7B1FA2;
}

section.container-detalhament h1#titulo-reclamacao {

    font-size: 16px !important;
}