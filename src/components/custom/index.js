import styled, { css } from 'styled-components';
import { colors, fonts, styles } from '@themes';

const flexConfig = (justify = 'center', align = 'center') => css`
    display: flex;
    justify-content: ${justify};
    align-items: ${align};
`;
const spaceConfig = ({ top, right, bottom, left}) => css`
    margin: ${top} ${right} ${bottom} ${left} 
`;
export const Space = styled.div`
    ${props => spaceConfig({ top: props.top, right: props.right, bottom: props.bottom,  left: props.left })}
`;
export const Container = styled.div`
    max-width: ${styles.maxWidth};
    margin: 0 auto;
    padding: 0 1em;
`;
export const FlexBetween = styled.div`
    ${flexConfig('space-between', 'center')};
`;
export const FlexCenter = styled.div`
    ${flexConfig()};
`;
export const Card = styled.div`
    padding: 1.5em;
    background-color: ${colors.foreBg};
    border-radius: ${styles.borderRadius};
    box-shadow: ${styles.boxShadow};
`;

export const BorderedCard = styled(Card)`
    box-shadow: initial;
    border: 2px solid ${colors.greyLight};
`;


export const Line = styled.div`
    height: 2px;
    background-color: ${colors.greyLight};
`;

export const Title = styled.h3`
    color: ${colors.text};
`;
export const Subtitle = styled.h6`
    color: ${colors.grey};
`;

export const Button = styled.button`
    padding: 1em 1.6em;
    min-width: 100px;
    border: none;
    outline: none;
    background-color: ${props => props.danger ? colors.danger : colors.primary};
    color: ${colors.text};
    font-weight: ${fonts.weight.bold};
    border-radius: 50px;
    cursor: pointer;
    transition: all .2s;
    &:disabled {
        background-color: ${colors.bg};
        cursor: not-allowed;
    }
`;

export const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    border: 3px solid ${props => props.borderColor ? props.borderColor : colors.primary};
    overflow: hidden;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`;

export const Input = styled.input`
    width: 100%;
    border: 2px solid ${colors.bg};
    border-radius: ${styles.borderRadius};
    background-color: ${colors.bg};
    outline: none;
    transition: all .2s;
    font-weight: ${fonts.weight.medium};
    color: ${colors.text};
    padding: 10px;
    &:focus {
        border: 2px solid ${colors.primary};
    }
    &:hover {
        border: 2px solid ${colors.primary};
    }
`;
export const Flex = styled.div`
    display: flex;
`;