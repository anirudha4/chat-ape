import Home from "@pages/Home";
import Conversation from "@pages/Conversation";
import routeConstants from "@utils/routeConstants";
import Chat from "@pages/Chat";

export const routeConfig = {
    home: {
        component: Home,
        ...routeConstants.home
    },
    conversation: {
        component: Conversation,
        ...routeConstants.conversation
    },
    chat: {
        component: Chat,
        ...routeConstants.chat
    }
}