
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Settings, Play, Square, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const LecturerDashboard = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [attendanceActive, setAttendanceActive] = useState(false);
  const [lecturerName] = useState("Dr. Sarah Johnson");

  const todaySessions = [
    { id: '1', course: 'Computer Science 101', time: '09:00 AM - 10:30 AM', room: 'Room A101', enrolled: 45 },
    { id: '2', course: 'Advanced Algorithms', time: '11:00 AM - 12:30 PM', room: 'Room B205', enrolled: 32 },
    { id: '3', course: 'Database Systems', time: '02:00 PM - 03:30 PM', room: 'Room C301', enrolled: 38 },
  ];

  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, studentId: 'ST001', name: 'John Doe', scanTime: '09:05 AM', status: 'Present' },
    { id: 2, studentId: 'ST002', name: 'Jane Smith', scanTime: '09:03 AM', status: 'Present' },
    { id: 3, studentId: 'ST003', name: 'Mike Johnson', scanTime: '09:07 AM', status: 'Present' },
    { id: 4, studentId: 'ST004', name: 'Emily Davis', scanTime: '-', status: 'Absent' },
    { id: 5, studentId: 'ST005', name: 'Chris Wilson', scanTime: '09:02 AM', status: 'Present' },
  ]);

  const handleStartAttendance = (sessionId: string) => {
    setSelectedSession(sessionId);
    setAttendanceActive(true);
    
    // Simulate new attendance records coming in
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newStudent = {
          id: Date.now(),
          studentId: `ST${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
          name: `Student ${Math.floor(Math.random() * 100)}`,
          scanTime: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }),
          status: 'Present'
        };
        
        setAttendanceRecords(prev => [newStudent, ...prev]);
      }
    }, 3000);

    // Clean up interval after 30 seconds
    setTimeout(() => {
      clearInterval(interval);
    }, 30000);
  };

  const handleStopAttendance = () => {
    setAttendanceActive(false);
  };

  const getSelectedSessionDetails = () => {
    return todaySessions.find(session => session.id === selectedSession);
  };

  const getAttendanceRate = () => {
    const presentCount = attendanceRecords.filter(record => record.status === 'Present').length;
    const totalCount = attendanceRecords.length;
    return totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100">
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
                <h1 className="text-2xl font-bold text-gray-900">Lecturer Dashboard</h1>
                <p className="text-gray-600">Welcome back, {lecturerName}!</p>
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Sessions */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Today's Sessions
                </CardTitle>
                <CardDescription>
                  Select a session to start attendance tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaySessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedSession === session.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSession(session.id)}
                  >
                    <h3 className="font-semibold text-sm">{session.course}</h3>
                    <p className="text-xs text-gray-600 mt-1">{session.time}</p>
                    <p className="text-xs text-gray-600">{session.room}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {session.enrolled} students
                      </span>
                      {selectedSession === session.id && (
                        <Badge className="bg-green-100 text-green-800">Selected</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Attendance Controls */}
            {selectedSession && (
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Control</CardTitle>
                  <CardDescription>
                    {getSelectedSessionDetails()?.course}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!attendanceActive ? (
                    <Button
                      onClick={() => handleStartAttendance(selectedSession)}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Attendance
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                        <span className="text-green-700 font-medium">Attendance Active</span>
                      </div>
                      <Button
                        onClick={handleStopAttendance}
                        variant="destructive"
                        className="w-full"
                        size="lg"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Stop Attendance
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Attendance Records */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Real-time Attendance
                    </CardTitle>
                    <CardDescription>
                      {selectedSession ? getSelectedSessionDetails()?.course : 'Select a session to view attendance'}
                    </CardDescription>
                  </div>
                  {selectedSession && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{getAttendanceRate()}%</div>
                      <div className="text-sm text-gray-600">Attendance Rate</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!selectedSession ? (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a session to view attendance records</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Student ID</th>
                          <th className="text-left py-3 px-2">Name</th>
                          <th className="text-left py-3 px-2">Scan Time</th>
                          <th className="text-left py-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceRecords.map((record) => (
                          <tr key={record.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-2 font-mono text-sm">{record.studentId}</td>
                            <td className="py-3 px-2 font-medium">{record.name}</td>
                            <td className="py-3 px-2 text-gray-600">{record.scanTime}</td>
                            <td className="py-3 px-2">
                              <Badge className={
                                record.status === 'Present' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }>
                                {record.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Class Performance Summary */}
            {selectedSession && (
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Students Present</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {attendanceRecords.filter(r => r.status === 'Present').length}
                    </div>
                    <p className="text-sm text-gray-600">Out of {attendanceRecords.length}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Late Arrivals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">3</div>
                    <p className="text-sm text-gray-600">After 09:05 AM</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Session Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-blue-600">
                      {attendanceActive ? 'Active' : 'Inactive'}
                    </div>
                    <p className="text-sm text-gray-600">
                      {attendanceActive ? 'Tracking attendance' : 'Waiting to start'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
