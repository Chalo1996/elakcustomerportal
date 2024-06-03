import { createTheme, useToken } from "@ant-design/cssinjs";
import { blue } from "@ant-design/colors";

export const customTheme = createTheme({
  token: {
    colorPrimary: blue[5], // Change the primary color to blue
  },
});

export const useCustomToken = () => useToken(customTheme);
