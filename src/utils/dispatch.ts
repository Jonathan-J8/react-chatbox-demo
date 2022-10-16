const dispatch = (event: string, payload?: CustomEventInit) => {
  return dispatchEvent(new CustomEvent(event, { bubbles: true, ...payload }));
};
export default dispatch;
