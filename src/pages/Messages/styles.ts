import styled from 'styled-components'
import logo from './../../assets/imgs/logoWhite.svg'

export const Content = styled.div`
    button {
        margin: 10px;
        background: transparent;
        border: solid 1px #EEE;
        color: #EEE;
        padding: 5px 10px;
        cursor: pointer;
    }
`

export const Card = styled.div`
    margin: 10px;
    background: #333;
    padding: 10px;
    color: #FFF;
    border-radius: 3px;
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