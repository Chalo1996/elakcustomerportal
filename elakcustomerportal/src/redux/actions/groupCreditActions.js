export const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";

export const updateUserDetails = (field, value) => ({
  type: UPDATE_USER_DETAILS,
  payload: { field, value },
});
