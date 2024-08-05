import styled from "styled-components";

const Input: any = styled.input`
    border: none;
    box-shadow: ${({ noBoxShadow, theme }: any) => ((noBoxShadow) ? 'none' : theme.boxShadow)};
    padding: 10px;
    outline: none;
    font-size: 14px;
    font-weight: 600;
    border-radius: 2px;
    margin-bottom: 10px;

    &:focus, &:active {
        background-color: rgba(245, 245, 245, 0.7);
    }
`;

export default Input;