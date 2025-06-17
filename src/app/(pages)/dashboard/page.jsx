'use client';

import { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Plus, Edit, Trash2, BarChart2, X } from 'lucide-react';
import 'animate.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TaskManagementDashboard = () => {
  // Task state
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete UI Design', status: 'Completed', priority: 'High', dueDate: '2025-06-20' },
    { id: 2, title: 'Backend API Integration', status: 'In Progress', priority: 'Medium', dueDate: '2025-06-22' },
    { id: 3, title: 'Test Payment Module', status: 'Pending', priority: 'Low', dueDate: '2025-06-25' },
  ]);

  // Modal and report states
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Medium', dueDate: '' });

  // Chart data
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [5, 8, 12, 10, 15],
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20, 184, 166, 0.3)',
        pointBackgroundColor: '#14b8a6',
        pointBorderColor: '#fff',
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1f2937',
          font: { size: 12, family: 'Inter, sans-serif' },
        },
      },
      title: {
        display: true,
        text: 'Task Completion Trend',
        color: '#1f2937',
        font: { size: 16, family: 'Inter, sans-serif' },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#14b8a6',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: '#1f2937', font: { size: 11 } },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#1f2937', font: { size: 11 } },
        grid: { color: 'rgba(31, 41, 55, 0.1)' },
        beginAtZero: true,
      },
    },
  };

  // Handle Add Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title && newTask.dueDate) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: newTask.title,
          status: 'Pending',
          priority: newTask.priority,
          dueDate: newTask.dueDate,
        },
      ]);
      setNewTask({ title: '', priority: 'Medium', dueDate: '' });
      setIsAddTaskModalOpen(false);
    }
  };

  // Task status summary for report
  const taskSummary = {
    Completed: tasks.filter((task) => task.status === 'Completed').length,
    'In Progress': tasks.filter((task) => task.status === 'In Progress').length,
    Pending: tasks.filter((task) => task.status === 'Pending').length,
  };

  // Quick actions
  const quickActions = [
    { name: 'Add Task', icon: Plus, action: () => setIsAddTaskModalOpen(true) },
    { name: 'View Reports', icon: BarChart2, action: () => setIsReportOpen(true) },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        {/* Dashboard Header */}
        <div className="mb-4 sm:mb-6 animate__animated animate__fadeIn">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-500">Manage your tasks efficiently</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 animate__animated animate__fadeInUp animate__delay-1s">
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="sm:w-5 sm:h-5 text-teal-500" />
              <h2 className="text-sm sm:text-lg font-medium text-gray-800">Completed</h2>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{taskSummary.Completed}</p>
            <p className="text-xs sm:text-sm text-gray-500">Tasks completed this week</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="sm:w-5 sm:h-5 text-yellow-500" />
              <h2 className="text-sm sm:text-lg font-medium text-gray-800">In Progress</h2>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{taskSummary['In Progress']}</p>
            <p className="text-xs sm:text-sm text-gray-500">Tasks currently active</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertCircle size={16} className="sm:w-5 sm:h-5 text-red-500" />
              <h2 className="text-sm sm:text-lg font-medium text-gray-800">Pending</h2>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{taskSummary.Pending}</p>
            <p className="text-xs sm:text-sm text-gray-500">Tasks awaiting action</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Task List */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 animate__animated animate__fadeInLeft animate__delay-2s">
            <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Recent Tasks</h2>
            <div className="space-y-3 sm:space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-sm sm:text-base font-medium text-gray-800">{task.title}</h3>
                    <p className="text-xs text-gray-500">
                      {task.status} • Priority: {task.priority} • Due: {task.dueDate}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-teal-500 transition-colors duration-200">
                      <Edit size={14} className="sm:w-4 sm:h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200">
                      <Trash2 size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Quick Actions and Chart */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 animate__animated animate__fadeInRight animate__delay-2s">
              <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Quick Actions</h2>
              <div className="space-y-2 sm:space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center space-x-2 p-2 text-xs sm:text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-500 rounded-md transition-all duration-200"
                  >
                    <action.icon size={14} className="sm:w-4 sm:h-4" />
                    <span>{action.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Task Progress Chart */}
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 animate__animated animate__fadeInRight animate__delay-2s">
              <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4 flex items-center space-x-2">
                <BarChart2 size={18} className="text-teal-500" />
                <span>Progress Trend</span>
              </h2>
              <div className="relative h-48 sm:h-64 w-full">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Add Task Modal */}
        {isAddTaskModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate__animated animate__fadeIn">
            <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Add New Task</h2>
                <button onClick={() => setIsAddTaskModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full p-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-teal-400 text-gray-800"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full p-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-teal-400 text-gray-800"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full p-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-teal-400 text-gray-800"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddTaskModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded-md"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Report Section */}
        {isReportOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate__animated animate__fadeIn sm:pt-16">
            <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-3xl mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Task Report</h2>
                <button onClick={() => setIsReportOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-800">Task Status Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-teal-500" />
                      <span className="text-sm font-medium text-gray-800">Completed</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{taskSummary.Completed}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-yellow-500" />
                      <span className="text-sm font-medium text-gray-800">In Progress</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{taskSummary['In Progress']}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <AlertCircle size={16} className="text-red-500" />
                      <span className="text-sm font-medium text-gray-800">Pending</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{taskSummary.Pending}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsReportOpen(false)}
                    className="px-4 py-2 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagementDashboard;