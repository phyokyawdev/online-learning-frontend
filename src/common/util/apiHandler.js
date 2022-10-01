import axios from "axios";

const client = axios.create({});

client.interceptors.response.use(
  function (res) {
    return res;
  },
  function (error) {
    console.log(error);
    const { status, data } = error.response;

    if (status === 400) {
      console.log(data);
      const validationErrors = data.errors.reduce((acc, elt) => {
        acc[elt.param] = elt.msg;
        return acc;
      }, {});

      console.log(validationErrors);
      return Promise.reject(validationErrors);
    } else {
      // toast here
      console.log("Not validation error occurred");
      return Promise.reject();
    }
  }
);

export default client;
