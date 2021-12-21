import React from 'react'
import Component from '@components/Conversation';
import withGaurd from '@components/hoc/withGaurd';
import { withContext } from '@components/hoc'

function Conversation({userAttr, chatStore}) {
    return (
        <div>
            <Component user={userAttr.user} chatStore={chatStore} />
        </div>
    )
}

const ProtectedComponent = withContext(Conversation);
export default withGaurd(ProtectedComponent);