'use client';

import { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Plus, Edit, Trash2, Filter, Calendar } from 'lucide-react';
import 'animate.css';

const TaskManagementTasks = () => {
  // Task state
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete UI Design', status: 'Completed', priority: 'High', dueDate: '2025-06-20' },
    { id: 2, title: 'Backend API Integration', status: 'In Progress', priority: 'Medium', dueDate: '2025-06-22' },
    { id: 3, title: 'Test Payment Module', status: 'Pending', priority: 'Low', dueDate: '2025-06-25' },
  ]);

  // Modal and filter states
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Medium', dueDate: '' });
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');

  // Task summary
  const taskSummary = {
    Completed: tasks.filter((task) => task.status === 'Completed').length,
    'In Progress': tasks.filter((task) => task.status === 'In Progress').length,
    Pending: tasks.filter((task) => task.status === 'Pending').length,
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => (filterStatus === 'All' ? true : task.status === filterStatus))
    .filter((task) => (filterPriority === 'All' ? true : task.priority === filterPriority))
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

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

  // Handle Edit Task
  const handleEditTask = (e) => {
    e.preventDefault();
    if (currentTask.title && currentTask.dueDate) {
      setTasks(
        tasks.map((task) =>
          task.id === currentTask.id
            ? { ...task, title: currentTask.title, priority: currentTask.priority, dueDate: currentTask.dueDate }
            : task
        )
      );
      setCurrentTask(null);
      setIsEditTaskModalOpen(false);
    }
  };

  // Handle Delete Task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6 animate__animated animate__fadeIn">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Tasks</h1>
          <p className="text-xs sm:text-sm text-gray-500">View and manage all your tasks</p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 animate__animated animate__fadeInUp animate__delay-1s">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-teal-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-teal-400 text-gray-800 text-xs sm:text-sm"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-teal-500" />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="p-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-teal-400 text-gray-800 text-xs sm:text-sm"
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-teal-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-teal-400 text-gray-800 text-xs sm:text-sm"
              >
                <option value="dueDate">Sort by Due Date</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded-md"
          >
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        </div>

        {/* Task Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 animate__animated animate__fadeInUp animate__delay-2s">
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="sm:w-5 sm:h-5 text-teal-500" />
              <h2 className="text-sm sm:text-lg font-medium text-gray-800">Completed</h2>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{taskSummary.Completed}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="sm:w-5 sm:h-5 text-yellow-500" />
              <h2 className="text-sm sm:text-lg font-medium text-gray-800">In Progress</h2>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{taskSummary['In Progress']}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertCircle size={16} className="sm:w-5 sm:h-5 text-red-500" />
              <h2 className="text-sm sm:text-lg font-medium text-gray-800">Pending</h2>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{taskSummary.Pending}</p>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 animate__animated animate__fadeInUp animate__delay-3s">
          <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">All Tasks</h2>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs sm:text-sm text-gray-600 border-b border-gray-200">
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Priority</th>
                  <th className="py-2 px-4">Due Date</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="text-xs sm:text-sm border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{task.title}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          task.status === 'Completed'
                            ? 'bg-teal-100 text-teal-800'
                            : task.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{task.priority}</td>
                    <td className="py-3 px-4">{task.dueDate}</td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button
                        onClick={() => {
                          setCurrentTask(task);
                          setIsEditTaskModalOpen(true);
                        }}
                        className="p-1 text-gray-500 hover:text-teal-500"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
              >
                <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
                <p className="text-xs text-gray-500">
                  Status: <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      task.status === 'Completed'
                        ? 'bg-teal-100 text-teal-800'
                        : task.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
                <p className="text-xs text-gray-500">Priority: {task.priority}</p>
                <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => {
                      setCurrentTask(task);
                      setIsEditTaskModalOpen(true);
                    }}
                    className="p-2 text-gray-500 hover:text-teal-500"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
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

        {/* Edit Task Modal */}
        {isEditTaskModalOpen && currentTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate__animated animate__fadeIn">
            <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Edit Task</h2>
                <button onClick={() => setIsEditTaskModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleEditTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Task Title</label>
                  <input
                    type="text"
                    value={currentTask.title}
                    onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                    className="w-full p-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-teal-400 text-gray-800"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={currentTask.priority}
                    onChange={(e) => setCurrentTask({ ...currentTask, priority: e.target.value })}
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
                    value={currentTask.dueDate}
                    onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
                    className="w-full p-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-teal-400 text-gray-800"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditTaskModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagementTasks;