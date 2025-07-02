
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { 
  Code, 
  Palette, 
  Globe, 
  TrendingUp, 
  Menu, 
  X, 
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
  Mail,
  Sparkles,
  Rocket,
  Target
} from 'lucide-react';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(sectionId);
          }
        }
      });

      // Animate elements on scroll
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace these with your actual EmailJS credentials
      // You'll need to set these up at https://www.emailjs.com/
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Vistaar Bengaluru'
      };

      await emailjs.send(
        'service_m4cf17q', // Replace with your EmailJS service ID
        'template_qnb56jn', // Replace with your EmailJS template ID
        templateParams,
        'mDZYh-1mvAFKRzCzi' // Replace with your EmailJS public key
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-charcoal flex items-center gap-3">
              <img 
                src="https://i.ibb.co/DgHQLGKm/Frame-1.png" 
                alt="Vistaar Bengaluru Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Services', 'About', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    activeSection === item.toLowerCase() 
                      ? 'text-saffron' 
                      : 'text-charcoal hover:text-saffron'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron to-orange-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'Services', 'About', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-charcoal hover:text-saffron hover:bg-saffron/5 rounded-lg transition-all duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-saffron/20 to-orange-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-up">
            <Badge variant="outline" className="mb-8 border-saffron/30 text-saffron bg-saffron/5 backdrop-blur-sm px-4 py-2 text-sm font-medium">
              <Rocket className="w-4 h-4 mr-2" />
              Digital Studio Based in Bengaluru
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal mb-8 leading-tight">
              Built in Bengaluru.<br />
              <span className="text-transparent bg-gradient-to-r from-saffron via-orange-500 to-red-500 bg-clip-text animate-pulse">
                Designed for the World.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              We design, develop, and grow your digital presence — from stunning websites 
              to smart marketing strategies that <span className="text-saffron font-medium">drive real results</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-saffron to-orange-500 hover:from-saffron/90 hover:to-orange-500/90 text-black font-semibold px-10 py-4 text-lg shadow-lg shadow-saffron/25 hover:shadow-xl hover:shadow-saffron/30 transition-all duration-300 transform hover:scale-105"
                onClick={() => scrollToSection('contact')}
              >
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-saffron/30 text-saffron hover:bg-saffron hover:text-black px-10 py-4 text-lg backdrop-blur-sm bg-white/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => scrollToSection('portfolio')}
              >
                View Our Work
                <Target className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20 animate-on-scroll">
            <Badge variant="outline" className="mb-6 border-blue-200 text-blue-600 bg-blue-50">
              <Zap className="w-4 h-4 mr-2" />
              Our Expertise
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive digital services to help your business thrive in the digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Code className="h-10 w-10 text-blue-600" />,
                title: "Website & App Development",
                description: "Clean, responsive websites and scalable web apps using modern technologies.",
                color: "blue",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Palette className="h-10 w-10 text-purple-600" />,
                title: "UI/UX Design",
                description: "Wireframes, design systems, and interactive prototypes built in Figma and Framer.",
                color: "purple",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Globe className="h-10 w-10 text-green-600" />,
                title: "Domain & Hosting Setup",
                description: "End-to-end domain configuration and hosting support (GoDaddy, Firebase, Hostinger).",
                color: "green",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <TrendingUp className="h-10 w-10 text-saffron" />,
                title: "Digital Marketing",
                description: "SEO, Google Ads, social media management, and brand strategy to grow your online presence.",
                color: "orange",
                gradient: "from-saffron to-orange-500"
              }
            ].map((service, index) => (
              <Card key={index} className="animate-on-scroll hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden group bg-white/70 backdrop-blur-sm hover:bg-white hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-6 p-4 bg-gradient-to-br ${service.gradient} rounded-2xl w-fit shadow-lg shadow-${service.color}-200/50 group-hover:shadow-xl group-hover:shadow-${service.color}-300/50 transition-all duration-300`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-charcoal group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-charcoal group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 via-orange-50/30 to-white"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <Badge variant="outline" className="mb-6 border-saffron/30 text-saffron bg-saffron/5">
                <Users className="w-4 h-4 mr-2" />
                About Us
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-charcoal mb-8">
                Who We Are
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Vistaar Bengaluru is a creative-led digital studio helping startups and small 
                businesses scale through impactful design, powerful development, and result-driven 
                marketing. Based in India's tech capital, we work with brands across the globe.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-saffron/10">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-saffron to-orange-500 bg-clip-text">50+</div>
                  <div className="text-sm text-gray-600 font-medium">Projects Done</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-saffron/10">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-saffron to-orange-500 bg-clip-text">25+</div>
                  <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-saffron/10">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-saffron to-orange-500 bg-clip-text">2+</div>
                  <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-saffron/10 to-orange-100/50 p-8 rounded-2xl backdrop-blur-sm border border-saffron/10 hover:shadow-lg hover:shadow-saffron/10 transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-saffron to-orange-400 rounded-xl w-fit mb-4 shadow-lg">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-charcoal text-lg">Fast Delivery</h3>
                    <p className="text-gray-600">Quick turnaround times</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50/50 p-8 rounded-2xl backdrop-blur-sm border border-blue-100 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl w-fit mb-4 shadow-lg">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-charcoal text-lg">Expert Team</h3>
                    <p className="text-gray-600">Skilled professionals</p>
                  </div>
                </div>
                <div className="space-y-6 mt-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 p-8 rounded-2xl backdrop-blur-sm border border-green-100 hover:shadow-lg hover:shadow-green-100 transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl w-fit mb-4 shadow-lg">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-charcoal text-lg">Quality Work</h3>
                    <p className="text-gray-600">Premium solutions</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50/50 p-8 rounded-2xl backdrop-blur-sm border border-purple-100 hover:shadow-lg hover:shadow-purple-100 transition-all duration-300">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl w-fit mb-4 shadow-lg">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-charcoal text-lg">5-Star Reviews</h3>
                    <p className="text-gray-600">Client satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-on-scroll">
            <Badge variant="outline" className="mb-6 border-purple-200 text-purple-600 bg-purple-50">
              <Sparkles className="w-4 h-4 mr-2" />
              Portfolio
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              Our Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Showcasing some of our recent projects that helped businesses grow their digital presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Landing Page for Fashion Brand",
                description: "Modern e-commerce landing page with seamless user experience and conversion optimization.",
                image: "https://pasteimg.com/images/2025/07/02/fashion.png",
                tags: ["Web Design", "E-commerce", "UI/UX"],
                gradient: "from-pink-500 to-rose-500"
              },
              {
                title: "App UI for Finance Startup",
                description: "Clean and intuitive mobile app interface for a fintech startup with focus on user security.",
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
                tags: ["Mobile App", "Fintech", "UI Design"],
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "WordPress Site for Local Business",
                description: "Professional business website with integrated booking system and local SEO optimization.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
                tags: ["WordPress", "SEO", "Business"],
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((project, index) => (
              <Card key={index} className="animate-on-scroll hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden group bg-white hover:scale-105">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full">
                      <ArrowRight className="w-4 h-4 text-charcoal" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-charcoal group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-charcoal group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-gradient-to-r from-saffron/10 to-orange-100/50 text-saffron border-0 backdrop-blur-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 via-orange-50/30 to-white"></div>
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-20 animate-on-scroll">
            <Badge variant="outline" className="mb-6 border-saffron/30 text-saffron bg-saffron/5">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600">
              Ready to start your digital transformation? Get in touch with us today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="animate-on-scroll">
              <h3 className="text-2xl font-bold text-charcoal mb-8">Get a Free Quote</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name" 
                    className="border-gray-200 focus:border-saffron focus:ring-saffron bg-white/50 backdrop-blur-sm h-12 text-lg"
                    required
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email" 
                    className="border-gray-200 focus:border-saffron focus:ring-saffron bg-white/50 backdrop-blur-sm h-12 text-lg"
                    required
                  />
                </div>
                <div>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project..." 
                    rows={6}
                    className="border-gray-200 focus:border-saffron focus:ring-saffron bg-white/50 backdrop-blur-sm text-lg"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-saffron to-orange-500 hover:from-saffron/90 hover:to-orange-500/90 text-black font-bold text-lg h-14 shadow-lg shadow-saffron/25 hover:shadow-xl hover:shadow-saffron/30 transition-all duration-300"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>
            </div>

            <div className="animate-on-scroll">
              <h3 className="text-2xl font-bold text-charcoal mb-8">Other Ways to Connect</h3>
              <div className="space-y-6">
                <a 
                  href="mailto:hello@vistaarbengaluru.in"
                  className="flex items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-gradient-to-r hover:from-saffron/10 hover:to-orange-100/50 transition-all duration-300 group border border-saffron/10 hover:shadow-lg hover:shadow-saffron/10"
                >
                  <div className="p-4 bg-gradient-to-br from-saffron to-orange-400 rounded-2xl mr-6 group-hover:shadow-lg transition-all duration-300">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-lg">Email</div>
                    <div className="text-gray-600">vistaarbengaluru@gmail.com</div>
                  </div>
                </a>
                
                <a 
                  href="https://wa.me/+919449271752"
                  className="flex items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50/50 transition-all duration-300 group border border-green-100 hover:shadow-lg hover:shadow-green-100"
                >
                  <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mr-6 group-hover:shadow-lg transition-all duration-300">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.079.549 4.090 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.682 1.444 6.621 0 11.987-5.367 11.987-11.987C23.973 5.367 18.637.001 12.017.001zm5.484 16.105c-.24.679-1.19 1.239-1.95 1.400-.760.161-1.77.072-2.85-.45-1.198-.619-2.131-1.129-3.368-2.367-1.238-1.238-1.748-2.17-2.367-3.368-.522-1.08-.611-2.09-.45-2.85.161-.76.721-1.71 1.4-1.95.194-.069.4-.16.625-.16.225 0 .431.091.625.16.194.069.4.275.625.625s.431.656.625 1.05c.194.394.275.625.275.625s.081.231-.275.625c-.356.394-.625.625-.625.625s-.231.356-.625.75c-.394.394-.625.625-.625.625s-.231.356.275.85c.506.494.85.625.85.625s.356.231.85-.275c.494-.506.625-.85.625-.85s.231-.356.625-.75c.394-.394.625-.625.625-.625z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-lg">WhatsApp</div>
                    <div className="text-gray-600">Quick support & consultation</div>
                  </div>
                </a>

                <a 
                  href="https://linkedin.com/company/vistaar-bengaluru"
                  className="flex items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50/50 transition-all duration-300 group border border-blue-100 hover:shadow-lg hover:shadow-blue-100"
                >
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mr-6 group-hover:shadow-lg transition-all duration-300">
                    <LinkedIn className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-lg">LinkedIn</div>
                    <div className="text-gray-600">Connect professionally</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-charcoal via-gray-900 to-black text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-saffron/10 to-orange-300/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="font-bold text-2xl mb-6 flex items-center gap-3">
                <img 
                  src="https://i.ibb.co/SXC2cYcX/Frame-1-1.png" 
                  alt="Vistaar Bengaluru Logo" 
                  className="h-16 w-auto object-contain "
                />
                <h3 style={{ color: '#DE712B' }}>Vistaar Bengaluru</h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Building digital experiences that drive growth and success for businesses worldwide.
              </p>
              <p className="text-gray-400">
                Vijayanagar Bengaluru-560040,India.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">Services</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-saffron transition-colors cursor-pointer">Web Development</li>
                <li className="hover:text-saffron transition-colors cursor-pointer">UI/UX Design</li>
                <li className="hover:text-saffron transition-colors cursor-pointer">Digital Marketing</li>
                <li className="hover:text-saffron transition-colors cursor-pointer">Domain & Hosting</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-300">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-saffron transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-saffron transition-colors">Portfolio</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-saffron transition-colors">Contact</button></li>
                <li className="hover:text-saffron transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Vistaar Bengaluru. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// LinkedIn icon component
const LinkedIn = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default Index;
