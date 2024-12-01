import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import avatar from "~/assets/images/avatar/DefaultAvatar.png";

import API_USER from "~/Api/API_User";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userName, setUserName] = useState(null);
  const [yourPlaylistName, setYourPlaylistName] = useState(null);

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [defaultAvatar, setDefaultAvatar] = useState(avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(
    currentUser?.avatar || defaultAvatar
  );

  const fetchData = useCallback(async () => {
    try {
      const userData = await API_USER.getUser();
      setUser(userData);
    } catch (error) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      selectedAvatar,
      defaultAvatar,
      setSelectedAvatar,
      setDefaultAvatar,
      user,
      error,
      userName,
      setUserName,
      yourPlaylistName,
      setYourPlaylistName,
    }),
    [
      currentUser,
      selectedAvatar,
      defaultAvatar,
      user,
      error,
      userName,
      yourPlaylistName,
    ]
  );

  if (loading) {
    return <h1 style={{ color: "var(--main--text-color)" }}>Loading...</h1>;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
