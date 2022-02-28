import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server, { LoginArgs } from "../../api/calendarServer";
import { setCookie } from "../../services/cookies/cookies";
import User from "../../types/User";
import { setMessage } from "./messageSlice";

export interface UserState {
  loading: boolean;
  data: User | null;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
};

export const login = createAsyncThunk<
  User,
  LoginArgs,
  {
    rejectValue: string;
  }
>("user/login", async (args, thunkAPI) => {
  try {
    const response = await server.login(args);
    setCookie({ name: "id_token", value: response.data.token, days: 7 });
    const user: User = {
      username: response.data.username,
      email: response.data.email,
    };
    return user;
  } catch (error: any) {

    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, { payload }) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload ? action.payload : null;
    });
    builder.addDefaultCase((state, action) => state);
  },
});

export const LOGOUT = "logout";

export const logout = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};

export default userSlice.reducer;
