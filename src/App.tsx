import GlobalLayout from "./components/layout/GlobalLayout";
import { OnboardingPage } from "./pages/onboarding/OnboardingPage";
import { PostDetailPage } from './pages/community/PostDetailPage';

function App() {
  const path = window.location.pathname;

  let content;
  
  if (path === '/onboarding') {
    content = <OnboardingPage />;
  } else if (path.startsWith('/community/')) {
    content = <PostDetailPage />;
  } else {
    content = (
      <>
        <p className="text-brand-primary">brand-primary 색상 테스트</p>
        <p className="bg-brand-surface text-brand-text">brand 색상 테스트</p>
        <hr className="my-8 border-gray-600" />
        <div className="flex flex-col gap-y-4">
          <a href="/onboarding" className="text-lg font-bold text-lime-400 hover:underline"> 온보딩 페이지 테스트 </a>
          <a href="/community/1" className="text-lg font-bold text-lime-400 hover:underline"> 게시글 상세 페이지 테스트 </a>
        </div>
      </>
    );
  }

  return (
    <GlobalLayout>
      {content}
    </GlobalLayout>
  );
}

export default App;