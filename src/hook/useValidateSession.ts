import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Constant from "../constant/Constant";
import apiClient from "../util/apiClient";

const useValidateSession = () => {
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      navigate("/login");
      return;
    }

    apiClient
      .post(`${Constant.coreUrl}/session/verify`, {})
      .then(() => {
        setIsValidated(true);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("jwtToken");
        }
        navigate("/login");
      });
  }, [navigate]);

  return isValidated;
};

export default useValidateSession;