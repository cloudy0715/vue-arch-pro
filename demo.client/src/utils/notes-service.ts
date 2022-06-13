import axios from "axios";
import {getAccessToken} from "@/utils/auth-service";

const BASE_URL = "http://localhost:8000";

export { getPublicNotes, getPrivateNotes, getData };

function getPublicNotes() {
  const url = `${BASE_URL}/api/public-notes`;
  return axios.get(url)
    .then((response) => {
      return response.data;
    });
}

function getData() {
  const url = "https://3qgd653iwxosnngnisli7ybxrq0xqqgt.lambda-url.us-west-2.on.aws/?requestid=87bb2a0c-29eb-4acf-b1e7-ff5ce3b0a935";
  return axios.get(url)
    .then((response) => {
      return response.data;
    });
}

function getPrivateNotes() {
  const url = `${BASE_URL}/api/private-notes`;
  return axios.get(
    url,
    { headers:
        { Authorization: `Bearer ${getAccessToken()}` }
    }).then((response) => {
    return response.data;
  });
}
