import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { papersAPI, workspaceAPI } from '../api';
import { 
  GraduationCap, 
  LogOut, 
  ArrowLeft,
  FileText,
  ExternalLink,
  Clock,
  User,
  Trash2,
  BookOpen,
  MessageSquare,
  Upload
} from 'lucide-react';

interface Paper {
  id: number;
  title: string;
  abstract: string;
  authors?: string;
  year?: number;
  citations?: number;
  url?: string;
  workspace_id: number;
}

interface Workspace {
  id: number;
  name: string;
}

export default function WorkspaceDetail() {
  const { id } = useParams<{ id: string }>();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [selectedPapers, setSelectedPapers] = useState<Set<number>>(new Set());
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchWorkspaceAndPapers();
    }
  }, [id]);

  const fetchWorkspaceAndPapers = async () => {
    setLoading(true);
    try {
      // Fetch workspace details
      const workspaces = await workspaceAPI.getAll();
      const currentWorkspace = workspaces.find((w: Workspace) => w.id === Number(id));
      setWorkspace(currentWorkspace || null);

      // Fetch papers in this workspace
      const papersData = await papersAPI.getByWorkspace(Number(id));
      setPapers(papersData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePaper = async (paperId: number) => {
    if (!confirm('Are you sure you want to remove this paper from the workspace?')) {
      return;
    }

    setDeleting(paperId);
    try {
      await papersAPI.delete(paperId);
      setPapers(papers.filter(p => p.id !== paperId));
      setSelectedPapers(prev => {
        const newSet = new Set(prev);
        newSet.delete(paperId);
        return newSet;
      });
    } catch (err) {
      console.error(err);
      alert('Failed to delete paper');
    } finally {
      setDeleting(null);
    }
  };

  const togglePaperSelection = (paperId: number) => {
    setSelectedPapers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(paperId)) {
        newSet.delete(paperId);
      } else {
        newSet.add(paperId);
      }
      return newSet;
    });
  };

  const selectAllPapers = () => {
    if (selectedPapers.size === papers.length) {
      setSelectedPapers(new Set());
    } else {
      setSelectedPapers(new Set(papers.map(p => p.id)));
    }
  };

  const handleUploadToChatbot = () => {
    if (selectedPapers.size === 0) {
      alert('Please select at least one paper to upload to the chatbot');
      return;
    }

    // Navigate to chat with workspace context
    navigate(`/chat?workspace=${id}`);
  };

  const handleLogout = () => {
    setToken(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Workspace not found</h2>
          <Link to="/workspace" className="text-cyan-400 hover:text-cyan-300">
            Back to Workspaces
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/workspace"
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
                Search Papers
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
        {/* Workspace Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{workspace.name}</h1>
              <p className="text-slate-400 text-lg">
                {papers.length} {papers.length === 1 ? 'paper' : 'papers'} in this workspace
              </p>
            </div>
            {papers.length > 0 && (
              <button
                onClick={handleUploadToChatbot}
                disabled={selectedPapers.size === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title={selectedPapers.size === 0 ? "Select papers to chat with AI" : `Chat with ${selectedPapers.size} selected paper${selectedPapers.size > 1 ? 's' : ''}`}
              >
                <MessageSquare className="w-5 h-5" />
                Upload to Chatbot ({selectedPapers.size})
              </button>
            )}
          </div>
          {papers.length > 0 && (
            <button
              onClick={selectAllPapers}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {selectedPapers.size === papers.length ? 'Deselect All' : 'Select All'}
            </button>
          )}
        </div>

        {/* Papers List */}
        {papers.length > 0 ? (
          <div className="space-y-4">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className={`bg-slate-800/30 border rounded-xl p-6 transition-all cursor-pointer ${
                  selectedPapers.has(paper.id)
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-slate-700/30 hover:border-slate-600/50'
                }`}
                onClick={() => togglePaperSelection(paper.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedPapers.has(paper.id)}
                      onChange={() => togglePaperSelection(paper.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900 cursor-pointer"
                    />
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {paper.title || 'Untitled Paper'}
                    </h3>
                    {paper.authors && (
                      <p className="text-sm text-slate-400 mb-2">
                        <User className="w-3 h-3 inline mr-1" />
                        {paper.authors}
                      </p>
                    )}
                    {paper.abstract && (
                      <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                        {paper.abstract}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        Research Paper
                      </span>
                      {paper.year && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {paper.year}
                        </span>
                      )}
                      {paper.citations !== undefined && (
                        <span>{paper.citations} citations</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    {paper.url && (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open Paper
                      </a>
                    )}
                    <button
                      onClick={() => handleDeletePaper(paper.id)}
                      disabled={deleting === paper.id}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                      title="Remove from workspace"
                    >
                      {deleting === paper.id ? (
                        <div className="w-5 h-5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-800/20 border border-slate-700/20 rounded-2xl">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No Papers Yet</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-6">
              Search for papers and import them to this workspace to get started.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-xl transition-all"
            >
              Search Papers
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
