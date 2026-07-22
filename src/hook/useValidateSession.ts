import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Constant from "../constant/Constant";

const useValidateSession = () => {
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      navigate("/login");
      return;
    }

    axios
      .post(`${Constant.coreUrl}/session/verify`, {}, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
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