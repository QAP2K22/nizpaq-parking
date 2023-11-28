let userPermissionLevel = null;

export const authenticateUser = (userLevel) => {
    userPermissionLevel = userLevel || "default"; 
};

export const getUserPermissionLevel = () => {
  return userPermissionLevel || "default";
};

export const UserIsAdmin = () => {
  return userPermissionLevel == "Admin" ? true : false
}