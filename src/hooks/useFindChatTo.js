import { useSelector } from 'react-redux';

/**
 * Find a user the current user chats to
 * @param {string} chatId
 * @returns - A object which has a user id and a user object
 */

const useFindChatTo = chatId => {
  const { currentUser, users, chatList } = useSelector(state => state);

  const chat = chatList.find(item => item.id === chatId);
  const { members } = chat || {};
  const chatToUid = members?.find(uid => uid !== currentUser.uid);
  const chatTo = users.find(user => user.uid === chatToUid);

  return { chatToUid, chatTo };
};

export default useFindChatTo;
