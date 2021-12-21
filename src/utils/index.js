export const formatUser = (data) => {
    const { displayName, email, phoneNumber, photoURL, uid } = data;
    return { displayName, email, phoneNumber, photoURL, uid };
  };

export const createRoomId = (user, item) => user.uid.toLowerCase() > item.uid.toLowerCase() ? `${user.uid}-${item.uid}` : `${item.uid}-${user.uid}`;

export const getFormattedTime = (time) => `${new Date(time).getHours()}:${new Date(time).getMinutes()}`

export const scrollToBottom = (node) => {
	node.scrollTop = node.scrollHeight;
}