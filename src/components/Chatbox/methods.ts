import { v4 as uuidv4 } from 'uuid';
import dispatch from '@/utils/dispatch';
import { Action, ChatboxItem } from './type';

interface ParseItemProps {
  text: ChatboxItem['text'];
  position: ChatboxItem['position'];
}

export const parseItem = ({ text, position }: ParseItemProps): ChatboxItem => ({
  id: `${uuidv4()}`,
  createdAt: Date.now(),
  text,
  position,
});

export const eraseAllChatboxStore = () => dispatch(Action.ERASE_ALL_CHATBOX_STORE);
