
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Settings, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [studentName] = useState("John Doe");
  
  const attendanceHistory = [
    { course: "Computer Science 101", date: "2025-01-20", status: "Present", time: "09:00 AM" },
    { course: "Mathematics 201", date: "2025-01-20", status: "Present", time: "11:00 AM" },
    { course: "Physics 301", date: "2025-01-19", status: "Absent", time: "-" },
    { course: "Computer Science 101", date: "2025-01-19", status: "Present", time: "09:00 AM" },
    { course: "Mathematics 201", date: "2025-01-18", status: "Present", time: "11:00 AM" },
  ];

  const alerts = [
    { message: "You missed Physics 301 yesterday", type: "warning" },
    { message: "Low attendance in Physics 301 (60%)", type: "error" }
  ];

  const handleFingerprintScan = () => {
    setScanStatus('scanning');
    
    // Simulate scanning process
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      setScanStatus(success ? 'success' : 'error');
      
      setTimeout(() => {
        setScanStatus('idle');
      }, 3000);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    return status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getScanButtonText = () => {
    switch (scanStatus) {
      case 'scanning': return 'Scanning...';
      case 'success': return 'Attendance Marked!';
      case 'error': return 'Scan Failed - Try Again';
      default: return 'Scan Fingerprint';
    }
  };

  const getScanButtonColor = () => {
    switch (scanStatus) {
      case 'scanning': return 'bg-blue-500 hover:bg-blue-600';
      case 'success': return 'bg-green-500 hover:bg-green-600';
      case 'error': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-600">Welcome back, {studentName}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8 space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg flex items-center space-x-3 ${
                alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'
              }`}>
                <AlertCircle className={`w-5 h-5 ${
                  alert.type === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`} />
                <span className={`text-sm font-medium ${
                  alert.type === 'warning' ? 'text-yellow-800' : 'text-red-800'
                }`}>
                  {alert.message}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Fingerprint Scan Section */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader className="text-center">
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>
                  Place your finger on the scanner to mark your attendance
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                {/* Fingerprint Visual */}
                <div className="relative mx-auto w-32 h-32">
                  <div className={`w-full h-full rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                    scanStatus === 'scanning' ? 'border-blue-500 animate-pulse bg-blue-50' :
                    scanStatus === 'success' ? 'border-green-500 bg-green-50' :
                    scanStatus === 'error' ? 'border-red-500 bg-red-50' :
                    'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="text-6xl">
                      {scanStatus === 'success' ? '✓' : 
                       scanStatus === 'error' ? '✗' : '👆'}
                    </div>
                  </div>
                  {scanStatus === 'scanning' && (
                    <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                  )}
                </div>

                <Button 
                  onClick={handleFingerprintScan}
                  disabled={scanStatus === 'scanning'}
                  className={`w-full text-white ${getScanButtonColor()}`}
                  size="lg"
                >
                  {getScanButtonText()}
                </Button>

                <div className="text-sm text-gray-600">
                  <p>Current Session: Computer Science 101</p>
                  <p>Time: 09:00 AM - 10:30 AM</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>
                  Your recent attendance records across all courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Course</th>
                        <th className="text-left py-3 px-2">Date</th>
                        <th className="text-left py-3 px-2">Time</th>
                        <th className="text-left py-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceHistory.map((record, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2 font-medium">{record.course}</td>
                          <td className="py-3 px-2 text-gray-600">{record.date}</td>
                          <td className="py-3 px-2 text-gray-600">{record.time}</td>
                          <td className="py-3 px-2">
                            <Badge className={getStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">85%</div>
              <p className="text-sm text-gray-600">This semester</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Classes Attended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">24</div>
              <p className="text-sm text-gray-600">Out of 28 total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Perfect Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">2</div>
              <p className="text-sm text-gray-600">Courses this semester</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
