import * as React from 'react';
import { Container } from './styles';


type ReceiptProps = {
    transaction: Record<string, any>
};

export const Receipt: React.FC<ReceiptProps> = ({ transaction }) => {
    return (
        <>
            <Container>
                {Object.keys(transaction).map((key) => <ReceiptItem key={key} label={key} value={transaction[key]} />)}
            </Container>
        </>
    );
};

const ReceiptItem: React.FC<{ label: string, value: any }> = ({ label, value }) => (
    <div className='item'>
        <label>{label}</label>
        {
            typeof value === "object" ? <div>{JSON.stringify(value)} </div> : <div>{value}</div>
        }
    </div>
)