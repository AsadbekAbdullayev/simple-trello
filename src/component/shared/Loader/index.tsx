import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
    padding: 10px;
    color: #fff;
    ${({ theme }) => theme.headerFontFamily}
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    align-items: center;
    display: flex;
    justify-content: center;
    /* background-color: rgba(33, 32, 32, 0.1); */
    min-height: 40px;

    & .circular {
        -webkit-animation: rotate 2s linear infinite;
        animation: rotate 2s linear infinite;
        height: 100%;
        -webkit-transform-origin: center center;
        -ms-transform-origin: center center;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    & .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        -webkit-animation: dash 1.5s ease-in-out infinite,
        color 6s ease-in-out infinite;
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round;
        stroke-width: 4;
    }
    @-webkit-keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124;
        }
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124;
        }
    }
    @-webkit-keyframes color {
        100%,
        0% {
            stroke: #d62d20;
        }
        40% {
            stroke: #ffffff;
        }
        66% {
            stroke: #141414;
        }
        80%,
        90% {
            stroke: #ffa700;
        }
    }
    @keyframes color {
        100%,
        0% {
            stroke: #d62d20;
        }
        40% {
            stroke: #0057e7;
        }
        66% {
            stroke: #008744;
        }
        80%,
        90% {
            stroke: #ffa700;
        }
    }
`;

const Svg = styled.svg`
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
    -ms-transform-origin: center center;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`;

const Circle = styled.circle`
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    -webkit-animation: dash 1.5s ease-in-out infinite,
        color 6s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
`;

const LoaderContent = styled.div`
    width: 40px;
    height: 40px;
    position: relative;
`;

export function Loader() {
    return (
        <LoaderContainer>
            <LoaderContent>
                <Svg className="circular" viewBox="25 25 50 50">
                    <Circle
                        className="path"
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        stroke-width="2"
                        stroke-miterlimit="10"
                    />
                </Svg>
            </LoaderContent>
        </LoaderContainer>
    );
}
