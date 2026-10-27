import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  UserCircle2, 
  ShieldCheck, 
  HelpCircle, 
  RotateCcw,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { User } from '../../types';
import { apiService } from '../../services/api';

interface AICareerMentorProps {
  user: User;
  initialPrompt?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: string;
  timestamp: string;
}

export const AICareerMentor: React.FC<AICareerMentorProps> = ({
  user,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm_welcome',
      sender: 'assistant',
      text: `Mabuhay, ${user.name.split(' ')[0]}! I am **Gabay AI**, your supportive educational mentor on FutureReady PH.

I am here to help you:
• Unpack your diagnostic assessment results with encouragement
• Compare college degrees across Philippine universities (UP, DLSU, Ateneo, UST, PUP, etc.)
• Brainstorm practical science investigatory projects (SIP)
• Prepare thoughtful questions for your real school guidance counselor

Remember: I am an exploration partner. You have many paths to success! What would you like to discuss today?`,
      source: 'knowledge-base',
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt !== input) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await apiService.askMentor(
        query,
        {
          name: user.name,
          grade: user.gradeLevel,
          strand: user.strand,
          strengths: ['Logical Reasoning', 'Community Engineering', 'Spatial Patterning'],
          interests: ['Software Architecture', 'Environmental Science', 'Robotics'],
        },
        messages.map((m) => ({ sender: m.sender, text: m.text }))
      );

      const assistantMsg: Message = {
        id: `asst_${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        source: response.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `asst_err_${Date.now()}`,
          sender: 'assistant',
          text: 'Kumusta! I experienced a momentary network delay. Please remember that your school guidance counselor (Ma\'am Elena) is always available during school hours for career transitions.',
          source: 'local-fallback',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Compare BS Computer Science vs BS Information Technology',
    'What high school projects help my DOST-SEI scholarship application?',
    'Generate 4 good questions for my school guidance counselor about college admissions',
    'What careers combine Environmental Science and Community Leadership in the Philippines?',
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-[#3267D5]/10 px-3 py-1 rounded-full">
            <span>Powered by Google Gemini · Model: gemini-3.8-flash</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
            Gabay AI Guidance Mentor
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            A safe, constructive guidance companion calibrated with Philippine K-12 DepEd and CHED curriculum context.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-[#168C80]" />
          <span>Minor Safe · Strict Safeguards</span>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col h-[600px] overflow-hidden">
        
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-slate-800 text-white'
                      : 'bg-[#3267D5] text-white shadow-sm'
                  }`}
                >
                  {isUser ? <UserCircle2 className="w-5 h-5" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`space-y-1 max-w-xl ${isUser ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line text-left ${
                      isUser
                        ? 'bg-[#3267D5] text-white rounded-tr-none'
                        : 'bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                    <span>{m.timestamp}</span>
                    {m.source && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{m.source === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash' : 'Philippine Guidance Knowledge Base'}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#3267D5] text-white flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500 rounded-tl-none flex items-center gap-2">
                <span>Gabay AI is consulting curriculum and scholarship records...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Strip */}
        <div className="px-6 py-2 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0">Try Asking:</span>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 rounded-lg text-[11px] text-slate-600 dark:text-slate-300 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Gabay AI about college strands, scholarships, investigatory projects, or counseling..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 text-white bg-[#3267D5] hover:bg-[#2552B5] disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl shadow-sm transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-slate-400 text-center mt-2">
            Gabay AI is an educational guidance assistant. It does not replace the personalized, confidential support of your school's Registered Guidance Counselor (RGC).
          </p>
        </div>

      </div>

    </div>
  );
};
