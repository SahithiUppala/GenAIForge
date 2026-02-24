import { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../App';
import { chatAPI, papersAPI, workspaceAPI } from '../api';
import { 
  GraduationCap, 
  LogOut, 
  ArrowLeft,
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  FileText,
  CheckCircle
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Paper {
  id: number;
  title: string;
  abstract: string;
}

interface Workspace {
  id: number;
  name: string;
}

export default function Chat() {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspace');
  
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loadingContext, setLoadingContext] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (workspaceId) {
      loadWorkspaceContext();
    } else {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: 'Hello! I\'m your AI research assistant powered by Groq Llama 3.3. You can ask me to summarize papers, compare research, or answer questions about your imported papers. How can I help you today?'
        }
      ]);
    }
  }, [workspaceId]);

  const loadWorkspaceContext = async () => {
    setLoadingContext(true);
    try {
      // Fetch workspace details
      const workspaces = await workspaceAPI.getAll();
      const currentWorkspace = workspaces.find((w: Workspace) => w.id === Number(workspaceId));
      setWorkspace(currentWorkspace || null);

      // Fetch papers in this workspace
      const papersData = await papersAPI.getByWorkspace(Number(workspaceId));
      setPapers(papersData || []);

      // Set initial message with context
      const paperTitles = papersData.map((p: Paper) => `- ${p.title}`).join('\n');
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `Hello! I've loaded ${papersData.length} paper${papersData.length > 1 ? 's' : ''} from the "${currentWorkspace?.name}" workspace:\n\n${paperTitles}\n\nI can help you analyze these papers, compare findings, summarize content, or answer specific questions. What would you like to know?`
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: 'Sorry, I had trouble loading the workspace papers. Please try again.'
        }
      ]);
    } finally {
      setLoadingContext(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(
        input.trim(), 
        workspaceId ? Number(workspaceId) : undefined
      );
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your AI research assistant powered by Groq Llama 3.3. You can ask me to summarize papers, compare research, or answer questions about your imported papers. How can I help you today?'
      }
    ]);
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
                to="/workspace"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Workspaces
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

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800/30 border-r border-slate-700/30 p-4 hidden md:block overflow-y-auto">
          <div className="flex items-center gap-2 text-cyan-400 mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Powered by</span>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
            <p className="text-white font-medium mb-1">Groq Llama 3.3</p>
            <p className="text-slate-400 text-xs">70B Versatile Model</p>
          </div>

          {/* Workspace Context */}
          {workspace && papers.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Context Loaded</span>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-3 mb-3">
                <p className="text-white text-sm font-medium mb-1">{workspace.name}</p>
                <p className="text-slate-400 text-xs">{papers.length} papers loaded</p>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {papers.map((paper) => (
                  <div key={paper.id} className="bg-slate-800/30 rounded-lg p-2">
                    <div className="flex items-start gap-2">
                      <FileText className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-300 text-xs line-clamp-2">{paper.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleClearChat}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear Chat
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`max-w-[70%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block px-5 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-slate-800/50 border border-slate-700/30 text-slate-200'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-slate-800/50 border border-slate-700/30 rounded-2xl px-5 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-700/30">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about your research..."
                  className="w-full px-6 py-4 pr-14 bg-slate-800/50 border border-slate-700/30 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

