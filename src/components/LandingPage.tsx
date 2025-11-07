import { motion } from 'motion/react';
import { Globe, BookOpen, Users, Award, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { EarthCanvas } from './EarthCanvas';

const quotes = [
  "Education is the most powerful weapon which you can use to change the world.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Education is not preparation for life; education is life itself.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever."
];

interface LandingPageProps {
  onNavigate: (page: 'home' | 'courses' | 'about' | 'contact') => void;
  onOpenAuth: () => void;
}

export function LandingPage({ onNavigate, onOpenAuth }: LandingPageProps) {
  const currentQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="absolute top-0 left-0 right-0 z-50 px-6 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-8 h-8 text-blue-400" />
            <span className="text-white text-xl">EduGlobe</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate('courses')} className="text-gray-300 hover:text-white transition-colors">Courses</button>
            <button onClick={() => onNavigate('about')} className="text-gray-300 hover:text-white transition-colors">About</button>
            <button onClick={() => onNavigate('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
          </nav>
          
          <Button onClick={onOpenAuth} variant="outline" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
            Sign In
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* 3D Earth Background */}
        <div className="absolute inset-0 z-0">
          <EarthCanvas />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/50 to-gray-950/80 z-10" />
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white mb-6"
            >
              Expand Your Knowledge,
              <br />
              <span className="text-blue-400">Transform Your World</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-xl mb-8 italic border-l-4 border-blue-400 pl-6 py-2"
            >
              "{currentQuote}"
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                onClick={onOpenAuth}
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                onClick={() => onNavigate('courses')}
                size="lg" 
                variant="outline"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Explore Courses
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-20 bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <FeatureCard 
              icon={<BookOpen className="w-12 h-12 text-blue-400" />}
              title="Expert-Led Courses"
              description="Learn from industry professionals and experienced educators"
            />
            <FeatureCard 
              icon={<Users className="w-12 h-12 text-blue-400" />}
              title="Global Community"
              description="Connect with students and teachers from around the world"
            />
            <FeatureCard 
              icon={<Award className="w-12 h-12 text-blue-400" />}
              title="Track Progress"
              description="Monitor your learning journey with detailed analytics"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gray-800 p-8 rounded-lg border border-gray-700"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
