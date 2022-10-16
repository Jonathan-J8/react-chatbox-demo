export type ChatboxItem = {
  id: string;
  createdAt: number;
  text: string;
  position: 'start' | 'end';
};

export type ChatboxState = {
  items: ChatboxItem[];
  startAtIndex: number;
};

export type ChatboxComponent = {
  messageLimit: number;
  userId: string;
  userName?: string;
  clientId: string;
  clientName: string;
};

export enum Action {
  PUSH_ITEM = 'a',
  PREPEND_ITEMS = 'b',
  FLUCH = 'c',
  ERASE_ALL_CHATBOX_STORE = 'd',
}

export type ChatboxAction =
  | {
      type: Action.PUSH_ITEM;
      payload: {
        item: ChatboxItem;
      };
    }
  | {
      type: Action.PREPEND_ITEMS;
      payload: {
        items: ChatboxState['items'];
        startAtIndex: ChatboxState['startAtIndex'];
      };
    }
  | {
      type: Action.FLUCH;
    };
