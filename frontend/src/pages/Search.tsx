import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { papersAPI, workspaceAPI } from '../api';
import { 
  GraduationCap, 
  Search as SearchIcon, 
  LogOut, 
  ArrowLeft,
  FileText,
  BookOpen,
  ExternalLink,
  Clock,
  User,
  Download,
  Check
} from 'lucide-react';

interface Paper {
  title: string;
  abstract: string;
  authors?: string;
  year?: number;
  citations?: number;
  url?: string;
  has_pdf?: boolean;
}

interface Workspace {
  id: number;
  name: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [importingIndex, setImportingIndex] = useState<number | null>(null);
  const [importedPapers, setImportedPapers] = useState<Set<number>>(new Set());
  const [selectedWorkspace, setSelectedWorkspace] = useState<number | null>(null);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const data = await workspaceAPI.getAll();
      setWorkspaces(data || []);
      if (data && data.length > 0) {
        setSelectedWorkspace(data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    setImportedPapers(new Set());
    try {
      const data = await papersAPI.search(query);
      setPapers(data.papers || []);
    } catch (err) {
      console.error(err);
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImportPaper = async (paper: Paper, index: number) => {
    if (!selectedWorkspace) {
      alert('Please select a workspace first');
      return;
    }

    setImportingIndex(index);
    try {
      await papersAPI.import({
        title: paper.title,
        abstract: paper.abstract,
        authors: paper.authors,
        year: paper.year,
        citations: paper.citations,
        url: paper.url,
        workspace_id: selectedWorkspace
      });
      
      setImportedPapers(prev => new Set(prev).add(index));
      setTimeout(() => {
        setImportingIndex(null);
      }, 1000);
    } catch (err) {
      console.error(err);
      alert('Failed to import paper');
      setImportingIndex(null);
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
                to="/workspace"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Workspaces
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
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Search Academic Papers
          </h1>
          <p className="text-slate-400 text-lg">
            Find research papers from Semantic Scholar's database
          </p>
        </div>

        {/* Workspace Selector */}
        {workspaces.length > 0 && (
          <div className="mb-6 max-w-3xl mx-auto">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Import papers to:
            </label>
            <select
              value={selectedWorkspace || ''}
              onChange={(e) => setSelectedWorkspace(Number(e.target.value))}
              className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              {workspaces.map((ws) => (
                <option key={ws.id} value={ws.id}>
                  {ws.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative max-w-3xl mx-auto">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for papers by keyword, title, or author..."
              className="w-full pl-16 pr-6 py-5 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-lg"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {/* Results */}
        {searched && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">
                {loading ? 'Searching...' : `${papers.length} Results Found`}
              </h2>
            </div>

            {papers.length > 0 ? (
              <div className="space-y-4">
                {papers.map((paper, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 hover:border-slate-600/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
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
                            Semantic Scholar
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
                      <div className="flex gap-2 flex-shrink-0">
                        {paper.url && (
                          <a
                            href={paper.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2"
                            title={paper.has_pdf ? "Open PDF" : "View on Semantic Scholar"}
                          >
                            <ExternalLink className="w-4 h-4" />
                            {paper.has_pdf ? 'Open PDF' : 'View Paper'}
                          </a>
                        )}
                        <button
                          onClick={() => handleImportPaper(paper, index)}
                          disabled={importingIndex === index || importedPapers.has(index)}
                          className={`p-2 rounded-lg transition-colors ${
                            importedPapers.has(index)
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                          } disabled:opacity-50`}
                          title={importedPapers.has(index) ? "Imported" : "Import to workspace"}
                        >
                          {importingIndex === index ? (
                            <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                          ) : importedPapers.has(index) ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Download className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-slate-400">No papers found. Try a different search term.</p>
              </div>
            ) : null}
          </div>
        )}

        {/* Initial State */}
        {!searched && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Start Searching</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Enter keywords, paper titles, or author names to find relevant academic papers from our database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

