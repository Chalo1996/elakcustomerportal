import { UPDATE_USER_DETAILS } from "../redux/actions/actions";

const initialState = {
  username: "",
  country: "",
  phone: "",
  dob: null,
  email: "",
  countryCode: "",
  countryFlag: null,
};

const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS:
      console.log(state);
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
