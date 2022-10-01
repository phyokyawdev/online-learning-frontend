export const addErrorHandler = (apiClient) => {
  apiClient.interceptors.response.use(
    function (res) {
      return res;
    },
    function (error) {
      const { status, data } = error.response;

      if (status === 400) {
        console.log(data.errors);
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

  return apiClient;
};
