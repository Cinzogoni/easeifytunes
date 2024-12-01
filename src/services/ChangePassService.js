import API_USER from "~/Api/API_User";

function ChangePasswordService(currentUserId, currentPassword, newPassword) {
  const user = API_USER.find((user) => user.id === currentUserId);

  if (!user || user.password !== currentPassword) {
    return false;
  }

  user.password = newPassword;

  localStorage.setItem("currentUser", JSON.stringify(user));

  return true;
}

export default ChangePasswordService;
