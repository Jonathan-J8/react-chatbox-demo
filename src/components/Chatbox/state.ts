import { ChatboxAction, ChatboxState, Action } from './type';

export const initState = (): ChatboxState => ({ items: [], startAtIndex: 0 });

// TODO : order items by date. If not, new item can prepend previous item
export const reducer = (state: ChatboxState, action: ChatboxAction): ChatboxState => {
  const { type } = action;
  const { items } = state;

  switch (type) {
    case Action.PUSH_ITEM:
      return { ...state, items: [...items, action.payload.item] };

    case Action.PREPEND_ITEMS:
      const uniq: any = {};
      const arr = [...action.payload.items, ...items];
      const itemsFiltered = arr.filter((obj) => !uniq[obj.id] && (uniq[obj.id] = true));
      return {
        ...state,
        items: itemsFiltered,
        startAtIndex: action.payload.startAtIndex,
      };

    case Action.INIT_DEFAULT_STATE:
      return initState();

    default:
      throw new Error(`Chatbox : action.type "${type}" not handle`);
  }
};
