import { useEffect, useReducer } from 'react';
import * as db from '@/api/chatboxs';
import wait from '@/utils/wait';
import useIncomingText from '@/hooks/useIncomingText';
import useWindowListener from '@/hooks/useWindowListener';

import { Action, type ChatboxComponent } from './type';
import { reducer, initState } from './state';
import { parseItem } from './methods';
import css from './style.module.css';
import List from './List';
import Item from './Item';
import InputText from './InputText';

const Chatbox = ({ limit, userId, userName, clientId, clientName }: ChatboxComponent) => {
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
    await wait(Math.random() * 1000); // fake fetch delay
    const index = state.startAtIndex;
    const from = Math.max(0, index - limit);
    const to = Math.max(0, index);
    const items = db.getPreviousItemsFromTo({ clientId, userId, from, to });
    dispatch({ type: Action.PREPEND_ITEMS, payload: { items, startAtIndex: from } });
  };

  const loadItems = async () => {
    const to = db.getItemsLength({ clientId, userId });
    const from = Math.max(0, to - limit);
    const items = db.getPreviousItemsFromTo({ clientId, userId, from, to });
    dispatch({ type: Action.PREPEND_ITEMS, payload: { items, startAtIndex: from } });
  };

  const removeAllItems = () => {
    db.flush({ clientId, userId });
    dispatch({ type: Action.FLUCH });
  };

  useEffect(() => {
    loadItems();
  }, []);

  useIncomingText(pushIncomItem);

  // debug
  useWindowListener(Action.ERASE_ALL_CHATBOX_STORE, removeAllItems);

  const itemsReverse = [...state.items].reverse(); // safely reverse
  const itemsLength = itemsReverse.length;
  const hasMoreItem = state.startAtIndex > 0;
  const scrollableId = `chatbox-${userId}-${clientId}`;

  return (
    <details className={css.container} open>
      <summary className={css.title}>Message from {clientName}</summary>

      <List dataLength={itemsLength} hasMore={hasMoreItem} scrollableId={scrollableId} onScroll={prependItems}>
        {itemsReverse.map((msg) => (
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
