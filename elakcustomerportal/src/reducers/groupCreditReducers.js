import { UPDATE_USER_DETAILS } from "../redux/actions/groupCreditActions";

const groupCreditformData = {
  firstname: "",
  lastname: "",
  gender: "",
  country: "",
  phone: "",
  dob: null,
  email: "",
  countryCode: "",
  countryFlag: null,
  termschecked: false,
  sumAssured: 5000000,
  termsInMonths: "",
  frequency: "Single",
  installments: 1,
  retrenchment: false,
};

export const groupCreditReducer = (state = groupCreditformData, action) => {
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
