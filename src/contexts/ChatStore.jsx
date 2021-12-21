import { db } from '@config/firebase';
import { createRoomId, formatUser } from '@utils';
import { COLLECTION_NAME } from '@utils/constants';
import { insertOne } from '@utils/dbUtils';
import { collection, doc, getDoc,  onSnapshot, query, addDoc, where, orderBy } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthStore } from './AuthStore';

export const ChatStore = createContext();
export default function ChatStoreProvider({children}) {
    const { user } = useContext(AuthStore) || {};
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSearchResults, setFilteredSearchResults] = useState();
    const [searchResults, setSearchResults] = useState(null);
    const [conversations, setConversations] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);

    const isMatching = (item) => item.displayName.toLowerCase().includes(searchTerm.toLowerCase()
    ) || item.email.toLowerCase().includes(searchTerm.toLowerCase());

    const handleChatChange = chatData => setCurrentChat(chatData);

    const resetConversation = () => {
        setCurrentChat(null);
        setMessages(null);
    }
    const handleInitiateChat = async (item) => {
        try {
            console.log({item, user});
            const roomId = createRoomId(user, item);
            const userOne = user.uid;
            const userTwo = item.uid;
            const payload = {
                [userOne]: { ...formatUser(user) },
                [userTwo]: { ...item },
                uids: [user.uid, item.uid]
            }
            await insertOne(COLLECTION_NAME.CONVERSATIONS, payload, roomId);
            return roomId;
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(!searchTerm) return setFilteredSearchResults([])
        const temp = searchResults?.filter(result => isMatching(result));
        setFilteredSearchResults(temp);
    }, [searchTerm, user])
    useEffect(() => {
        async function getSearchResults() {
            try {
                const q = query(collection(db, COLLECTION_NAME.USERS), where("uid","!=",user?.uid))
                onSnapshot(q, snapshot => {
                    const temp = []
                    snapshot.forEach(snap => {
                        temp.push({...snap.data(), id: snap.id});
                    });
                    setSearchResults(temp);
                })
            } catch(err) {
                console.log(err);
            }
        }
        getSearchResults();
    }, [user]);
    useEffect(() => {
        async function getConversations() {
            try {
                const q = query(collection(db, COLLECTION_NAME.CONVERSATIONS), where("uids", "array-contains", user.uid))
                onSnapshot(q, snapshot => {
                    const temp = []
                    snapshot.forEach(snap => {
                        temp.push({...snap.data(), id: snap.id});
                    });
                    setConversations(temp);
                })
            } catch(err) {
                console.log(err);
            }
        }
        getConversations();
    }, [user]);

    const getMessages = async id => {
        const q = query(collection(db, COLLECTION_NAME.CONVERSATIONS, id, COLLECTION_NAME.MESSAGES), orderBy('sentAt', 'asc'))
        await onSnapshot(q, (snapshot) => {
            const temp = [];
            snapshot.forEach(snap => {
                temp.push({...snap.data(), id: snap.id})
            });
            setMessages(temp);
            console.log(temp);
        })
    }
    const getConversation = async id => {
        const docRef = doc(db, COLLECTION_NAME.CONVERSATIONS, id);
        const docSnap = await  getDoc(docRef);
        const data = docSnap.data();
        const notMyId = id.split('-').find(i => i !== user.uid);
        setCurrentChat(data[notMyId]);
    }
    const sendMessage = async (payload, roomId) => {
        try {
            await addDoc(collection(db, COLLECTION_NAME.CONVERSATIONS,roomId, COLLECTION_NAME.MESSAGES), payload);
        } catch(err) {
            console.log(err);
        }

    }
    const values = { searchTerm, setSearchTerm, filteredSearchResults, handleInitiateChat, conversations, getMessages, currentChat, handleChatChange, messages, getConversation, sendMessage, resetConversation };
    return (
        <ChatStore.Provider value={values}>
            {children}
        </ChatStore.Provider>
    )
}
