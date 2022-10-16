import { Fragment, lazy, Suspense } from 'react';

import SpinnerFullPage from '@/ui/SpinnerFullPage';
import css from './style.module.css';

const ContainerMain = lazy(() => import('@/ui/ContainerMain'));
const Button = lazy(() => import('@/ui/Button'));
const NavBar = lazy(() => import('@/ui/Navbar'));
const Chatbox = lazy(() => import('@/components/Chatbox'));

const App = () => {
  return (
    <Suspense fallback={<SpinnerFullPage />}>
      <Fragment>
        <NavBar>
          <Button
            title="erase all chat box store"
            onClick={async () => {
              const { eraseAllChatboxStore } = await import('@/components/Chatbox');
              eraseAllChatboxStore();
            }}
          >
            Erase all messages
          </Button>
        </NavBar>
        <ContainerMain>
          <h2>Name : Casimir</h2>
          <p>id : 00-AB</p>
          <br />
          <div className={css.row}>
            {/* Fake props for the case of the demo */}

            <Chatbox limit={10} userId="00-AB" userName="Casimir" clientId="45-CZ" clientName="Sergent Major" />
            <Chatbox limit={5} userId="00-AB" userName="Casimir" clientId="98-HD" clientName="Superman" />
          </div>
        </ContainerMain>
      </Fragment>
    </Suspense>
  );
};

export default App;
