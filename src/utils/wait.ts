const wait = (timeoutMS: number) => new Promise((res) => setTimeout(res, timeoutMS));

export default wait;
