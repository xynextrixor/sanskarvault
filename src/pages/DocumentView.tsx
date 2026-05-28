import {
  Menu,
  Search,
  Sun,
  List,
  Copy,
  Edit,
  MoreHorizontal,
  Send,
  Bot,
  Sparkles,
  Download,
  MessageSquare,
  FileText
} from "lucide-react";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface DocumentViewProps {
  onNavigate: (route: string) => void;
}

export default function DocumentView({ onNavigate }: DocumentViewProps) {
  const [chatInput, setChatInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'document' | 'chat'>('document');
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { pdfUrl, pdfName } = location.state || {};

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<"gemini" | "deepseek">("gemini");

  useEffect(() => {
    // Automatically trigger AI explanation on open
    if (pdfUrl && messages.length === 0) {
      const initialMessages = [
        { role: 'user', content: `Can you review this document (${pdfName || "attached"}) and provide a concise summary or analysis?` }
      ];
      setMessages(initialMessages);
      askAI(initialMessages, selectedModel, pdfUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfUrl, pdfName]);

  const askAI = async (newMessages: {role: string, content: string}[], modelPreference: "gemini" | "deepseek", attachPdfUrl?: string) => {
    setIsLoading(true);
    try {
      const endpoint = modelPreference === "deepseek" ? "/api/deepseek/chat" : "/api/gemini/chat";
      // Deepseek doesn't natively parse our pdf urls yet but it will still receive the text question.
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages, pdfUrl: modelPreference === "gemini" ? attachPdfUrl : undefined })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Network response was not ok");
      }
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: error.message || "Sorry, I had trouble communicating with the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplain = () => {
    setIsMenuOpen(false);
    const newMessages = [
      ...messages,
      { role: 'user', content: `Can you explain the main points and summary of this document (${pdfName}) in a simple way?` }
    ];
    setMessages(newMessages);
    if (isMobile) {
      setViewMode('chat');
    }
    askAI(newMessages, selectedModel, pdfUrl);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() || isLoading) return;
    const newMessages = [...messages, { role: 'user', content: chatInput }];
    setMessages(newMessages);
    setChatInput('');
    askAI(newMessages, selectedModel, pdfUrl);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-73px)] bg-surface-container-lowest">
      {/* Top Header */}
      <header className="h-16 border-b border-outline-variant flex items-center justify-between px-4 shrink-0 bg-surface">
        <div className="flex items-center gap-4">
          <Menu
            className="w-5 h-5 text-on-surface-variant cursor-pointer"
            onClick={() => onNavigate("explore")}
          />
          <div
            className="flex flex-col cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <span className="font-display font-bold uppercase tracking-tight text-lg leading-tight">
              SanskarVault
            </span>
            <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest">
              AI Studio
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="SEARCH"
              className="pl-9 pr-4 py-1.5 rounded-md bg-surface-container-low border border-transparent focus:border-outline font-mono text-[11px] uppercase tracking-widest focus:outline-none w-48 transition-all"
            />
          </div>
          <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-sm cursor-pointer ml-2">
            A
          </div>
        </div>
      </header>

      {/* View Toggle Tabs (Always visible, clean, high-contrast) */}
      <div className="flex justify-center border-b border-outline-variant/30 bg-surface p-3 shrink-0">
        <div className="bg-[#000000] rounded-full p-1.5 flex w-full max-w-[340px] shadow-md border border-[#FF6B00]/25">
          <button
            onClick={() => setViewMode('document')}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-black transition-all cursor-pointer",
              viewMode === 'document' ? "bg-[#FF6B00] text-white shadow-sm font-black scale-[1.02]" : "text-neutral-400 hover:text-white hover:bg-neutral-950/30"
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            Document
          </button>
          <button
            onClick={() => setViewMode('chat')}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-black transition-all cursor-pointer",
              viewMode === 'chat' ? "bg-[#FF6B00] text-white shadow-sm font-black scale-[1.02]" : "text-neutral-400 hover:text-white hover:bg-neutral-950/30"
            )}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            VaultAI {messages.length > 0 && (
              <span className={cn(
                "ml-1 text-[9px] rounded-full px-1.5 py-0.25 font-bold font-sans",
                viewMode === 'chat' ? "bg-white text-[#FF6B00]" : "bg-[#FF6B00] text-white"
              )}>
                {messages.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Pane - Document view */}
        <div className={cn(
          "flex-1 bg-surface relative p-2 sm:p-4 h-full flex flex-col min-h-0",
          viewMode !== 'document' && "hidden"
        )}>
          <div className="w-full h-full flex flex-col relative">
            {pdfUrl ? (
              <div className="w-full h-full flex flex-col rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm bg-surface-container-lowest flex-1 min-h-0">
                <div className="px-3 sm:px-4 py-2 sm:py-3 bg-surface-container-low border-b border-outline-variant/30 text-xs font-mono font-medium text-on-surface flex justify-between items-center gap-2 shrink-0">
                  <span className="truncate max-w-[200px] sm:max-w-[400px]">{pdfName || "Document.pdf"}</span>
                </div>
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH&pagemode=none`}
                  className="w-full flex-1 border-0 min-h-0 bg-slate-50"
                  title={pdfName || "PDF Document"}
                />
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-6 text-on-surface/90 leading-relaxed md:text-lg font-serif">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  eiusmod tempor unmmitod incididunt ut dolore magna magna
                  aliqua. Ut enim ad minim veniam, eants of aimomorus matter
                  than narizo's scone/or given in a migraition and pronemous
                  student capacity, are veinded for the i'hakort; a data
                  contlrsdation hi-npaweill-and a tempor intrerlousing equations
                  of akanter and instituted it, in consecutieos by the
                  complizire the stape co another collabraton thlireniogers in
                  oilo-serio3 amet. Check in the location of experiences are
                  social sarrus. The coraneatrales of the risk programs, and
                  irorutten it crhiy following programt. However, these rations
                  of somr-miny may also in anura notials of a different
                  paranerich-derutbana of the use of the rules to practice
                  conhorneerure using proces, in pniksndie and intereskz; of the
                  example commonmanage that cosmtrr has equired with ancet
                  infection. Pts a lout-near stronger rotrrit, miroutierions and
                  encounred education. E allamed to cormonter what wrinced for-m
                  at a depinate development consequations Dium ancaopathenan,
                  interudiment and voluntararisolaros in tempore attention
                  azvagnat nulla perialls. Consecture elit lidunte form and
                  inmrena enginesud. Putare qmh forucs of non,impter
                  consectaastor acept. Falso for governrmenta in the vart moric
                  and life-time-dolor moment festung appropiiitism and
                  diiversity of afrerritation consutption.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut ellam ad minim veniam, quis nom veniam, quis nostrud
                  exercition ullanoy nisi et giaturis eire niat ut aliquip ex ea
                  com naodo orzahitrisnrnxia e onsequat. Duis aute irurititane
                  velit esse cilure dolore dolda in in nollus manda eut ituote
                  dolor in velit eset culpatum sonta tempit. Excet eras just
                  uilam aruntmata sil in norownent rnizenidate, sensa non mac
                  idoxnit id eu fatin ulliapet ut flagus filiat prolautant isili
                  ut aliquirex euinosad varournidtate amridtatt non eusemid.
                </p>
              </div>
            )}

            {/* Download PDF & VaultAI Floating Actions */}
            {pdfUrl && (
              <>
                {/* Floating Download Button (Bottom Left) */}
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-50">
                  <a
                    href={pdfUrl}
                    download={pdfName || "Document.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E25F00] text-white p-3.5 sm:p-4 rounded-full shadow-[0_8px_30px_rgb(255,107,0,0.35)] hover:scale-105 active:scale-95 transition-all group pointer cursor-pointer border border-[#FF6B00]/40"
                    title="Download / View in Full Native Reader"
                  >
                    <Download className="w-5 h-5 shrink-0" />
                    <span className="hidden sm:inline-block max-w-[0px] overflow-hidden group-hover:max-w-[200px] transition-all duration-300 ease-in-out font-mono text-[10px] uppercase tracking-widest font-black whitespace-nowrap pl-0 group-hover:pl-1">
                      Download PDF
                    </span>
                  </a>
                </div>

                {/* VaultAI Floating Action Button (Bottom Right) */}
                <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 flex flex-col items-end gap-3 font-sans">
                  <div className="relative group">
                    <button 
                      onClick={() => setViewMode('chat')}
                      className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF6B00] hover:bg-[#E66000] text-white rounded-full shadow-[0_8px_30px_rgb(255,107,0,0.3)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      title="Open VaultAI Chat"
                    >
                      <Bot className="w-6.5 h-6.5 sm:w-7 sm:h-7" />
                    </button>
                    <span className="font-bold text-[10px] text-[#FF6B00] uppercase tracking-wider absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">VaultAI Chat</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Pane - AI Chat */}
        <div className={cn(
          "flex-1 flex flex-col bg-background/50 relative h-full w-full max-w-4xl mx-auto border-x border-outline-variant/30 shadow-md",
          viewMode !== 'chat' && "hidden"
        )}>
          <div className="h-14 border-b border-outline-variant flex items-center justify-between px-4 bg-surface shrink-0">
             <span className="font-mono text-[12px] uppercase tracking-widest font-bold text-on-surface">VaultAI</span>
             <select 
                value={selectedModel} 
                onChange={(e) => setSelectedModel(e.target.value as "gemini" | "deepseek")}
                className="text-[10px] uppercase font-mono border border-outline-variant rounded-md px-2 py-1 bg-surface-container focus:outline-none"
             >
                <option value="gemini">Gemini</option>
                <option value="deepseek">DeepSeek</option>
             </select>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 text-[15px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${msg.role === 'user' ? 'bg-surface-container-high' : 'bg-surface-container-low'} text-on-surface rounded-lg p-4 max-w-[90%] shadow-sm border border-outline-variant/50 font-sans leading-relaxed`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface-container-low text-on-surface-variant rounded-lg p-4 max-w-[90%] shadow-sm border border-outline-variant/50 font-sans">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full h-8 bg-gradient-to-t from-background to-transparent sticky bottom-0 z-10" />
          </div>

          <div className="p-4 bg-surface/80 backdrop-blur-md border-t border-outline-variant shrink-0 relative">
            <div className="relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Message AI..."
                disabled={isLoading}
                className="w-full bg-surface-container border border-outline-variant rounded-lg py-3 pl-4 pr-14 text-sm focus:outline-none focus:border-outline shadow-sm font-sans disabled:opacity-50"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-container text-white p-2 rounded-md transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
