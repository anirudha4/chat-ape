import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Button, Container, FlexBetween } from '@components/custom';
import { colors, fonts } from '@themes';
import { AuthStore } from '@contexts/AuthStore';
import Loader from 'react-loader-spinner';

const NavContainer = styled.div`
    padding: 1.5em 0;
`;
const Logo = styled(NavLink)`
    font-size: ${fonts.fontLarge};
    color: ${colors.text};
`;
export default function Navbar() {
    const { user, login, logout } = useContext(AuthStore);
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        try {
            setLoading(true);
            await login();
            setLoading(false);
        } catch(err) {
            setLoading(false);
            console.log(err);
        }
    }
    return (
        <NavContainer>
            <Container>
                <FlexBetween>
                    <Logo to="/">
                        <strong>Chat Ape</strong>
                    </Logo>
                    {user ? <Button danger onClick={logout}>Logout</Button> : <Button disabled={loading} onClick={handleLogin}>
                    {loading ? (
                        <Loader 
                            color={colors.primary}
                            type='Oval'
                            height={20}
                            width={20}
                        />) : 
                        'Login'
                    }
                    
                </Button>}
                </FlexBetween>
            </Container>
        </NavContainer>
    )
}
