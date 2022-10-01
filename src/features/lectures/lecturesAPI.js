import { apiHandler } from "../../common/util";

const lecturesAPI = (courseId) => {
  apiHandler.defaults.baseURL = `/api/v1/courses/${courseId}/lectures`;
  return apiHandler;
};
export default lecturesAPI;
