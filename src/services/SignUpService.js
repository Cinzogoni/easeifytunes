import API_USER from "~/Api/API_User";

function SignUpService(fullName, phoneNumber, email, password) {
  const checkUserByEmail = API_USER.find((user) => user.email === email);
  const checkUserByPhone = API_USER.find(
    (user) => user.phoneNumber === phoneNumber
  );

  if (checkUserByEmail || checkUserByPhone) {
    return false;
  }

  const newUser = {
    id: `user${API_USER.length + 1}`,
    name: fullName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
  };

  API_USER.push(newUser);

  localStorage.setItem("currentUser", JSON.stringify(newUser));

  return true;
}

export default SignUpService;
