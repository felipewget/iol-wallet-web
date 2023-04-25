import * as React from 'react';
import { Container, Field, FieldTextArea, ButtonSubmit, ProductResume, NoTransactions } from './styles';
import { Receipt } from '../../components';
import { useCreateAliasQuery, useCreateDataQuery, useCreateDomainQuery, useCreateProductQuery, useDeleteProductQuery, useExecuteOrderQuery, useTransferDataQuery, useTransferDomainQuery, useTransferQuery, useUpdateDataQuery, useUpdateDomainQuery } from '../../apis/transaction';
import forge from 'node-forge';
import { getTransactionQuery } from '../../apis/products';
import { useContext, useEffect } from 'react';
import { WalletContext } from '../../layouts/wallet-layout';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../constants';

type PaymentProps = {};
export const Payment: React.FC<PaymentProps> = ({ }) => {
    const navigate = useNavigate();

    const [type, setTtype] = React.useState<string>('');
    const [transaction, setTransaction] = React.useState<Record<any, any> | null>();
    const [error, setError] = React.useState<string | null>(null);

    const onSuccess = () => {
        navigate(Path.Account);
    }

    const onError = (error: any) => {
        setError(error.response.data.message);
    }

    const transferIolQuery = useTransferQuery(onSuccess, onError);
    const createDomainQuery = useCreateDomainQuery(onSuccess, onError);
    const updateDomainQuery = useUpdateDomainQuery(onSuccess, onError);
    const transferDomainQuery = useTransferDomainQuery(onSuccess, onError);
    const createDataQuery = useCreateDataQuery(onSuccess, onError);
    const updateData = useUpdateDataQuery(onSuccess, onError);
    const transferDataQuery = useTransferDataQuery(onSuccess, onError);
    const createProductQuery = useCreateProductQuery(onSuccess, onError);
    const removeProductQuery = useDeleteProductQuery(onSuccess, onError);
    const crateAliasQuery = useCreateAliasQuery(onSuccess, onError);
    const executeOrder = useExecuteOrderQuery(onSuccess, onError);

    const isLoading = transferIolQuery.isLoading || createDomainQuery.isLoading || updateDomainQuery.isLoading || transferDomainQuery.isLoading || createDataQuery.isLoading ||
        updateData.isLoading || transferDataQuery.isLoading || createProductQuery.isLoading || removeProductQuery.isLoading || crateAliasQuery.isLoading ||
        executeOrder.isLoading;



    const confirmationSend = () => {
        if (type === "transfer_iol") transferIolQuery.mutate(transaction);

        if (type === "create_domain") createDomainQuery.mutate(transaction);

        if (type === "update_domain") updateDomainQuery.mutate(transaction);

        if (type === "transfer_domain") transferDomainQuery.mutate(transaction);

        if (type === "create_data") createDataQuery.mutate(transaction);

        if (type === "update_data") updateData.mutate(transaction);

        if (type === "transfer_data") transferDataQuery.mutate(transaction);

        if (type === "create_product") createProductQuery.mutate(transaction);

        if (type === "remove_product") removeProductQuery.mutate(transaction);

        if (type === "create_alias") crateAliasQuery.mutate(transaction);

        if (type === "execute_order") executeOrder.mutate(transaction);
    }

    React.useEffect(() => setError(null), [transaction])

    if (isLoading) {
        return (
            <NoTransactions>
                <i />
                <p>Sending transaction...</p>
            </NoTransactions>
        )
    }

    if (transaction) {
        return (
            <Container>
                <div className='header-receipt'>
                    Transaction Type: {type}
                </div>

                {!error && <Receipt transaction={transaction} />}

                {error && <p className='message-error'>{error}</p>}

                <ButtonSubmit type="button" onClick={() => setTransaction(null)}>Try other transaction</ButtonSubmit>
                {!error && <ButtonSubmit type="button" onClick={() => confirmationSend()}>Send Transaction</ButtonSubmit>}
            </Container>
        )
    }

    return (
        <Container>
            <Field>
                <i className='icon-network' />
                <select onChange={(e) => setTtype(e.currentTarget.value)}>
                    <option selected>Select ne transaction</option>
                    <option value="transfer_iol">Transfer IOL</option>
                    <option value="create_domain">Buy Domain</option>
                    <option value="update_domain">Update Domain</option>
                    <option value="transfer_domain">Transfer Domain</option>
                    <option value="create_alias">Create Alias</option>
                    <option value="create_data">Create Data</option>
                    <option value="update_data">Update Data</option>
                    <option value="transfer_data">Transafer Data</option>
                    <option value="create_product">Create Product</option>
                    <option value="remove_product">Remove Product</option>
                    <option value="execute_order">Buy Product</option>
                </select>
            </Field>

            {type === "transfer_iol" && <FormTransferIol setTransaction={setTransaction} />}

            {type === "create_domain" && <FormCreateDomain setTransaction={setTransaction} />}

            {type === "update_domain" && <FormUpdateDomain setTransaction={setTransaction} />}

            {type === "transfer_domain" && <FormTransferDomain setTransaction={setTransaction} />}

            {type === "create_alias" && <FormCreateAlias setTransaction={setTransaction} />}

            {type === "create_data" && <FormCreateData setTransaction={setTransaction} />}

            {type === "update_data" && <FormUpdateData setTransaction={setTransaction} />}

            {type === "transfer_data" && <FormTransferData setTransaction={setTransaction} />}

            {type === "create_product" && <FormCreateProduct setTransaction={setTransaction} />}

            {type === "remove_product" && <FormRemoveProduct setTransaction={setTransaction} />}

            {type === "execute_order" && <FormExecuteOrder setTransaction={setTransaction} />}
        </Container>
    );
};

