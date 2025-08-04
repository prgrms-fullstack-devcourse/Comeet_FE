import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalLayout from "./components/layout/GlobalLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalLayout>
        <Outlet />
      </GlobalLayout>
    </QueryClientProvider>
  );
}

export default App;
