import styled from 'styled-components'

import logo from './../../assets/imgs/logoWhite.svg'

export const Container = styled.div`
    button.find {
        margin: 10px;
        background: transparent;
        border: solid 1px #CCC;
        border-radius: 3px;
        padding: 5px 10px;
        color: #FFF;
        cursor: pointer;
    }

    .header-receipt {
        padding: 10px;
        color: #FFF;
        border-bottom: solid 1px #777;
    }

    .message-error {
        padding: 10px;
        border: solid 1px #EEE;
        margin: 10px;
        color: #FFF;
        font-size: 14px;
        border-radius: 3px;
    }
`

export const Field = styled.div`
    height: 30px;
    background: #555;
    margin: 10px;
    margin-bottom: 0px;
    width: calc(100% - 20px);

    i {
        width: 30px;
        height: 30px;
        float: left;
        text-align: center;
        line-height: 30px;
        color: #FFF;
        font-size: 12px;
    }

    i.iol-image {
        background: url(${logo})no-repeat;
        background-size: 50%;
        background-position: center;
    }

    input, select {
        height: 30px;
        padding: 0px 10px;
        float: left;
        width: calc(100% - 50px);
        border: none;
        background: transparent;
        outline: none;
        color: #FFF;

        option {
            color: #555;
        }
    }
`

export const FieldTextArea = styled.div`
    height: 100px;
    background: #555;
    margin: 10px;
    margin-bottom: 0px;
    width: calc(100% - 20px);

    i {
        width: 30px;
        height: 30px;
        float: left;
        text-align: center;
        line-height: 30px;
        color: #FFF;
        font-size: 12px;
    }

    i.iol-image {
        background: url(${logo})no-repeat;
        background-size: 50%;
        background-position: center;
    }

    textarea {
        float: left;
        width: calc(100% - 50px);
        border: none;
        background: transparent;
        outline: none;
        color: #FFF;
        height: 80px;
        resize: none;
        padding: 10px;
    }
`

export const ButtonSubmit = styled.button`
    border: solid 1px #FFF; 
    background: transparent;
    height: 30px;
    line-height: 30px;
    margin: 10px;
    padding: 0px 10px;
    border-radius: 3px;
    color: #FFF;
    font-size: 14px;
    cursor: pointer;
`

export const ProductResume = styled.div`
    margin: 10px;
    background: #333;
    border-radius: 3px;
    padding: 10px;
    width: calc(100% - 40px);

    label {
        font-size: 14px;
        color: #eee;
        padding: 10px;
        display: block;
        padding-bottom: 0px;
    }

    pre {
        background: #000;
        margin: 10px;
        color: #EEE;
        padding: 10px;
        font-size: 14px;
    }
`

export const NoTransactions = styled.div`
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    i {
        width: 50px;
        height: 50px;
        background: url(${logo})no-repeat;
        background-size: 100%;
        display: block;
    }
    p {
        font-size: 14px;
        color: #BBB;
        margin-top: 10px;
    }


`
