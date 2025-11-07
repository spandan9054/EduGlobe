import { motion } from 'motion/react';
import { Globe, BookOpen, Clock, Users, Star, ArrowLeft, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CoursesPageProps {
  onNavigate: (page: 'home' | 'courses' | 'about' | 'contact') => void;
  onOpenAuth: () => void;
}

const courses = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    description: 'Master HTML, CSS, and JavaScript to build modern websites',
    category: 'Development',
    level: 'Beginner',
    duration: '16 hours',
    students: 12500,
    rating: 4.8,
    instructor: 'Sarah Johnson',
    price: '$49.99',
    image: 'coding workspace'
  },
  {
    id: 2,
    title: 'Data Science with Python',
    description: 'Learn data analysis, visualization, and machine learning',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '20 hours',
    students: 8900,
    rating: 4.9,
    instructor: 'Dr. Michael Chen',
    price: '$79.99',
    image: 'data analysis'
  },
  {
    id: 3,
    title: 'Digital Marketing Mastery',
    description: 'Complete guide to SEO, social media, and content marketing',
    category: 'Marketing',
    level: 'Beginner',
    duration: '20 hours',
    students: 15200,
    rating: 4.7,
    instructor: 'Emma Williams',
    price: '$59.99',
    image: 'marketing strategy'
  },
  {
    id: 4,
    title: 'UI/UX Design Principles',
    description: 'Create beautiful and user-friendly digital experiences',
    category: 'Design',
    level: 'Intermediate',
    duration: '20 hours',
    students: 10300,
    rating: 4.9,
    instructor: 'Alex Turner',
    price: '$69.99',
    image: 'design workspace'
  },
  {
    id: 5,
    title: 'Mobile App Development',
    description: 'Build native iOS and Android apps with React Native',
    category: 'Development',
    level: 'Advanced',
    duration: '24 hours',
    students: 6700,
    rating: 4.8,
    instructor: 'James Rodriguez',
    price: '$89.99',
    image: 'mobile development'
  },
  {
    id: 6,
    title: 'Cloud Computing Essentials',
    description: 'Learn AWS, Azure, and cloud architecture fundamentals',
    category: 'Technology',
    level: 'Intermediate',
    duration: '18 hours',
    students: 9200,
    rating: 4.7,
    instructor: 'Lisa Anderson',
    price: '$74.99',
    image: 'cloud computing'
  },
];

export function CoursesPage({ onNavigate, onOpenAuth }: CoursesPageProps) {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate('home')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Globe className="w-8 h-8 text-blue-400" />
                <span className="text-white text-xl">EduGlobe</span>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => onNavigate('home')} className="text-gray-300 hover:text-white transition-colors">Home</button>
              <button onClick={() => onNavigate('courses')} className="text-blue-400">Courses</button>
              <button onClick={() => onNavigate('about')} className="text-gray-300 hover:text-white transition-colors">About</button>
              <button onClick={() => onNavigate('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
            </nav>
            
            <Button onClick={onOpenAuth} variant="outline" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-white mb-4">Explore Our Courses</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Choose from hundreds of courses taught by expert instructors
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search courses..."
                className="pl-10 bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList className="bg-gray-900 border border-gray-800">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="development">Development</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="data">Data Science</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} onEnroll={onOpenAuth} />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12"
        >
          <h2 className="text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on EduGlobe
          </p>
          <Button onClick={onOpenAuth} size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Get Started Today
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function CourseCard({ course, index, onEnroll }: { course: typeof courses[0]; index: number; onEnroll: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-gray-900 border-gray-800 hover:border-blue-400 transition-all group overflow-hidden">
        <div className="aspect-video bg-gray-800 overflow-hidden">
          <ImageWithFallback
            src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop`}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-0">
              {course.category}
            </Badge>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm">{course.rating}</span>
            </div>
          </div>
          <CardTitle className="text-white">{course.title}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{course.students.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm">by {course.instructor}</div>
                <div className="text-white text-xl">{course.price}</div>
              </div>
              <Button onClick={onEnroll} className="bg-blue-500 hover:bg-blue-600">
                Enroll Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
