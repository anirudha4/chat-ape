import styled from 'styled-components'
import React, { useState } from 'react'
import { Avatar, Card, Container, FlexBetween, Space, Title, Input } from '@components/custom'
import For from '@components/common/For';
import { colors, styles } from '@themes';
import LoaderOverlay from '@components/custom/LoaderOverlay';
import routeConstants from '@utils/routeConstants';
import { useHistory } from 'react-router-dom';
import { createRoomId } from '@utils';

const SearchContainer = styled.div`
    position: relative;
`;
const UserList = styled.div`
    position: absolute;
    border: 2px solid ${colors.foreBg};
    background-color: ${colors.bg};
    width: 100%;
    cursor: pointer;
    top: 105%;
    border-radius: ${styles.borderRadius};
    .list {
        padding: 1em;
        .user-name {
            color: ${colors.text};
        }
        .user-email {
            color: ${colors.grey};
        }
        &:hover {
            background-color: ${colors.foreBg};
        }
    }
`;
const Conversations = styled.div`
    cursor: pointer;
`;
const Convo = styled.div`
    .list {
        padding: 1em;
        border-radius: ${styles.borderRadius};
        .user-name {
            color: ${colors.text};
        }
        .user-email {
            color: ${colors.grey};
        }
        &:hover {
            background-color: ${colors.bg};
        }
    }
`;
export default function Conversation({ user, chatStore}) {
    const [showList, setShowList] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const handleChange = (e) => {
        chatStore.setSearchTerm(e.target.value);
    }
    const hideUserList = async () => {
        setTimeout(() => {
            setShowList(false)
        }, 200)
    }
    const showUserList = () => {
        setShowList(true)
    }
    const handleUserClick = async(item) => {
        setLoading(true);
        const roomId = await chatStore.handleInitiateChat(item);
        chatStore.setSearchTerm("");
        chatStore.handleChatChange(item);
        setShowList(false);
        setLoading(false);
        handleOpenChat(roomId);
    }
    const handleOpenChat = roomId => {
        history.push(`${routeConstants.chat.route.replace(":id", roomId)}`);
    }
    return (
        <Container>
            {loading && <LoaderOverlay />}
            <Space top="2em" />
            <Card>
                <SearchContainer onBlur={hideUserList}>
                    <Input  onFocus={showUserList} placeholder="Search by name or email" value={chatStore.searchTerm} onChange={handleChange} />
                    {showList && (
                        <For 
                            Parent={UserList}
                            items={chatStore.filteredSearchResults || []}
                            renderItem={item => (
                                <div className='list' onClick={_ => handleUserClick(item)}>
                                    <FlexBetween style={{ justifyContent: 'initial' }}>
                                        <Avatar borderColor={colors.grey} style={{ marginRight: 20 }}>
                                            <img src={item.photoURL} />
                                        </Avatar>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <strong className="user-name">{item.displayName}</strong>
                                            <Space top=".2em" />
                                            <small className='user-email'>{item.email}</small>
                                        </div>
                                    </FlexBetween>
                                </div>
                            )}
                        />
                    )}
                </SearchContainer>
                <Space top="2em" />
                <FlexBetween>
                    <Title><strong>Conversation</strong></Title>
                    <Avatar title={user.displayName}>
                        <img src={user.photoURL} alt="" />
                    </Avatar>
                </FlexBetween>
                <Space top="2em" />
                <For 
                    items={chatStore.conversations || []}
                    Parent={Conversations}
                    renderItem={item => {
                        const ids = item.id.split('-');
                        const notMyId = ids.find(id => id !== user.uid);
                        return (
                            <Convo>
                                <div className='list' onClick={e => {
                                        chatStore.handleChatChange(item[notMyId]);
                                        handleOpenChat(item.id)
                                    }}>
                                    <FlexBetween style={{ justifyContent: 'initial' }}>
                                        <Avatar borderColor={colors.grey} style={{ marginRight: 20 }}>
                                            <img src={item[notMyId].photoURL} />
                                        </Avatar>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <strong className="user-name">{item[notMyId].displayName}</strong>
                                            <Space top=".2em" />
                                            <small className='user-email'>{item[notMyId].email}</small>
                                        </div>
                                    </FlexBetween>
                                </div>
                            </Convo>
                        )
                    }}
                />
            </Card>
        </Container>
    )
}
