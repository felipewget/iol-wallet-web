// @flow 
import * as React from 'react';
import { Container, ContainerEnter, Field } from './styles';
import logo from './../../assets/imgs/logoWhite.svg'
import { Link } from 'react-router-dom';
import { Path } from '../../constants';
import { createContext, useState } from 'react';
import forge from 'node-forge';

type PagesLayoutProps = {
    children: React.ReactNode
};

export type WalletContext = {
    privateKey: string;
    publicKey: string;
};

export const WalletContext = createContext<WalletContext>({} as WalletContext);

export const WalletLayout: React.FC<PagesLayoutProps> = ({ children }) => {
    const [privateKey, setPrivateKey] = useState<string>('');
    const [publicKey, setPublicKey] = useState<string>('');

    const [logged, setLogged] = useState<boolean>(false);
    const [error, setError] = useState(false);



    const authenticate = () => {
        setError(false);

        try {

            const pk = (forge.pki.privateKeyFromPem(privateKey));

            const publicKey = forge.pki.setRsaPublicKey(pk.n, pk.e)

            console.log(forge.pki.publicKeyToPem(publicKey));

            const encodedStringBtoA = btoa(forge.pki.publicKeyToPem(publicKey));

            setPublicKey(encodedStringBtoA);
            setLogged(true);

        } catch (e: any) {
            setError(true);
        }
    }

    if (!logged) {
        return (
            <ContainerEnter>
                <i />
                <p className='title'>IOL Network</p>
                <p className='subtitle'>Welcome to Future</p>

                <Field>
                    <i className='iol-image' />
                    <input type="text" placeholder='Paste your private key here' value={privateKey} onChange={(e) => setPrivateKey(e.currentTarget.value)} />
                </Field>

                {error && <p className='error'>Invalid private key</p>}

                <button onClick={() => authenticate()}>Login at my wallet</button>
            </ContainerEnter>
        )
    }

    return (
        <WalletContext.Provider value={{ privateKey, publicKey }}>
            <Container>
                <ul>
                    <img src={logo} width="50px" />

                    <Link to={Path.Account}>
                        <li>
                            Account
                        </li>
                    </Link>

                    <Link to={Path.Transaction}>
                        <li>
                            Create Transaction
                        </li>
                    </Link>

                    <Link to={Path.Message}>
                        <li>
                            Decrypt messages
                        </li>
                    </Link>

                    <li className='disabled'>
                        Emit bill ticket
                    </li>

                    <li className='disabled'>
                        Create Card
                    </li>

                </ul>

                <div className='content'>
                    {children}
                </div>
            </Container>
        </WalletContext.Provider>
    );
};