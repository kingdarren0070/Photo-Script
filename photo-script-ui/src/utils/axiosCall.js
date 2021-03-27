import axios from 'axios';

export function axiosCall(requestType, path, values) {
  return axios({
    method: requestType,
    url: path,
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors'
    },
    data: values
  });
}