import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  Settings, 
  LogOut,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProgressReport } from './ProgressReport';

interface DashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  onLogout: () => void;
}

const mockCourses = [
  { id: 1, name: 'Web Development Fundamentals', progress: 75, hours: 12, totalHours: 16 },
  { id: 2, name: 'Data Science with Python', progress: 45, hours: 9, totalHours: 20 },
  { id: 3, name: 'Digital Marketing', progress: 90, hours: 18, totalHours: 20 },
  { id: 4, name: 'UI/UX Design Principles', progress: 30, hours: 6, totalHours: 20 },
];

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-white">EduGlobe</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right mr-3">
                <div className="text-white text-sm">{user.name}</div>
                <div className="text-gray-400 text-xs">{user.email}</div>
              </div>
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onLogout}
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-white mb-2">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-400 mb-8">Continue your learning journey</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-blue-500">
              <TrendingUp className="w-4 h-4 mr-2" />
              Progress Report
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-blue-500">
              <BookOpen className="w-4 h-4 mr-2" />
              My Courses
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-blue-500">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <StatCard
                icon={<BookOpen className="w-6 h-6 text-blue-400" />}
                label="Active Courses"
                value="4"
                change="+2 this month"
              />
              <StatCard
                icon={<Clock className="w-6 h-6 text-green-400" />}
                label="Hours Learned"
                value="45"
                change="+12 this week"
              />
              <StatCard
                icon={<Award className="w-6 h-6 text-yellow-400" />}
                label="Certificates"
                value="2"
                change="1 pending"
              />
            </div>

            {/* Current Courses */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <ProgressReport courses={mockCourses} />
          </TabsContent>

          <TabsContent value="courses">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">All Courses</CardTitle>
                <CardDescription>Your enrolled courses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCourses.map((course) => (
                  <CourseCard key={course.id} course={course} detailed />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-gray-800">
                  <div>
                    <div className="text-white">Email Notifications</div>
                    <div className="text-sm text-gray-400">Receive updates about your courses</div>
                  </div>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 text-white">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-gray-800">
                  <div>
                    <div className="text-white">Privacy Settings</div>
                    <div className="text-sm text-gray-400">Control your data and visibility</div>
                  </div>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 text-white">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div>
                    <div className="text-white">Connected Accounts</div>
                    <div className="text-sm text-gray-400">Link your social accounts</div>
                  </div>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 text-white">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change }: { icon: React.ReactNode; label: string; value: string; change: string }) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gray-800 rounded-lg">
            {icon}
          </div>
          <Target className="w-4 h-4 text-gray-600" />
        </div>
        <div className="text-3xl text-white mb-1">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
        <div className="text-xs text-green-400 mt-2">{change}</div>
      </CardContent>
    </Card>
  );
}

function CourseCard({ course, detailed = false }: { course: typeof mockCourses[0]; detailed?: boolean }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-6 h-6 text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white mb-1">{course.name}</div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{course.hours}h / {course.totalHours}h</span>
          {detailed && <span>•</span>}
          {detailed && <span>{course.progress}% complete</span>}
        </div>
        <Progress value={course.progress} className="mt-2 h-2" />
      </div>
      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
        Continue
      </Button>
    </div>
  );
}
