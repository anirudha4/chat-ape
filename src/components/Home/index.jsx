import React, { useState } from 'react'
import { Button, Card, Container, Space } from '@components/custom'
import styled from 'styled-components'
import { colors } from '@themes';
import Loader from 'react-loader-spinner';

const Title = styled.h2`
    strong {
        color: ${colors.text};
    }
    span {
        color: ${colors.primary} !important;
        margin: 0 5px;
    }
`;

export default function Home({ home, userAttr }) {
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        try {
            setLoading(true);
            await userAttr.login();
            setLoading(false);
        } catch(err) {
            setLoading(false);
            console.log(err);
        }
    }
    return (
        <Container>
            <Card style={{ textAlign: 'center' }}>
                <Space top="2em" />
                <Title><strong>Login to <span>Chat Ape</span> to Start Chatting</strong></Title>
                <Space bottom="2em" />
                <Button disabled={loading} onClick={handleLogin}>
                    {loading ? (
                        <Loader 
                            color={colors.primary}
                            type='Oval'
                            height={20}
                            width={20}
                        />) : 
                        'Get Started'
                    }
                </Button>
                <Space bottom="2em" />
            </Card>
        </Container>
    )
}
