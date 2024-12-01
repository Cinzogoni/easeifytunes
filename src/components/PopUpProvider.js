import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const PopUpContext = createContext();

export function PopUpProvider({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isAddPlaylistItem, setIsAddPlaylistItem] = useState(false);

  //Login
  const openLoginPopUp = useCallback(() => setIsLoginOpen(true), []);
  const closeLoginPopUp = useCallback(() => setIsLoginOpen(false), []);
  //Sign Up
  const openSignUpPopUp = useCallback(() => setIsSignUpOpen(true), []);
  const closeSignUpPopUp = useCallback(() => setIsSignUpOpen(false), []);
  //Forgot password
  const openForgotPasswordPopUp = useCallback(
    () => setIsForgotPasswordOpen(true),
    []
  );
  const closeForgotPasswordPopUp = useCallback(
    () => setIsForgotPasswordOpen(false),
    []
  );
  //Change password
  const openChangePasswordPopUp = useCallback(
    () => setIsChangePassword(true),
    []
  );
  const closeChangePasswordPopUp = useCallback(
    () => setIsChangePassword(false),
    []
  );
  //YourPlaylist
  const openAddPlaylistItemPopUp = useCallback(
    () => setIsAddPlaylistItem(true),
    []
  );
  const closeAddPlaylistItemPopUp = useCallback(
    () => setIsAddPlaylistItem(false),
    []
  );

  const value = useMemo(
    () => ({
      isLoginOpen,
      isSignUpOpen,
      isForgotPasswordOpen,
      isChangePassword,
      isAddPlaylistItem,
      openLoginPopUp,
      closeLoginPopUp,
      openSignUpPopUp,
      closeSignUpPopUp,
      openForgotPasswordPopUp,
      closeForgotPasswordPopUp,
      openChangePasswordPopUp,
      closeChangePasswordPopUp,
      openAddPlaylistItemPopUp,
      closeAddPlaylistItemPopUp,
    }),
    [
      isLoginOpen,
      isSignUpOpen,
      isForgotPasswordOpen,
      isChangePassword,
      isAddPlaylistItem,
    ]
  );
  return (
    <PopUpContext.Provider value={value}>{children}</PopUpContext.Provider>
  );
}

export function usePopUp() {
  return useContext(PopUpContext);
}
