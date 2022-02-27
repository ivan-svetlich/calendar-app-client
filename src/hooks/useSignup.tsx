import { useReducer } from "react";
import server, { SignupArgs } from "../api/calendarServer";
import User from "../types/User";

export type SignupState = {
  loading: boolean;
  data: User | null;
  error: string | null;
};

type ACTION =
  | { type: "LOAD"; payload: null }
  | { type: "SUCCESS"; payload: User }
  | { type: "FAILURE"; payload: string };

const initialState: SignupState = { loading: false, data: null, error: null };

function fetchItemsReducer<SignupState>(state: SignupState, action: ACTION) {
  const { type, payload } = action;

  switch (type) {
    case "LOAD":
      return { ...state, loading: true, data: null, error: null };
    case "SUCCESS":
      return { ...state, loading: false, data: payload, error: null };
    case "FAILURE":
      return { ...state, loading: false, data: null, error: payload };
    default:
      return state;
  }
}

export const useSignup = (): [
  SignupState,
  (signupRequest: SignupArgs) => Promise<void>
] => {
  const [state, dispatch] = useReducer(fetchItemsReducer, initialState);

  const signup = (signupRequest: SignupArgs) =>
    signupAsync(dispatch, signupRequest);

  return [state as SignupState, signup];
};

async function signupAsync(
  dispatch: React.Dispatch<ACTION>,
  signupRequest: SignupArgs
) {
  dispatch({ type: "LOAD", payload: null });
  try {
    await server.signup(signupRequest).then((response) => {
      dispatch({ type: "SUCCESS", payload: response.data });
    });
  } catch (error: any) {
    dispatch({ type: "FAILURE", payload: error });
  }
}

export default useSignup;
