import React from 'react'
import AuthStoreProvider from './AuthStore'
import ChatStoreProvider from './ChatStore'
import HomeStoreProvider from './HomeStore'

export default function ContextWrapper({children}) {
    return (
        <>
            <AuthStoreProvider>
                <HomeStoreProvider>
                    <ChatStoreProvider>
                        {children}
                    </ChatStoreProvider>
                </HomeStoreProvider>
            </AuthStoreProvider>
        </>
    )
}
