import {
  UPDATE_USER_DETAILS,
  SET_QUOTATION_DATA,
  SET_LOADING,
} from "../actions/groupCreditActions";

const initialState = {
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
  isLoading: false,
  gcRate: 0.675,
  retRate: 0.775,
  discount: 70,
  freeCoverLimit: 5000000,
  quoteSubmitted: false,
  loading: false,
  quotationData: null,
};

export const groupCreditReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case SET_QUOTATION_DATA:
      console.log("QUOTATION DATA", state.quotationData);
      return {
        ...state,
        quotationData: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
