import authHandler from "authHandler";
import { NonAuthRoutes } from "constants";
import useVerifyUserEmail from "hooks/data/onboarding/useVerifyUserEmail";
import React, { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useAuthContext } from "redux/auth";
import { loginUser } from "redux/auth/authSlice";

function VerifyUser() {
  const ref = useRef();
  const { email } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useVerifyUserEmail(email);
  const {
    dispatch,
    state: { isSignedIn },
  } = useAuthContext();

  useEffect(() => {
    if (data) {
      if (isSignedIn) {
        authHandler.setUserInfo(data.data.user);
        dispatch(
          loginUser({
            ...data.data.user,
            isSignedIn: true,
          })
        );
        navigate(NonAuthRoutes.home);
      } else {
        navigate(NonAuthRoutes.login);
      }
    }
    // for the top loading bar
    ref?.current?.continuousStart();
  }, [data]);
  return (
    <div className="h-full overflow-hidden">
      <LoadingBar color="#590BA9" ref={ref} shadow height={4} />
      <div className="h-[100vh - 10px] mt-3 bg-purple-100 blur" />
    </div>
  );
}

export default VerifyUser;
