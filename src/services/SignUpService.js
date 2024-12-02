import API_USER from "~/Api/API_User";

function SignUpService(fullName, phoneNumber, email, password) {
  const user = API_USER.getUser();

  console.log(user);

  const checkUserByEmail = user.find((user) => user.email === email);
  const checkUserByPhone = user.find(
    (user) => user.phoneNumber === phoneNumber
  );

  if (checkUserByEmail || checkUserByPhone) {
    return false;
  }

  const newUser = {
    id: `user${user.length + 1}`,
    avatar: "",
    userName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
    emailVerification: false,
    phoneNumberVerification: false,
    passwordRecoveryCode: "",
    recentTrack: [
      {
        recentId: "",
        recentLink: "",
        recentTitle: "",
        recentPerformer: "",
      },
    ],
    yourPlaylist: [
      { yourPlaylistName: "", yourPlaylistDescription: "", audioTracks: [] },
    ],
  };

  user.push(newUser);

  localStorage.setItem("currentUser", JSON.stringify(newUser));

  return true;
}

export default SignUpService;
