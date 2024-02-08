import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import navigationConstants from "../../navigationConstants";
import FallBackPage from "../../pages/fallBackPage/FallBackPage";
import { Suspense, useEffect } from "react";
import { RESET_AUTH_STATE } from "../../../modules/auth/redux/authSlice";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authToken) {
      dispatch(RESET_AUTH_STATE());
      return navigate(navigationConstants.LOGIN);
    }
  }, [authToken]);

  if (authToken) {
    return <Suspense fallback={<FallBackPage />}>{children}</Suspense>;
  } else {
    return <FallBackPage />;
  }
};
export default ProtectedRoutes;
