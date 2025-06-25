
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const dashboards = [
    {
      title: "Student Dashboard",
      description: "Mark attendance with fingerprint scanning and view attendance history",
      icon: UserCheck,
      path: "/student",
      color: "bg-blue-50 hover:bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Lecturer Dashboard", 
      description: "Manage sessions, start attendance, and monitor student participation",
      icon: Users,
      path: "/lecturer",
      color: "bg-green-50 hover:bg-green-100", 
      iconColor: "text-green-600"
    },
    {
      title: "Admin Dashboard",
      description: "Manage users, view system stats, and control system settings",
      icon: Settings,
      path: "/admin",
      color: "bg-purple-50 hover:bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SmartPresence</h1>
              <p className="text-gray-600 mt-1">Intelligent Attendance Management System</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">System Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Next-Generation Attendance Tracking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline attendance management with fingerprint biometrics, real-time monitoring, 
            and comprehensive analytics for educational institutions.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {dashboards.map((dashboard) => (
            <Link key={dashboard.title} to={dashboard.path}>
              <Card className={`transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer ${dashboard.color}`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${dashboard.color.replace('50', '100').replace('hover:bg-', 'bg-')} mb-4`}>
                    <dashboard.icon className={`w-8 h-8 ${dashboard.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl">{dashboard.title}</CardTitle>
                  <CardDescription className="text-base">
                    {dashboard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full">
                    Access Dashboard
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Key Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Fingerprint Authentication</h4>
              <p className="text-sm text-gray-600">Secure biometric attendance marking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Real-time Monitoring</h4>
              <p className="text-sm text-gray-600">Live attendance tracking and updates</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Admin Control</h4>
              <p className="text-sm text-gray-600">Comprehensive system management</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">Multi-platform</h4>
              <p className="text-sm text-gray-600">Desktop, tablet, and mobile support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
