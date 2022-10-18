import { useEffect, useReducer } from 'react';
import * as db from '@/api/chatboxs';
import wait from '@/utils/wait';
import useIncomingMessageText from '@/hooks/useIncomingMessageText';
import useWindowListener from '@/hooks/useWindowListener';

import { Action, type ChatboxComponent } from './type';
import { reducer, initState } from './state';
import { parseItem } from './methods';
import css from './style.module.css';
import List from './List';
import Item from './Item';
import InputText from './InputText';

const Chatbox = ({ messageLimit, userId, clientId, clientName }: ChatboxComponent) => {
  const [state, dispatch] = useReducer(reducer, initState());

  const pushUserItem = (text: string) => {
    const item = parseItem({ text, position: 'end' });
    db.pushItem({ userId, clientId, item });
    dispatch({ type: Action.PUSH_ITEM, payload: { item } });
  };

  const pushIncomItem = (text: string) => {
    const item = parseItem({ text, position: 'start' });
    db.pushItem({ userId, clientId, item });
    dispatch({ type: Action.PUSH_ITEM, payload: { item } });
  };

  const prependItems = async () => {
    await wait(Math.random() * 1000 + 500); // faking fetch delay
    const from = Math.max(0, state.startAtIndex - messageLimit);
    const to = Math.max(0, state.startAtIndex);
    const items = db.getPreviousItemsFromTo({ clientId, userId, from, to });
    dispatch({ type: Action.PREPEND_ITEMS, payload: { items, startAtIndex: from } });
  };

  const loadItems = async () => {
    await wait(Math.random() * 1000 + 500); // faking fetch delay
    const to = db.getItemsLength({ clientId, userId });
    const from = Math.max(0, to - messageLimit);
    const items = db.getPreviousItemsFromTo({ clientId, userId, from, to });
    dispatch({ type: Action.PREPEND_ITEMS, payload: { items, startAtIndex: from } });
  };

  const reinitState = () => {
    db.flush({ clientId, userId });
    dispatch({ type: Action.INIT_DEFAULT_STATE });
  };

  useEffect(() => {
    loadItems();
  }, []);

  useIncomingMessageText(pushIncomItem);

  // for debugging
  useWindowListener(Action.ERASE_ALL_CHATBOX_STORE, reinitState);

  const itemsReversed = [...state.items].sort((a, b) => b.createdAt - a.createdAt); // safely order items by date (last first)
  const itemsLength = itemsReversed.length;
  const hasMoreItem = state.startAtIndex > 0;
  const scrollableId = `chatbox-${userId}-${clientId}`;

  return (
    <details className={css.container} open>
      <summary className={css.title}>Message from {clientName}</summary>

      <List dataLength={itemsLength} hasMore={hasMoreItem} scrollableId={scrollableId} onScroll={prependItems}>
        {itemsReversed.map((msg) => (
          <Item key={msg.id} {...msg} />
        ))}
      </List>

      <InputText onClick={pushUserItem} />
    </details>
  );
};

export default Chatbox;

// const runOnce = useRef(false);
// https://github.com/reactwg/react-18/discussions/18
// if (!runOnce.current) {
//   runOnce.current = true;
// }
