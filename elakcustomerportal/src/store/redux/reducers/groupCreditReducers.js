import {
  UPDATE_USER_DETAILS,
  SET_QUOTATION_DATA,
  SET_LOADING,
} from "../actions/groupCreditActions";

const initialState = {
  firstname: "",
  lastname: "",
  gender: "",
  country: "Kenya",
  phone: "",
  dob: null,
  email: "",
  countryCode: "+254",
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
  numOfPartners: 0,
  partnerDates: [],
};

export const groupCreditReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS:
      console.log(state);
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case SET_QUOTATION_DATA:
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
