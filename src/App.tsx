import { Outlet, useLocation } from "react-router-dom";
import GlobalLayout from "./components/layout/GlobalLayout";

function App() {
  const location = useLocation();

  const layoutGroups = {
    full: ["/", "/board", "/explore", "/my"], // header + bottom nav
    headerOnly: ["/developer", "/community", "/onboarding"], // only header
    none: ["/login", "/search"], // no header and bottom nav
  };

  const currentPath = location.pathname;

  // no header and bottom nav
  if (layoutGroups.none.some((path) => currentPath.startsWith(path))) {
    return (
      <GlobalLayout showHeader={false} showBottomNavigation={false}>
        <Outlet />
      </GlobalLayout>
    );
  }

  // only header
  if (layoutGroups.headerOnly.some((path) => currentPath.startsWith(path))) {
    return (
      <GlobalLayout showBottomNavigation={false}>
        <Outlet />
      </GlobalLayout>
    );
  }

  // basic(header + bommon nav)
  return (
    <GlobalLayout>
      <Outlet />
    </GlobalLayout>
  );
}

export default App;
