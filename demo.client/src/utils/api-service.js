import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const ARCH_URL = process.env.VUE_APP_ARCH_URL;

export { getArchData };

function getArchData() {
//   axios
//     .get(ARCH_URL, { params: { requestid: requestID } })
//     .then((res) => {
//       console.log(res)
//       return JSON.parse(res.data.message)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
return ARCH_URL
}
