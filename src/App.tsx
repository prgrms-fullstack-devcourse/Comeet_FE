import GlobalLayout from "./components/layout/GlobalLayout";
import { BoardPage } from "./pages/Board";

function App() {
  return (
    <GlobalLayout variant="black">
      <BoardPage />
    </GlobalLayout>
  );
}

export default App;
