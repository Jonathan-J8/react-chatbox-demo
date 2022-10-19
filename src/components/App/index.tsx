import { Fragment, lazy, Suspense } from 'react';

import SpinnerFullPage from '@/ui/SpinnerFullPage';
import css from './style.module.css';

import ContainerMain from '@/ui/ContainerMain';
import Button from '@/ui/Button';
import NavBar from '@/ui/Navbar';

const Chatbox = lazy(() => import('@/components/Chatbox'));

const App = () => {
  // Fake props for the case of the demo
  const chatbox = {
    userId: '00-AB',
    userName: 'Casimir',
    clients: [
      {
        userId: '45-CZ',
        userName: 'Sergent Major',
      },
      {
        userId: '98-HD',
        userName: 'Superman',
      },
    ],
  };

  const eraseDB = async () => {
    const { eraseAllChatboxStore } = await import('@/components/Chatbox');
    eraseAllChatboxStore();
  };

  return (
    <Suspense fallback={<SpinnerFullPage />}>
      <Fragment>
        <NavBar>
          <Button title="erase all chatbox messages" onClick={eraseDB}>
            Erase all messages
          </Button>
        </NavBar>
        <ContainerMain>
          <h2>Name : {chatbox.userName}</h2>
          <p>id : {chatbox.userId}</p>
          <br />
          <div className={css.row}>
            <Chatbox
              messageLimit={10}
              userId={chatbox.userName}
              userName={chatbox.userId}
              clientId={chatbox.clients[0].userId}
              clientName={chatbox.clients[0].userName}
            />
            <Chatbox
              messageLimit={5}
              userId={chatbox.userName}
              userName={chatbox.userId}
              clientId={chatbox.clients[1].userId}
              clientName={chatbox.clients[1].userName}
            />
          </div>
        </ContainerMain>
      </Fragment>
    </Suspense>
  );
};

export default App;
