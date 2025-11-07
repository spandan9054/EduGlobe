import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { AuthDialog } from './components/AuthDialog';
import { CoursesPage } from './components/CoursesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Toaster } from './components/ui/sonner';

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
} | null;

type Page = 'home' | 'courses' | 'about' | 'contact' | 'dashboard';

export default function App() {
  const [user, setUser] = useState<User>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowAuth(false);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (user && currentPage === 'dashboard') {
      return <Dashboard user={user} onLogout={handleLogout} />;
    }

    switch (currentPage) {
      case 'courses':
        return <CoursesPage onNavigate={setCurrentPage} onOpenAuth={() => setShowAuth(true)} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} onOpenAuth={() => setShowAuth(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {renderPage()}
      
      <AuthDialog 
        open={showAuth} 
        onOpenChange={setShowAuth}
        onLogin={handleLogin}
      />
      
      <Toaster />
    </div>
  );
}
