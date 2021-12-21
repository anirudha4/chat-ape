import React from 'react'
import { Redirect } from 'react-router-dom';
import Component from '@components/Home'
import { withContext } from '@components/hoc';


function Home({ home, userAttr }) {
    if(userAttr.user) {
        return <Redirect to="/conversation" />
    }
    return (
        <>
            <Component home={home} userAttr={userAttr} />
        </>
    )
}
export default withContext(Home);