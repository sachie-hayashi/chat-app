import { useEffect, useState, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useParams } from 'react-router-dom';
import Message from '../../../components/Message';
import useFindChatTo from '../../../hooks/useFindChatTo';

const ChatFeed = () => {
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);

  const { id } = useParams();
  const { chatTo } = useFindChatTo(id);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'chats', id), doc => {
      setMessages(doc.data()?.messages || []);
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  useEffect(() => {
    const scrollToBottom = () => ref.current?.scrollIntoView();
    scrollToBottom();
  }, [messages]);

  return (
    <div className="pt-5 overflow-auto">
      <div className="container-fluid-px-lg">
        {messages.map(message => (
          <Message key={message.id} chatTo={chatTo} {...message} />
        ))}
        <div ref={ref} />
      </div>
    </div>
  );
};

export default ChatFeed;
