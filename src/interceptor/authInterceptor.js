import axios from "axios";

import { useHistory } from "react-router-dom";
import { ADMIN_API } from "src/utils/constants";

const AxiosInterceptor = () => {
  const history = useHistory();

  axios.interceptors.request.use(
    (config) => {
      const { url } = config;
      const authToken = localStorage.getItem("auth-token");

      // Specify the paths where you want the interceptor to run
      const pathsToExclude = [ADMIN_API.LOGIN];

      if (authToken && !pathsToExclude.includes(url)) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
      } else if (!authToken && !pathsToExclude.includes(url)) {
        history.push("/admin/sign_in");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return null;
};

export default AxiosInterceptor;
