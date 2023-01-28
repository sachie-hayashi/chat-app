import { useEffect, useState, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useParams } from 'react-router-dom';
import Message from '../../../components/Message';
import useFindChatTo from '../../../hooks/useFindChatTo';

const ChatFeed = () => {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

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
    const scrollToBottom = () => bottomRef.current?.scrollIntoView();

    // If the container size changes, scroll to the bottom
    // scrollToBottom not working for images without resizeObserver
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(scrollToBottom);
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="pt-5 overflow-auto">
      <div ref={containerRef} className="container-fluid-px-lg">
        {messages.map(message => (
          <Message key={message.id} chatTo={chatTo} {...message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatFeed;
