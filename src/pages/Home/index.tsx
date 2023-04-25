import * as React from 'react';
import { Card, Container, NoTransactions } from './styles';
import { useGetBalanceQuery, useTransactionsQuery } from '../../apis/account';
import { useContext, useEffect } from 'react';
import { WalletContext } from '../../layouts/wallet-layout';

type HomeProps = {};


export const Home: React.FC<HomeProps> = ({ }) => {

    const { publicKey } = useContext(WalletContext)

    const { data: balance, refetch: refreshBalance, isFetching } = useGetBalanceQuery(publicKey);
    const { data: transactions, refetch: refreshTransactions } = useTransactionsQuery(publicKey);

    useEffect(() => {
        refreshBalance()
        refreshTransactions()
    }, [])

    if (!balance || isFetching) {
        return (
            <NoTransactions>
                <i />
                <p>Loading...</p>
            </NoTransactions>
        )
    }

    return (
        <Container>
            <Card>
                {
                    balance.alias && (
                        <div>
                            <i />
                            <div><label>Alias: </label> {balance.alias}</div>
                        </div>
                    )
                }

                <div>
                    <i />
                    <div><label>Balance: </label> <i /> {balance.balance}</div>
                </div>

                <div>
                    <i />
                    <div><label>Amount in transactions: </label> <i /> {balance.openedTransactions}</div>
                </div>

                <button className='refresh' onClick={() => {
                    refreshBalance()
                    refreshTransactions()
                }}>Refresh data</button>
            </Card>
            {
                transactions && (
                    <>
                        {transactions.tmp.length > 0 && (<Card>
                            <p>Tmp Transactions</p>

                            <ul>
                                {
                                    transactions.tmp.map((transaction: any, key: any) => (
                                        <li key={key}>
                                            <pre>{JSON.stringify(transaction, null, 4)}</pre>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Card>)}

                        {
                            transactions.blocks.length > 0 && (
                                <Card>
                                    <p>Transactions</p>

                                    <ul>
                                        {
                                            transactions.blocks.map((transaction: any, key: any) => (
                                                <li key={key}>
                                                    <pre>{JSON.stringify(transaction, null, 4)}</pre>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </Card>
                            )
                        }

                        {
                            transactions.blocks.length === 0 && (
                                <NoTransactions>
                                    <i />
                                    <p>No Transactions</p>
                                </NoTransactions>
                            )
                        }

                    </>
                )
            }

        </Container>
    );
};