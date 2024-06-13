import { UPDATE_USER_DETAILS } from "../redux/actions/groupCreditActions";

const gcInitialState = {
  username: "",
  country: "",
  phone: "",
  dob: null,
  email: "",
  countryCode: "",
  countryFlag: null,
};

export const groupCreditReducer = (state = gcInitialState, action) => {
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
