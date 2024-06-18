import axios from "axios";
import token from "../../../components/GroupCredit/Token/chaloToken";
import { notification } from "antd";

export const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
export const SET_QUOTATION_DATA = "SET_QUOTATION_DATA";
export const SET_LOADING = "SET_LOADING";

const url = "https://sisos-eu.azurewebsites.net/api/cmd";

export const updateUserDetails = (field, value) => ({
  type: UPDATE_USER_DETAILS,
  payload: { field, value },
});

export const setQuotationData = (data) => ({
  type: SET_QUOTATION_DATA,
  payload: data,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const generateQuotation = (contextData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      url,
      {
        cmd: "ExeChain",
        data: {
          chain: "M3TrainingGroupCreditFixedRating",
          context: JSON.stringify(contextData),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { ok, msg, outData } = response.data;

    if (!ok) {
      notification.error({ message: msg });
    } else {
      dispatch(setQuotationData(outData));
      console.log(outData);
      notification.success({ message: "Quotation generated successfully." });
    }
  } catch (error) {
    notification.error({
      message: "An error occurred while processing the quote.",
    });
  } finally {
    dispatch(setLoading(false));
  }
};
