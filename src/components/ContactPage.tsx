import { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Mail, Phone, MapPin, Send, ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';

interface ContactPageProps {
  onNavigate: (page: 'home' | 'courses' | 'about' | 'contact') => void;
}

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6 text-blue-400" />,
    title: 'Email',
    value: 'hello@eduglobe.com',
    description: 'Send us an email anytime'
  },
  {
    icon: <Phone className="w-6 h-6 text-blue-400" />,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    description: 'Mon-Fri from 8am to 6pm'
  },
  {
    icon: <MapPin className="w-6 h-6 text-blue-400" />,
    title: 'Office',
    value: 'San Francisco, CA',
    description: '123 Education Street, Suite 456'
  },
];

const faqs = [
  {
    question: 'How do I enroll in a course?',
    answer: 'Simply browse our courses, select the one you want, and click "Enroll Now". You\'ll need to create an account or sign in first.'
  },
  {
    question: 'Can I get a refund?',
    answer: 'Yes! We offer a 30-day money-back guarantee on all courses. If you\'re not satisfied, contact us for a full refund.'
  },
  {
    question: 'Do you offer certificates?',
    answer: 'Absolutely! Upon completing a course, you\'ll receive a certificate of completion that you can share on LinkedIn and your resume.'
  },
  {
    question: 'Are the courses self-paced?',
    answer: 'Most of our courses are self-paced, allowing you to learn at your own schedule. Some courses may have specific start dates.'
  },
];

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
              <button onClick={() => onNavigate('about')} className="text-gray-300 hover:text-white transition-colors">About</button>
              <button onClick={() => onNavigate('contact')} className="text-blue-400">Contact</button>
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
          <h1 className="text-white mb-4">Get In Touch</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                      className="bg-gray-800 border-gray-700 text-white resize-none"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-white mb-1">{info.title}</h3>
                      <p className="text-blue-400 mb-1">{info.value}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-white text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-center mb-12">
            Find quick answers to common questions
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12"
        >
          <h2 className="text-white mb-4">Prefer to Chat?</h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Our support team is available Monday through Friday, 8am to 6pm PST
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Start Live Chat
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
