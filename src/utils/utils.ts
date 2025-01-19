export function formatarTextoStatus(status: string) {
    switch (status) {
        case 'aberto':
            return 'Aberto';
        case 'em_andamento':
            return 'Em andamento';
        case 'resolvido':
            return 'Resolvido';
        default:
            return 'Status desconhecido';
    }
}


export function retornarNomeDaClasseCss(status_reclamacao:string){

    switch (status_reclamacao) {
        case 'Aberto':
            return 'aberto';
        case 'Em andamento':
            return 'em_andamento';
        case 'Resolvido':
            return 'resolvido';
        default:
            return 'status_desconhecido';
    }
    

}