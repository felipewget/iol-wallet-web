export type Block = {
    index: number;
    previousHash: string;
    proofOfWork: number;
    transactions: Record<string, any>[];
}