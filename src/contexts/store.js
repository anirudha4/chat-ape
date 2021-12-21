import { useContext } from "react";
import { AuthStore } from "./AuthStore";
import { ChatStore } from "./ChatStore";
import { HomeStoreContext } from "./HomeStore";

export default {
    home: () => useContext(HomeStoreContext),
    userAttr: () => useContext(AuthStore),
    chatStore: () => useContext(ChatStore)
}