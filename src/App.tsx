import GlobalLayout from "./components/layout/GlobalLayout";

function App() {
  return (
    <GlobalLayout>
      <p className="text-brand-primary">brand-primary 색상 테스트</p>
      <p className="bg-brand-surface text-brand-text">brand 색상 테스트</p>
    </GlobalLayout>
  )
}

export default App
