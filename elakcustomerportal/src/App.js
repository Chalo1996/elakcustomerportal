import "./index.css";
import { ThemeProvider } from "./store/theme-context";

import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
