export enum StatusPedido {
    EM_PREOCESSAMENTO = 'em_processamento',
    PROCESSADO = 'processado',
    CANCELADO = 'cancelado'
}

// export type StatusPedido2 = 'em_processamento' | 'processado' | 'cancelado'
// const StatusPossiveis = ['em_processamento', 'processado' , 'cancelado', 'batata'] as const;
// export type StatusPedido3 = typeof StatusPossiveis[number];