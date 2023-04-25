import styled from 'styled-components'
import logo from './../../assets/imgs/logoWhite.svg'

export const ContainerEnter = styled.div`
    width: 800px;
    height: 500px;
    background: #444;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
        font-weight: 500;
        font-size: 20px;
        margin-top: 10px;
        color: #FFF;
    }

    .subtitle {
        font-size: 16px;
        margin-top: 5px;
        color: #FFF;
    }

    & > i {
        width: 100px;
        height: 100px;
        background: url(${logo})no-repeat;
        background-size: 100%;
        display: inline-block;
        margin-left: 10px;
        margin-right: 5px;
    }

    p.error {
        margin:10px;
        color: #FFF;
    }

    button {
        border: solid 1px #EEE;
        background: none;
        color: #FFF;
        margin: 10px;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;;
    }
`

export const Container = styled.div`
    width: 800px;
    height: 500px;
    background: #444;
    display: flex;
    flex-direction: row;

    & > ul {
        outline: none;
        text-decoration: none;
        width: 300px;
        height: 500px;
        background: #555;
        overflow-y: auto;

        a {
            outline: none;
            text-decoration: none;
        }

        img {
            margin: 10px;
        }

        li {
            padding: 10px;
            color: #EEE;
            cursor: pointer;

            &:hover {
                background: #444;
            }

            &.disabled {
                opacity: 0.4;
            }
        }
    }

    & > .content {
        width: 100%;
        height: 500px;
        overflow-y: auto;
    }
`

export const Field = styled.div`
    height: 30px;
    background: #555;
    margin: 20px;
    margin-bottom: 0px;
    width: 300px;

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