import { auth, provider } from '@config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { createContext } from 'react'
import LoaderOverlay from '@components/custom/LoaderOverlay';
import { insertOne } from '@utils/dbUtils';
import { COLLECTION_NAME } from '@utils/constants';
import { formatUser } from '@utils';

export const AuthStore = createContext();
export default function AuthStoreProvider({children}) {
    const [user, loading, error] = useAuthState(auth);
    const login = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            await insertOne(COLLECTION_NAME.USERS, {...formatUser(response.user)}, response.user.uid)
        } catch(err) {
            console.log(err);
        }
    }
    const logout = () => signOut(auth);
    const values = { login, user, logout };
    if(loading) {
        return <LoaderOverlay />
    }
    return (
        <AuthStore.Provider value={values}>
            {children}
        </AuthStore.Provider>
    )
}
