import React, { useEffect, useRef, useState } from 'react'
import FeatherIcon from 'feather-icons-react';
import { Avatar, Card, Container, Flex, FlexBetween, Input, Space, Title } from '@components/custom';
import { colors, fonts, styles } from '@themes';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import routeConstants from '@utils/routeConstants';
import { withContext } from '@components/hoc';
import withGaurd from '@components/hoc/withGaurd';
import LoaderOverlay from '@components/custom/LoaderOverlay';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { getFormattedTime, scrollToBottom } from '@utils';

const MessageContainer = styled.div`
    height: 400px;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
`;

const Messages = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
`;

const MessageBox =styled.div`
    display: flex;
    align-items: center;
    position: relative;
    input {
        width: 100%;
        background-color: transparent;
        padding: 1em 4.5em;
    }
    svg {
        position: absolute;
        cursor: pointer;
    }
    button {

    }
`;
const MessageList = styled.div`
    height: 400px;
    overflow-y: scroll;
`;
const Message = styled.div`
    padding: .3em .6em;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: ${props => props.you ? 'flex-start' : 'flex-end'};

`;
const MessageCube = styled.div`
    word-wrap: break-word;
    padding: .7em .8em;
    font-weight: ${fonts.weight.medium};
    font-size: ${fonts.small};
    background-color: ${props => props.you ? colors.bg : colors.primary};   
    max-width: 250px;
    border-radius: ${styles.borderRadius};
    ${props => props.you ? `
        border-top-left-radius: 0;
    ` : `
        border-top-right-radius: 0;
    `}
    border-top-right-radius: 0;
    color: ${colors.text};
`;
const Time = styled.div`
    font-size: ${fonts.fontXS};
    margin-bottom: .3em;
    font-weight: ${fonts.weight.bold};
    color: ${colors.grey};
`;
function Chat({ userAttr, chatStore }) {
    const { currentChat,  getMessages, getConversation, messages, sendMessage, resetConversation } = chatStore;
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const listRef = useRef();
    useEffect(() => {
        if(!currentChat) {
            getConversation(id);
        }
        getMessages(id)
        return () => {
            resetConversation();
        }
    }, [id])
    const history = useHistory();

    const handleChange = e => {
        setMessage(e.target.value)
    }
    const onMessageSend = async e => {
        setLoading(true)
        const payload = {
            senderId: currentChat.uid,
            recieverId: userAttr.user.uid,
            message,
            sentAt: Date.now()
        }
        await sendMessage(payload, id);
        scrollToBottom(listRef.current);
        setMessage("");
        setLoading(false);
    }
    return (
        <Container>
            <Space top="2em" />
            {!currentChat ? <LoaderOverlay /> : (
                    <Card>
                        <FlexBetween>
                            <Flex style={{ alignItems: 'center' }}>
                                <FeatherIcon style={{ cursor: 'pointer' }} onClick={e => history.replace(routeConstants.conversation.route)} icon="arrow-left" color={colors.grey} />
                                <Avatar style={{ margin: '0 1em' }}>
                                    <img src={currentChat.photoURL} alt="" />
                                </Avatar>
                                <div>
                                    <Title>
                                        {currentChat.displayName}
                                    </Title>
                                    <small style={{ color: colors.grey }}>{currentChat.email}</small>
                                </div>
                            </Flex>
                        </FlexBetween>
                        <Space top="1em" />
                        <MessageContainer>
                            <Messages>
                                {messages ? (
                                    <MessageList ref={listRef}>
                                        {messages.map(msg => {
                                            return (
                                                <>
                                                {msg.senderId === userAttr.user.uid ? (
                                                    <Message key={JSON.stringify(msg)} you={true}>
                                                        <Time>{getFormattedTime(msg.sentAt)}</Time>
                                                        <MessageCube you={true}>
                                                            <strong>{msg.message}</strong>
                                                        </MessageCube>
                                                    </Message>) : (
                                                        <Message key={JSON.stringify(msg)} you={false}>
                                                            <Time>{getFormattedTime(msg.sentAt)}</Time>
                                                            <MessageCube you={false}>
                                                                {msg.message}
                                                            </MessageCube>
                                                        </Message>
                                                    )}
                                                </>
                                            )
                                        })}
                                    </MessageList>
                                ) : (
                                    <template>Make a tempalte for getting started</template>
                                )}
                            </Messages>
                            <Space top="1em" />
                            <MessageBox>
                                <FeatherIcon size="18" style={{ left: 20 }} icon="camera"  color={colors.grey} />
                                <Input onChange={handleChange} value={message} placeholder='Type your message' />
                                {loading ? (
                                    <Loader 
                                        color={colors.primary}
                                        size="18"
                                        type='Oval'
                                    />
                                ) : (
                                    <FeatherIcon 
                                        onClick={onMessageSend}
                                        size="18"
                                        style={{ 
                                            right: 20,
                                            cursor: 'pointer'
                                        }} icon="send"  color={colors.grey} 
                                    />
                                )}
                            </MessageBox>
                        </MessageContainer>
                    </Card>
            )}
        </Container>
    )
}

const ProtectedRoute = withContext(Chat);
export default withGaurd(ProtectedRoute);