import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../userpool";

// Authenticate
export const authenticate = (Username, Password) => {
  // Cognito user
  const user = new CognitoUser({
    Username,
    Pool: UserPool,
  });

  // Auth details
  const authDetails = new AuthenticationDetails({
    Username,
    Password,
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
        resolve(data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
        reject(err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // Cognito requires a new password
        reject({
          message: "newPasswordRequired",
          userAttributes,
          requiredAttributes,
          user,
        });
      },
    });
  });
};

// Logout
export const logout = () => {
  const user = UserPool.getCurrentUser();
  if (user) {
    user.signOut();
    window.location.href = "/";
  }
};
