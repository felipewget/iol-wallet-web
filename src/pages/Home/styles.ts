import styled from 'styled-components'
import logo from './../../assets/imgs/logoWhite.svg'


export const Container = styled.div`
    
`

export const Card = styled.div`
    margin: 10px;
    padding: 10px;
    background: #333;
    width: calc(100% - 40px);
    display: block;
    border-radius: 3px;
    box-shadow: 0px 0px 3px #222;

    .refresh {
        margin: 10px;
        border: none;
        color: #EEE;
        background: transparent;
        cursor: pointer;
    }

    & > div {
        margin: 5px 10px;
        color: #FFF;
        font-size: 14px;
        display: flex;
        flex-direction: row;

        &>label {
            font-weight: bold;
        }

        div {
            display:flex;
            justify-content: center;
            align-items: center;
            i {
                width: 14px;
                height: 14px;
                background: url(${logo})no-repeat;
                background-size: 100%;
                display: inline-block;
                margin-left: 10px;
                margin-right: 5px;
            }
        }
        
    }

    p {
        color: #FFF;
    }

    ul {
        list-style: none;
        
        li {
            background: #000;
            margin-top: 10px;
            color: #FFF;
            padding: 10px;
            font-size: 13px;
              
            pre {
                overflow-x: auto;
            }
        }
    }

`

export const NoTransactions = styled.div`
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    i {
        width: 100px;
        height: 100px;
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
