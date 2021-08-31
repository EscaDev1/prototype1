import styled, {css} from "styled-components";
const Container = styled.div`
    display:flex;
    flex-direction: ${props=>props.direction};
    ${props => props.grow && css`
        flex-grow:1;
    `}
`;

export {Container};