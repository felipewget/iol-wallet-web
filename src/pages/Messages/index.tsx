import * as React from 'react';
import { Card, FieldTextArea, Content } from './styles';
import { useContext, useState } from 'react';
import forge from 'node-forge';
import { WalletContext } from '../../layouts/wallet-layout';

type MessagesProps = {};

export const Messages: React.FC<MessagesProps> = ({ }) => {

    const { privateKey } = useContext(WalletContext)

    const [value, setValue] = useState('');
    const [data, setData] = useState('');

    const decrypt = () => {
        try {
            const pk = (forge.pki.privateKeyFromPem(privateKey));

            setData(pk.decrypt(value));
        } catch (e: any) {
            alert("Invalid encryption")
        }

    }

    return (
        <Content>

            <FieldTextArea>
                <i className='icon-text' />
                <textarea placeholder="Ecrypted message" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
            </FieldTextArea>

            <button onClick={() => decrypt()}>Decrypt</button>

            {data && data.length > 0 && <Card>{data}</Card>}
        </Content>
    );
};