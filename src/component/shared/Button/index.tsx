import styled from "styled-components";

interface ButtonProps {
    size?: string,
    noBorder?: boolean,
    theme?: any
};

const Button: any = styled.button`
    ${({theme}) => theme.defaultFontFamily};
    border: ${({noBorder, theme}: ButtonProps) => noBorder ? 'none' : ('1px solid ' + theme.buttonBorderColor)};
    background-color: ${({ theme }) => theme.buttonBGColor};
    color: ${({ theme }) => theme.buttonColor};
    outline: none;
    transition: background-color .25s, color 0.10s;
    padding: 6px 14px;
    border-radius: 3px;
    font-weight: 600;
    
    ${(props: ButtonProps) => {
        switch (props.size) {
            case 'lg': {
                return 'font-size: 18px;';
            }

            case 'sm': {
                return 'font-size: 10px;';
            }

            default:
                return 'font-size: 14px;'
        }
    }}

    &.success {        
        background-color: #59ac44;
        border-color: #59ac44;
        color: #fff;
    }

    &:hover, &:active {
        color: ${({theme}) => theme.buttonActiveColor};
        background-color: ${({theme}) => theme.buttonActiveBGColor};
        cursor: pointer;
    }

    &.success:hover, .success:active {
        background-color: #61bd4f;
    }

    &.close {
        font-size: 24px;
        padding: 2px 12px;
    }
`;

export default Button;