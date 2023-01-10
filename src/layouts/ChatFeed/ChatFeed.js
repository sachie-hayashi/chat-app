import Message from '../../components/Message';

const ChatFeed = () => {
  return (
    <div className="pt-5 overflow-auto">
      <div className="container-fluid-px-lg">
        <Message
          message="q=65daysofstatic&hl=de&safe=off&prmd=ivnsl&source=lnms&tbm=isch&ei=P9NkToCRMorHsgaunaClCg&sa=X&oi=mode_link&ct=mode&cd=2&ved=0CBkQ_AUoAQ&biw=1697&bih=882"
          side="left"
        />
        <Message message="Hi, There, How are you?" side="left" />

        <Message
          message="q=65daysofstatic&hl=de&safe=off&prmd=ivnsl&source=lnms&tbm=isch&ei=P9NkToCRMorHsgaunaClCg&sa=X&oi=mode_link&ct=mode&cd=2&ved=0CBkQ_AUoAQ&biw=1697&bih=882"
          side="right"
        />
        <Message message="Hi, There, How are you?" side="right" />
      </div>
    </div>
  );
};

export default ChatFeed;
