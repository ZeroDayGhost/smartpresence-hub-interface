
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, UserCheck, Settings, Activity, AlertCircle, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [adminName] = useState("Admin User");

  const systemStats = {
    totalUsers: 1247,
    totalStudents: 1089,
    totalLecturers: 158,
    sessionsToday: 45,
    attendanceRate: 87,
    systemUptime: "99.9%"
  };

  const recentUsers = [
    { id: 1, name: "John Doe", type: "Student", status: "Active", joinDate: "2025-01-20" },
    { id: 2, name: "Dr. Smith", type: "Lecturer", status: "Active", joinDate: "2025-01-19" },
    { id: 3, name: "Jane Wilson", type: "Student", status: "Inactive", joinDate: "2025-01-18" },
    { id: 4, name: "Prof. Johnson", type: "Lecturer", status: "Active", joinDate: "2025-01-17" },
    { id: 5, name: "Mike Brown", type: "Student", status: "Active", joinDate: "2025-01-16" },
  ];

  const auditLogs = [
    { id: 1, action: "User Login", user: "john.doe@university.edu", timestamp: "2025-01-20 14:30:15", ip: "192.168.1.100" },
    { id: 2, action: "Attendance Marked", user: "dr.smith@university.edu", timestamp: "2025-01-20 14:25:42", ip: "192.168.1.101" },
    { id: 3, action: "User Created", user: "admin@university.edu", timestamp: "2025-01-20 14:20:33", ip: "192.168.1.102" },
    { id: 4, action: "System Settings Updated", user: "admin@university.edu", timestamp: "2025-01-20 14:15:28", ip: "192.168.1.102" },
    { id: 5, action: "Session Started", user: "prof.johnson@university.edu", timestamp: "2025-01-20 14:10:17", ip: "192.168.1.103" },
  ];

  const scheduleData = [
    { course: "Computer Science 101", lecturer: "Dr. Smith", room: "A101", time: "09:00-10:30", students: 45 },
    { course: "Mathematics 201", lecturer: "Prof. Johnson", room: "B205", students: 38 },
    { course: "Physics 301", lecturer: "Dr. Wilson", room: "C301", time: "11:00-12:30", students: 32 },
    { course: "Chemistry 101", lecturer: "Prof. Davis", room: "D401", time: "14:00-15:30", students: 41 },
  ];

  const getUserTypeColor = (type: string) => {
    return type === 'Student' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  const getUserStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-100">
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
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">System Administration Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">
                <Activity className="w-3 h-3 mr-1" />
                System Online
              </Badge>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                {adminName}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{systemStats.totalUsers.toLocaleString()}</div>
              <p className="text-sm text-gray-600">
                {systemStats.totalStudents} Students, {systemStats.totalLecturers} Lecturers
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-green-600" />
                Sessions Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{systemStats.sessionsToday}</div>
              <p className="text-sm text-gray-600">Active attendance tracking</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                Attendance Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{systemStats.attendanceRate}%</div>
              <p className="text-sm text-gray-600">Overall average</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Settings className="w-5 h-5 mr-2 text-orange-600" />
                System Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{systemStats.systemUptime}</div>
              <p className="text-sm text-gray-600">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="system">System Control</TabsTrigger>
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage students and lecturers in the system</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Name</th>
                        <th className="text-left py-3 px-2">Type</th>
                        <th className="text-left py-3 px-2">Status</th>
                        <th className="text-left py-3 px-2">Join Date</th>
                        <th className="text-left py-3 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2 font-medium">{user.name}</td>
                          <td className="py-3 px-2">
                            <Badge className={getUserTypeColor(user.type)}>
                              {user.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-2">
                            <Badge className={getUserStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 text-gray-600">{user.joinDate}</td>
                          <td className="py-3 px-2">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Management */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Master Schedule</CardTitle>
                    <CardDescription>Manage course schedules and room assignments</CardDescription>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Session
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Course</th>
                        <th className="text-left py-3 px-2">Lecturer</th>
                        <th className="text-left py-3 px-2">Room</th>
                        <th className="text-left py-3 px-2">Time</th>
                        <th className="text-left py-3 px-2">Students</th>
                        <th className="text-left py-3 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleData.map((session, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2 font-medium">{session.course}</td>
                          <td className="py-3 px-2">{session.lecturer}</td>
                          <td className="py-3 px-2">{session.room}</td>
                          <td className="py-3 px-2">{session.time}</td>
                          <td className="py-3 px-2">{session.students}</td>
                          <td className="py-3 px-2">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Control */}
          <TabsContent value="system">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    General Settings
                  </Button>
                  <Button className="w-full justify-start">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Attendance Settings
                  </Button>
                  <Button className="w-full justify-start">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Notification Settings
                  </Button>
                  <Button className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    System Health
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert System</CardTitle>
                  <CardDescription>Manage email and SMS notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="font-medium text-yellow-800">3 Low Attendance Alerts</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">Students with attendance below 70%</p>
                  </div>
                  
                  <Button className="w-full">Configure Alert Rules</Button>
                  <Button variant="outline" className="w-full">Send Test Notification</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Audit Logs */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>System activity logs and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Action</th>
                        <th className="text-left py-3 px-2">User</th>
                        <th className="text-left py-3 px-2">Timestamp</th>
                        <th className="text-left py-3 px-2">IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2 font-medium">{log.action}</td>
                          <td className="py-3 px-2 font-mono text-sm">{log.user}</td>
                          <td className="py-3 px-2 text-gray-600">{log.timestamp}</td>
                          <td className="py-3 px-2 text-gray-600">{log.ip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
