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

    try {
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        localStorage.removeItem("jwtToken");
        navigate("/login");
        return;
      }
    } catch {
      localStorage.removeItem("jwtToken");
      navigate("/login");
      return;
    }

    axios
      .get(`${Constant.coreUrl}/session/verify`, {
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