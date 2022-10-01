import axios from "axios";
import { addErrorHandler } from "../../common/util";

const apiClient = axios.create({
  baseURL: `/api/v1/courses`,
});

export default addErrorHandler(apiClient);

/**
 * {"errors":[{"value":[],"msg":"Invalid value","param":"tags","location":"body"}]}
 */
