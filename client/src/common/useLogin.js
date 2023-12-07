import { useGoogleLogin } from "react-use-googlelogin";
// import keys from "../../../config/keys"; estaria mal sacarlo de ak ?
import keys from "../keys";

export const useLogin = () => {
  const { signIn, signOut, ...googleLoginProps } = useGoogleLogin({
    clientId: keys.googleClientId,
    persist: false,
    scope: "openid profile email",
  });

  return {
    signIn,
    signOut,
    ...googleLoginProps,
  };
};

export default useLogin;
