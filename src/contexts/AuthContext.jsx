import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // 🖤 Wishlist state
  // grouped wishlist: { [groupName]: [propertyIds] }
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : {};
  });

  // 🔹 Auto-login if token exists
  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

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
        if (data.user?.wishlist) setWishlist(data.user.wishlist);
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
        setWishlist(data.user.wishlist || {});
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
    setWishlist({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("wishlist");
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

  // 🔹 Fetch Wishlist
  const fetchWishlist = async (userId) => {
    if (!userId || !token) return;

    try {
      const res = await fetch(
        `https://tidoy-web-backend.onrender.com/api/users/${userId}/wishlist`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      if (res.ok) setWishlist(data.wishlist || {});
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  // 🔁 Toggle Wishlist
  // Add property to wishlist under a group
  const addPropertyToWishlist = (groupName, propertyId) => {
    setWishlist((prev) => {
      const group = prev[groupName] || [];
      if (!group.includes(propertyId)) {
        return { ...prev, [groupName]: [...group, propertyId] };
      }
      return prev;
    });
  };

  // Remove property from wishlist
  const removePropertyFromWishlist = (groupName, propertyId) => {
    setWishlist((prev) => {
      const updatedGroup =
        prev[groupName]?.filter((id) => id !== propertyId) || [];
      const updatedWishlist = { ...prev, [groupName]: updatedGroup };
      if (updatedGroup.length === 0) delete updatedWishlist[groupName];
      return updatedWishlist;
    });
  };

  const isPropertyLiked = (propertyId) => {
    return Object.values(wishlist).some((ids) => ids.includes(propertyId));
  };

  // ✅ Provide everything needed
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        wishlist,
        login,
        signup,
        logout,
        loading,
        updateProfile,
        fetchWishlist,
        addPropertyToWishlist,
        removePropertyFromWishlist,
        isPropertyLiked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
