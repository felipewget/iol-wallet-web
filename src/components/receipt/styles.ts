import styled from 'styled-components'

export const Container = styled.div`
    width: calc(100% - 20px);
    margin: 10px;
    color: #EEE;
    background: #555;
    overflow-wrap: break-word;

    .item {
        padding: 5px 10px;
        label {
            font-weight: bold;
            font-size: 14px;
        }
        div {
            font-size: 14px;
        }
    }
`
