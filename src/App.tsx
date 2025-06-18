import { useAuth } from "./contexts/AuthContext";
import { AuthPage } from "./components/auth/AuthPage";
import { Header } from "./components/layout/Header";
import { ChatInterface } from "./components/chat/ChatInterface";

function App() {
  const { user } = useAuth();

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;
