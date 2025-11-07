import { motion } from 'motion/react';
import { Globe, Target, Users, Award, Heart, Lightbulb, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'courses' | 'about' | 'contact') => void;
}

const stats = [
  { label: 'Active Students', value: '50,000+' },
  { label: 'Expert Instructors', value: '500+' },
  { label: 'Courses Available', value: '1,200+' },
  { label: 'Countries Reached', value: '180+' },
];

const values = [
  {
    icon: <Target className="w-8 h-8 text-blue-400" />,
    title: 'Mission-Driven',
    description: 'We believe education should be accessible to everyone, everywhere.'
  },
  {
    icon: <Heart className="w-8 h-8 text-blue-400" />,
    title: 'Student-Focused',
    description: 'Every decision we make puts our learners first and foremost.'
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-blue-400" />,
    title: 'Innovation',
    description: 'We continuously improve our platform with cutting-edge technology.'
  },
  {
    icon: <Award className="w-8 h-8 text-blue-400" />,
    title: 'Excellence',
    description: 'We partner with the best instructors to deliver top-quality content.'
  },
];

const team = [
  { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'professional woman' },
  { name: 'Michael Chen', role: 'Chief Technology Officer', image: 'professional man' },
  { name: 'Emma Williams', role: 'Head of Education', image: 'professional woman' },
  { name: 'James Rodriguez', role: 'VP of Product', image: 'professional man' },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
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
              <button onClick={() => onNavigate('courses')} className="text-gray-300 hover:text-white transition-colors">Courses</button>
              <button onClick={() => onNavigate('about')} className="text-blue-400">About</button>
              <button onClick={() => onNavigate('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-white mb-4">About EduGlobe</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            We're on a mission to make quality education accessible to learners worldwide, 
            breaking down barriers and empowering individuals to reach their full potential.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="pt-6">
                <div className="text-3xl text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white mb-4">Our Story</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Founded in 2020, EduGlobe started with a simple vision: to create a platform 
                  where anyone, anywhere could access world-class education.
                </p>
                <p>
                  What began as a small project with just a handful of courses has grown into 
                  a global community of learners and educators, united by the belief that 
                  knowledge knows no boundaries.
                </p>
                <p>
                  Today, we're proud to serve students in over 180 countries, offering courses 
                  in dozens of subjects taught by industry experts and passionate educators.
                </p>
              </div>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Students learning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-white text-center mb-4">Meet Our Team</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Passionate educators and technologists working together to transform education
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 overflow-hidden group">
                <div className="aspect-square bg-gray-800 overflow-hidden">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop`}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6 text-center">
                  <h3 className="text-white mb-1">{member.name}</h3>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12"
        >
          <Users className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-white mb-4">Join Our Community</h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Be part of a global movement to make education accessible to all
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={() => onNavigate('courses')} size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Browse Courses
            </Button>
            <Button onClick={() => onNavigate('contact')} size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
