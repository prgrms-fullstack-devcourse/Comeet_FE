import { Outlet } from "react-router-dom";
import GlobalLayout from "./components/layout/GlobalLayout";

function App() {
  return (
    <GlobalLayout variant="black">
      <Outlet />
    </GlobalLayout>
  );
}

export default App;
