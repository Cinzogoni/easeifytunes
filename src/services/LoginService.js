function LoginService(
  emailOrPhone,
  password,
  users,
  setEmailOrPhoneError,
  setPasswordError,
  setCurrentUser
) {
  const matchedUser = users.find(
    (user) => emailOrPhone === user.email || emailOrPhone === user.phoneNumber
  );

  //True
  const isEmailOrPhoneValid = Boolean(matchedUser !== undefined);
  //True
  const isPasswordValid = Boolean(
    matchedUser !== undefined && matchedUser.password === password
  );

  // console.log("matchedUser:", matchedUser);
  // console.log("isEmailOrPhoneValid:", isEmailOrPhoneValid);
  // console.log("isPasswordValid:", isPasswordValid);

  if (isEmailOrPhoneValid && isPasswordValid) {
    setEmailOrPhoneError(false);
    setPasswordError(false);
    setCurrentUser(matchedUser);
    return { isValid: true };
  }

  if (isEmailOrPhoneValid && !isPasswordValid) {
    setEmailOrPhoneError(false);
    setPasswordError(true);

    // console.log("isEmailOrPhoneValid && !isPasswordValid");
    return { isValid: false };
  }

  if (!isEmailOrPhoneValid && isPasswordValid) {
    setEmailOrPhoneError(true);
    setPasswordError(false);
    // console.log("!isEmailOrPhoneValid && isPasswordValid");
    return { isValid: false };
  }

  if (!isEmailOrPhoneValid && !isPasswordValid) {
    setEmailOrPhoneError(true);
    setPasswordError(true);
    // console.log("!isEmailOrPhoneValid && !isPasswordValid");
    return { isValid: false };
  }
  return { isValid: false };
}

export default LoginService;
