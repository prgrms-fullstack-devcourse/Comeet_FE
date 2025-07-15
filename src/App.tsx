import { useState } from "react"
import { Button } from "./components/ui/button"

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-primary">Primary 색상 테스트</p>
      <p className="text-secondary">Secondary 색상 테스트</p>
      <Button onClick={toggleDarkMode}>
        {isDark ? '라이트 모드' : '다크 모드'}
      </Button>
    </div>
  )
}

export default App
