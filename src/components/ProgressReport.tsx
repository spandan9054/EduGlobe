import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const weeklyData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 4.1 },
  { day: 'Fri', hours: 2.9 },
  { day: 'Sat', hours: 5.5 },
  { day: 'Sun', hours: 3.8 },
];

const progressData = [
  { month: 'Jan', courses: 1 },
  { month: 'Feb', courses: 2 },
  { month: 'Mar', courses: 2 },
  { month: 'Apr', courses: 3 },
  { month: 'May', courses: 4 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

interface ProgressReportProps {
  courses: Array<{
    id: number;
    name: string;
    progress: number;
    hours: number;
    totalHours: number;
  }>;
}

export function ProgressReport({ courses }: ProgressReportProps) {
  const categoryData = courses.map((course, index) => ({
    name: course.name.split(' ')[0],
    value: course.progress,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Weekly Activity</CardTitle>
            <CardDescription>Hours spent learning this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="hours" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Distribution */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Course Progress</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Learning Trend */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Learning Trend</CardTitle>
          <CardDescription>Your progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="courses" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Achievements</CardTitle>
          <CardDescription>Your latest milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Achievement 
              title="Fast Learner"
              description="Completed 5 hours of learning in a single day"
              date="2 days ago"
              icon="⚡"
            />
            <Achievement 
              title="Consistency Champion"
              description="Maintained a 7-day learning streak"
              date="1 week ago"
              icon="🔥"
            />
            <Achievement 
              title="Course Completer"
              description="Finished Digital Marketing course"
              date="2 weeks ago"
              icon="🎓"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Achievement({ title, description, date, icon }: { title: string; description: string; date: string; icon: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div className="text-3xl">{icon}</div>
      <div className="flex-1">
        <div className="text-white mb-1">{title}</div>
        <div className="text-sm text-gray-400">{description}</div>
        <div className="text-xs text-gray-500 mt-1">{date}</div>
      </div>
    </div>
  );
}