type formsProps = {
    setTransaction: React.Dispatch<React.SetStateAction<Record<any, any> | null | undefined>>
}

const FormTransferIol: React.FC<formsProps> = ({ setTransaction }) => {

    const { privateKey, publicKey } = useContext(WalletContext)

    const [account, setAccount] = React.useState<string>('');
    const [tip, setTip] = React.useState<string>('');
    const [amount, setAmount] = React.useState<string>('');
    const [observation, setObservation] = React.useState<string>('');

    const handle = async () => {
        let value: Record<string, any> = {
            sender: publicKey,
            receiver: account,
            amount: amount ?? 0,
            tip: tip ?? 0,
            observation: observation ?? "",
            timestamp: new Date().getTime(),
        }

        const pk = (forge.pki.privateKeyFromPem(privateKey));

        let diggestMessage = forge.md.sha256.create();

        diggestMessage.update(JSON.stringify(value), 'utf8');

        value.signature = forge.util.encode64(pk.sign(diggestMessage));

        setTransaction(value);
    }

    return (
        <>
            <Field>
                <i className='icon-user' />
                <input type="text" placeholder='Account' value={account} onChange={(e) => setAccount(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Tip' value={tip} onChange={(e) => setTip(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.currentTarget.value)} />
            </Field>

            <FieldTextArea>
                <i className='icon-text' />
                <textarea placeholder="Observation" value={observation} onChange={(e) => setObservation(e.currentTarget.value)} />
            </FieldTextArea>

            <ButtonSubmit type="button" onClick={() => handle()}>Create Transaction</ButtonSubmit>
        </>
    )
}

const FormCreateDomain: React.FC<formsProps> = ({ setTransaction }) => {

    const { privateKey, publicKey } = useContext(WalletContext)

    const [domain, setDomain] = React.useState<string>('');
    const [extension, setExtension] = React.useState<string>('');
    const [tip, setTip] = React.useState<string>('');
    const [amount, setAmount] = React.useState<string>('');
    const [observation, setObservation] = React.useState<string>('');
    const [serverAddresses, setServerAddresses] = React.useState<string>('');

    const handle = async () => {
        let value: Record<string, any> = {
            sender: publicKey,
            domain: domain,
            extension: extension,
            server_addresses: [serverAddresses],
            amount: amount ?? 0,
            tip: tip ?? 0,
            observation: observation ?? "",
            timestamp: new Date().getTime(),
        }

        const pk = (forge.pki.privateKeyFromPem(privateKey));

        let diggestMessage = forge.md.sha256.create();

        diggestMessage.update(JSON.stringify(value), 'utf8');

        value.signature = forge.util.encode64(pk.sign(diggestMessage));

        setTransaction(value);
    }

    return (
        <>
            <Field>
                <i className='icon-network' />
                <input type="text" placeholder='Domain' value={domain} onChange={(e) => setDomain(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='icon-network' />
                <input type="text" placeholder='Extension' value={extension} onChange={(e) => setExtension(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Tip' value={tip} onChange={(e) => setTip(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='icon-server' />
                <input type="text" placeholder='IP to server' value={serverAddresses} onChange={(e) => setServerAddresses(e.currentTarget.value)} />
            </Field>

            <FieldTextArea>
                <i className='icon-text' />
                <textarea placeholder="Observation" value={observation} onChange={(e) => setObservation(e.currentTarget.value)} />
            </FieldTextArea>

            <ButtonSubmit type="button" onClick={() => handle()}>Create Transaction</ButtonSubmit>
        </>
    )
}

const FormUpdateDomain: React.FC<formsProps> = ({ setTransaction }) => {

    const { privateKey, publicKey } = useContext(WalletContext)

    const [domain, setDomain] = React.useState<string>('');
    const [extension, setExtension] = React.useState<string>('');
    const [tip, setTip] = React.useState<string>('');
    const [observation, setObservation] = React.useState<string>('');
    const [serverAddresses, setServerAddresses] = React.useState<string>('');

    const handle = async () => {
        let value: Record<string, any> = {
            sender: publicKey,
            domain: domain,
            extension: extension,
            server_addresses: [serverAddresses],
            tip: tip ?? 0,
            observation: observation ?? "",
            timestamp: new Date().getTime(),
        }

        const pk = (forge.pki.privateKeyFromPem(privateKey));

        let diggestMessage = forge.md.sha256.create();

        diggestMessage.update(JSON.stringify(value), 'utf8');

        value.signature = forge.util.encode64(pk.sign(diggestMessage));

        setTransaction(value);
    }

    return (
        <>
            <Field>
                <i className='icon-network' />
                <input type="text" placeholder='Domain' value={domain} onChange={(e) => setDomain(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='icon-network' />
                <input type="text" placeholder='Extension' value={extension} onChange={(e) => setExtension(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Tip' value={tip} onChange={(e) => setTip(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='icon-server' />
                <input type="text" placeholder='IP to server' value={serverAddresses} onChange={(e) => setServerAddresses(e.currentTarget.value)} />
            </Field>

            <FieldTextArea>
                <i className='icon-text' />
                <textarea placeholder="Observation" value={observation} onChange={(e) => setObservation(e.currentTarget.value)} />
            </FieldTextArea>

            <ButtonSubmit type="button" onClick={() => handle()}>Create Transaction</ButtonSubmit>
        </>
    )
}

const FormTransferDomain: React.FC<formsProps> = ({ setTransaction }) => {

    const { privateKey, publicKey } = useContext(WalletContext)

    const [receiver, setReceiver] = React.useState<string>('');
    const [domain, setDomain] = React.useState<string>('');
    const [extension, setExtension] = React.useState<string>('');
    const [tip, setTip] = React.useState<string>('');
    const [observation, setObservation] = React.useState<string>('');
    const [serverAddresses, setServerAddresses] = React.useState<string>('');

    const handle = async () => {
        let value: Record<string, any> = {
            sender: publicKey,
            receiver: receiver,
            domain: domain,
            extension: extension,
            tip: tip ?? 0,
            observation: observation ?? "",
            timestamp: new Date().getTime(),
        }

        const pk = (forge.pki.privateKeyFromPem(privateKey));

        let diggestMessage = forge.md.sha256.create();

        diggestMessage.update(JSON.stringify(value), 'utf8');

        value.signature = forge.util.encode64(pk.sign(diggestMessage));

        setTransaction(value);
    }

    return (
        <>
            <Field>
                <i className='icon-user' />
                <input type="text" placeholder='Receiver' value={receiver} onChange={(e) => setReceiver(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='icon-network' />
                <input type="text" placeholder='Domain' value={domain} onChange={(e) => setDomain(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='icon-network' />
                <input type="text" placeholder='Extension' value={extension} onChange={(e) => setExtension(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Tip' value={tip} onChange={(e) => setTip(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='icon-server' />
                <input type="text" placeholder='IP to server' value={serverAddresses} onChange={(e) => setServerAddresses(e.currentTarget.value)} />
            </Field>

            <FieldTextArea>
                <i className='icon-text' />
                <textarea placeholder="Observation" value={observation} onChange={(e) => setObservation(e.currentTarget.value)} />
            </FieldTextArea>

            <ButtonSubmit type="button" onClick={() => handle()}>Create Transaction</ButtonSubmit>
        </>
    )
}

const FormCreateAlias: React.FC<formsProps> = ({ setTransaction }) => {

    const { privateKey, publicKey } = useContext(WalletContext)

    const [alias, setAlias] = React.useState<string>('');
    const [tip, setTip] = React.useState<string>('');

    const handle = async () => {
        let value: Record<string, any> = {
            sender: publicKey,
            alias: alias,
            tip: tip ?? 0,
            timestamp: new Date().getTime(),
        }

        const pk = (forge.pki.privateKeyFromPem(privateKey));

        let diggestMessage = forge.md.sha256.create();

        diggestMessage.update(JSON.stringify(value), 'utf8');

        value.signature = forge.util.encode64(pk.sign(diggestMessage));

        setTransaction(value);
    }

    return (
        <>
            <Field>
                <i className='icon-text' />
                <input type="text" placeholder='Alias' value={alias} onChange={(e) => setAlias(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Tip' value={tip} onChange={(e) => setTip(e.currentTarget.value)} />
            </Field>

            <ButtonSubmit type="button" onClick={() => handle()}>Create Transaction</ButtonSubmit>
        </>
    )
}

const FormCreateData: React.FC<formsProps> = ({ setTransaction }) => {

    const { privateKey, publicKey } = useContext(WalletContext)

    const [data, setData] = React.useState<string>('');
    const [tip, setTip] = React.useState<string>('');
    const [observation, setObservation] = React.useState<string>('');

    const handle = async () => {
        let value: Record<string, any> = {
            sender: publicKey,
            data: data,
            tip: tip ?? 0,
            observation: observation ?? "",
            timestamp: new Date().getTime(),
        }

        const pk = (forge.pki.privateKeyFromPem(privateKey));

        let diggestMessage = forge.md.sha256.create();

        diggestMessage.update(JSON.stringify(value), 'utf8');

        value.signature = forge.util.encode64(pk.sign(diggestMessage));

        setTransaction(value);
    }

    return (
        <>
            <Field>
                <i className='icon-file' />
                <input type="text" placeholder='Json Data' value={data} onChange={(e) => setData(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Tip' value={tip} onChange={(e) => setTip(e.currentTarget.value)} />
            </Field>

            <FieldTextArea>
                <i className='icon-text' />
                <textarea placeholder="Observation" value={observation} onChange={(e) => setObservation(e.currentTarget.value)} />
            </FieldTextArea>

            <ButtonSubmit type="button" onClick={() => handle()}>Create Transaction</ButtonSubmit>
        </>
    )
}

const FormUpdateData: React.FC<formsProps> = ({ setTransaction }) => {

    const { privateKey, publicKey } = useContext(WalletContext)

    const [dataId, setDataId] = React.useState<string>('');
    const [data, setData] = React.useState<string>('');
    const [tip, setTip] = React.useState<string>('');
    const [observation, setObservation] = React.useState<string>('');

    const handle = async () => {
        let value: Record<string, any> = {
            sender: publicKey,
            data_id: dataId,
            data: data,
            tip: tip ?? 0,
            observation: observation ?? "",
            timestamp: new Date().getTime(),
        }

        const pk = (forge.pki.privateKeyFromPem(privateKey));

        let diggestMessage = forge.md.sha256.create();

        diggestMessage.update(JSON.stringify(value), 'utf8');

        value.signature = forge.util.encode64(pk.sign(diggestMessage));

        setTransaction(value);
    }

    return (
        <>
            <Field>
                <i className='icon-label' />
                <input type="text" placeholder='Data ID' value={dataId} onChange={(e) => setDataId(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='icon-file' />
                <input type="text" placeholder='JSON Data' value={data} onChange={(e) => setData(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Tip' value={tip} onChange={(e) => setTip(e.currentTarget.value)} />
            </Field>

            <FieldTextArea>
                <i className='icon-text' />
                <textarea placeholder="Observation" value={observation} onChange={(e) => setObservation(e.currentTarget.value)} />
            </FieldTextArea>

            <ButtonSubmit type="button" onClick={() => handle()}>Create Transaction</ButtonSubmit>
        </>
    )
}

const FormTransferData: React.FC<formsProps> = ({ setTransaction }) => {

    const { privateKey, publicKey } = useContext(WalletContext)

    const [dataId, setDataId] = React.useState<string>('');
    const [receiver, setReceiver] = React.useState<string>('');
    const [tip, setTip] = React.useState<string>('');
    const [observation, setObservation] = React.useState<string>('');

    const handle = async () => {
        let value: Record<string, any> = {
            sender: publicKey,
            data_id: dataId,
            receiver: receiver,
            tip: tip ?? 0,
            observation: observation ?? "",
            timestamp: new Date().getTime(),
        }

        const pk = (forge.pki.privateKeyFromPem(privateKey));

        let diggestMessage = forge.md.sha256.create();

        diggestMessage.update(JSON.stringify(value), 'utf8');

        value.signature = forge.util.encode64(pk.sign(diggestMessage));

        setTransaction(value);
    }

    return (
        <>
            <Field>
                <i className='icon-user' />
                <input type="text" placeholder='Receiver' value={receiver} onChange={(e) => setReceiver(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='icon-label' />
                <input type="text" placeholder='Data ID' value={dataId} onChange={(e) => setDataId(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Tip' value={tip} onChange={(e) => setTip(e.currentTarget.value)} />
            </Field>

            <FieldTextArea>
                <i className='icon-text' />
                <textarea placeholder="Observation" value={observation} onChange={(e) => setObservation(e.currentTarget.value)} />
            </FieldTextArea>

            <ButtonSubmit type="button" onClick={() => handle()}>Create Transaction</ButtonSubmit>
        </>
    )
}

const FormCreateProduct: React.FC<formsProps> = ({ setTransaction }) => {

    const { privateKey, publicKey } = useContext(WalletContext)

    const [dataId, setDataId] = React.useState<string>('');
    const [stock, setStock] = React.useState<string>('');
    const [tip, setTip] = React.useState<string>('');
    const [observation, setObservation] = React.useState<string>('');
    const [price, setPrice] = React.useState<string>('');
    const [fields, setFields] = React.useState<string>('');

    const handle = async () => {
        let value: Record<string, any> = {
            sender: publicKey,
            data_id: dataId,
            tip: tip ?? 0,
            type: "order",
            observation: observation ?? "",
            fields: fields,
            stock: stock,
            timestamp: new Date().getTime(),
            price: price
        }

        const pk = (forge.pki.privateKeyFromPem(privateKey));

        let diggestMessage = forge.md.sha256.create();

        diggestMessage.update(JSON.stringify(value), 'utf8');

        value.signature = forge.util.encode64(pk.sign(diggestMessage));

        setTransaction(value);
    }

    return (
        <>

            <Field>
                <i className='icon-label' />
                <input type="text" placeholder='Product ID' value={dataId} onChange={(e) => setDataId(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Tip' value={tip} onChange={(e) => setTip(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='icon-input' />
                <input type="text" placeholder='[{"field": "label", "type":"text"}]' value={fields} onChange={(e) => setFields(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='icon-box' />
                <input type="number" placeholder='Num of Stock' value={stock} onChange={(e) => setStock(e.currentTarget.value)} />
            </Field>

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Product Price' value={price} onChange={(e) => setPrice(e.currentTarget.value)} />
            </Field>

            <FieldTextArea>
                <i className='icon-text' />
                <textarea placeholder="Observation" value={observation} onChange={(e) => setObservation(e.currentTarget.value)} />
            </FieldTextArea>

            <ButtonSubmit type="button" onClick={() => handle()}>Create Transaction</ButtonSubmit>
        </>
    )
}

const FormRemoveProduct: React.FC<formsProps> = ({ setTransaction }) => {

    const { privateKey, publicKey } = useContext(WalletContext)

    const [transactionId, setTransactionId] = React.useState<string>('');
    const [observation, setObservation] = React.useState<string>('');

    const handle = async () => {
        let value: Record<string, any> = {
            sender: publicKey,
            transaction_id: transactionId,
            observation: observation ?? "",
            timestamp: new Date().getTime(),
        }

        const pk = (forge.pki.privateKeyFromPem(privateKey));

        let diggestMessage = forge.md.sha256.create();

        diggestMessage.update(JSON.stringify(value), 'utf8');

        value.signature = forge.util.encode64(pk.sign(diggestMessage));

        setTransaction(value);
    }

    return (
        <>
            <Field>
                <i className='icon-label' />
                <input type="text" placeholder='Product ID' value={transactionId} onChange={(e) => setTransactionId(e.currentTarget.value)} />
            </Field>

            <FieldTextArea>
                <i className='icon-text' />
                <textarea placeholder="Observation" value={observation} onChange={(e) => setObservation(e.currentTarget.value)} />
            </FieldTextArea>

            <ButtonSubmit type="button" onClick={() => handle()}>Create Transaction</ButtonSubmit>
        </>
    )
}

const FormExecuteOrder: React.FC<formsProps> = ({ setTransaction }) => {

    const { privateKey, publicKey } = useContext(WalletContext)


    const [productData, setProductData] = React.useState<any>();
    const [dataJson, setDataJson] = React.useState<any>();

    const [transactionId, setTransactionId] = React.useState<string>('');
    const [tip, setTip] = React.useState<string>('');
    const [observation, setObservation] = React.useState<string>('');
    const [fields, setFields] = React.useState<any>({});

    const handle = async () => {
        let value: Record<string, any> = {
            sender: publicKey,
            transaction_id: productData?.uid,
            tip: tip,
            observation: observation ?? "",
            fields: fields,
            timestamp: new Date().getTime(),
        }

        const pk = (forge.pki.privateKeyFromPem(privateKey));

        let diggestMessage = forge.md.sha256.create();

        diggestMessage.update(JSON.stringify(value), 'utf8');

        value.signature = forge.util.encode64(pk.sign(diggestMessage));

        setTransaction(value);
    }

    const onSuccessFindProduct = (e: any) => {
        if (e?.transaction?.type === "product") setProductData(e.transaction);
    }

    const onErrorFindProduct = (e: any) => {
        setProductData(null);
        console.log(e)
    }

    const onSuccessFindData = (data: any) => {
        setDataJson(JSON.parse(data?.transaction?.data))
    }

    const onErrorFindData = (e: any) => {
        console.log("error", e)
    }

    const findTransactionQuery = getTransactionQuery(transactionId, onSuccessFindProduct, onErrorFindProduct);
    const findDataQuery = getTransactionQuery(productData?.data_id ?? "", onSuccessFindData, onErrorFindData);

    const handleFindProduct = (e: any) => {
        e.preventDefault()
        console.log(transactionId);
        findTransactionQuery.refetch();
    }

    useEffect(() => {
        findDataQuery.refetch()
    }, [productData?.data_id])

    return (
        <>
            <form onSubmit={handleFindProduct}>
                <Field>
                    <i className='icon-label' />
                    <input type="text" placeholder='Product ID' value={transactionId} onChange={(e) => setTransactionId(e.currentTarget.value)} disabled={productData} />
                </Field>

                {!productData && <button className='find'>Find product</button>}
            </form>

            {productData && (
                <ProductResume>
                    <label>Product description:</label>

                    {productData && dataJson && dataJson.image && <img src={dataJson.image} height="50px" />}
                    {productData && dataJson && dataJson.img && <img src={dataJson.img} height="50px" />}

                    {productData && dataJson && dataJson.title && <p>{dataJson.title}</p>}

                    <Field>
                        <i className='iol-image' />
                        <input type="text" placeholder='Data ID' disabled value={productData.price} />
                    </Field>

                    <FieldTextArea>
                        <i className='icon-text' />
                        <textarea placeholder="Observation" value={productData?.observation} disabled />
                    </FieldTextArea>

                    <div>
                        <label>Fields to buy:</label>
                        {productData?.fields?.map((field: any, idx: any) => (
                            <Field key={idx}>
                                <i className='icon-label' />
                                <input type="text" placeholder={field.name} onChange={(e) => {
                                    let obj = fields;
                                    obj[field.name] = e.currentTarget.value

                                    setFields(obj)
                                }} />
                            </Field>
                        ))}
                    </div>

                    <div>
                        <label>Data</label>
                        <pre>{JSON.stringify(dataJson, null, 4)}</pre>
                    </div>
                </ProductResume>
            )}

            <Field>
                <i className='iol-image' />
                <input type="number" placeholder='Tip' value={tip} onChange={(e) => setTip(e.currentTarget.value)} />
            </Field>

            <FieldTextArea>
                <i className='icon-text' />
                <textarea placeholder="Observation" value={observation} onChange={(e) => setObservation(e.currentTarget.value)} />
            </FieldTextArea>

            <ButtonSubmit type="button" onClick={() => handle()}>Create Transaction</ButtonSubmit>
        </>
    )
}