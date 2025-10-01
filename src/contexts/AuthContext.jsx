import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // 🔹 Auto-login if token exists
  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  // 🔹 Fetch logged-in user profile
  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `https://tidoy-web-backend.onrender.com/api/auth/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Profile fetch failed:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login
  const login = async (email, password) => {
    const res = await fetch(
      `https://tidoy-web-backend.onrender.com/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();

    if (res.ok) {
      setToken(data.token);
      localStorage.setItem("token", data.token);

      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return { success: true };
    } else {
      return { success: false, message: data.message || "Login failed" };
    }
  };

  // 🔹 Signup
  const signup = async (email, password, confirmPassword) => {
    const res = await fetch(
      `https://tidoy-web-backend.onrender.com/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      }
    );
    const data = await res.json();

    if (res.ok) {
      return login(email, password); // auto login after signup
    } else {
      throw new Error(data.message || "Signup failed");
    }
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // 🔹 Update Profile (LOCAL ONLY)
  const updateProfile = (updates) => {
    try {
      const updatedUser = { ...user, ...updates };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return { success: true, user: updatedUser };
    } catch (err) {
      console.error("Local update failed:", err);
      return { success: false, message: "Something went wrong" };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, loading, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
