import { useDispatch, useSelector } from "react-redux";

export const useAuthContext = () => {
  const dispatch = useDispatch();
  const state = useSelector((initstate) => initstate);
  return { state: state.authState, dispatch };
};
