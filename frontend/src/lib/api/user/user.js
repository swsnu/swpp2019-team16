import client from "./client";

//export const list = () => client.get(`/api/user`);

export const get = id => client.get(`/api/user/${id}`);
