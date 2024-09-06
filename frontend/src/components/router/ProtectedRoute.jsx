import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../api";
import { REFRESH_TOKEN, ACCCESS_TOKEN } from "../../constants";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, SetIsAuthorized] = useState(null);

  useEffect(() => {
    auth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (!refreshToken) {
      SetIsAuthorized(false);
      return;
    }

    try {
      const response = await api.post("/token/refresh/", {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCCESS_TOKEN, response.data.access);
        SetIsAuthorized(true);
      } else {
        SetIsAuthorized(false);
      }
    } catch (error) {
      SetIsAuthorized(false);
    }
  };

  const auth = async () => {
    const accessToken = localStorage.getItem(ACCCESS_TOKEN);

    if (!accessToken) {
      SetIsAuthorized(false);
      return;
    }

    try {
      const { exp } = jwtDecode(accessToken);
      if (exp * 1000 < Date.now()) {
        await refreshToken();
      } else {
        SetIsAuthorized(true);
      }
    } catch (error) {
      SetIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return <>{isAuthorized ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
