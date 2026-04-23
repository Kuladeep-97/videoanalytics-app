import { createContext, useContext, useEffect, useState } from "react";

import { request } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("wmvf_token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  const refreshUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await request("/auth/me");
      setUser(data.user);
    } catch (_error) {
      localStorage.removeItem("wmvf_token");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, [token]);

  const saveAuth = (payload) => {
    localStorage.setItem("wmvf_token", payload.token);
    setToken(payload.token);
    setUser(payload.user);
  };

  const logout = () => {
    localStorage.removeItem("wmvf_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, saveAuth, logout, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
