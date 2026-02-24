import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { workspaceAPI } from '../api';
import { 
  GraduationCap, 
  FolderPlus, 
  LogOut, 
  ArrowLeft,
  Folder,
  Trash2,
  MoreVertical,
  Clock
} from 'lucide-react';

interface Workspace {
  id: number;
  name: string;
  owner_id: number;
  created_at?: string;
}

export default function Workspace() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    setLoading(true);
    try {
      const data = await workspaceAPI.getAll();
      setWorkspaces(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;

    setCreating(true);
    try {
      await workspaceAPI.create(newWorkspaceName);
      setNewWorkspaceName('');
      fetchWorkspaces();
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ResearchPilot</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Dashboard
              </Link>
              <Link
                to="/search"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Search
              </Link>
              <Link
                to="/chat"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                AI Chat
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Workspaces</h1>
          <p className="text-slate-400 text-lg">
            Create and manage your research workspaces
          </p>
        </div>

        {/* Create Workspace Form */}
        <div className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Create New Workspace</h2>
          <form onSubmit={handleCreateWorkspace} className="flex gap-4">
            <div className="relative flex-1">
              <FolderPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                placeholder="Enter workspace name..."
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={creating || !newWorkspaceName.trim()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {creating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <FolderPlus className="w-5 h-5" />
                  Create
                </>
              )}
            </button>
          </form>
        </div>

        {/* Workspaces Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Your Workspaces</h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : workspaces.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workspaces.map((workspace) => (
                <Link
                  key={workspace.id}
                  to={`/workspace/${workspace.id}`}
                  className="group bg-slate-800/30 border border-slate-700/30 rounded-xl p-5 hover:border-slate-600/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                      <Folder className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {workspace.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>Click to view papers</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-800/20 border border-slate-700/20 rounded-2xl">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Folder className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No Workspaces Yet</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                Create your first workspace to start organizing your research papers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

