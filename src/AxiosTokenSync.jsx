import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContext";
import { setAxiosToken } from "./config/axios";

// ✅ Component để sync token từ AuthContext vào axios
function AxiosTokenSync() {
  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    setAxiosToken(accessToken, setAccessToken);
  }, [accessToken, setAccessToken]);

  return null;
}

export default AxiosTokenSync;
