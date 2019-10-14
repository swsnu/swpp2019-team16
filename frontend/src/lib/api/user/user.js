import client from "../client";

export function get(id){
  return client.get('/api/v1/user/' + id) ;
}

