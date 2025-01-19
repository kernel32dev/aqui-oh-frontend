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