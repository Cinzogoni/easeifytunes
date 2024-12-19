import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isAddPlaylistItem, setIsAddPlaylistItem] = useState(false);

  //Login
  const openLoginModal = useCallback(() => setIsLoginOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginOpen(false), []);
  //Sign Up
  const openSignUpModal = useCallback(() => setIsSignUpOpen(true), []);
  const closeSignUpModal = useCallback(() => setIsSignUpOpen(false), []);
  //Forgot password
  const openForgotPasswordModal = useCallback(
    () => setIsForgotPasswordOpen(true),
    []
  );
  const closeForgotPasswordModal = useCallback(
    () => setIsForgotPasswordOpen(false),
    []
  );
  //Change password
  const openChangePasswordModal = useCallback(
    () => setIsChangePassword(true),
    []
  );
  const closeChangePasswordModal = useCallback(
    () => setIsChangePassword(false),
    []
  );
  //YourPlaylist
  const openAddPlaylistItemModal = useCallback(
    () => setIsAddPlaylistItem(true),
    []
  );
  const closeAddPlaylistItemModal = useCallback(
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
      openLoginModal,
      closeLoginModal,
      openSignUpModal,
      closeSignUpModal,
      openForgotPasswordModal,
      closeForgotPasswordModal,
      openChangePasswordModal,
      closeChangePasswordModal,
      openAddPlaylistItemModal,
      closeAddPlaylistItemModal,
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
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
