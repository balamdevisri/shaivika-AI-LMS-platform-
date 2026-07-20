import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, Zap, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am your EduFlow AI Learning Assistant. Ask me anything about your enrolled courses, pending assignments, or request a quick quiz review!',
      timestamp: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Summarize Module 3 of Fullstack React',
    'Generate 3 practice quiz questions',
    'Explain state management in 2 sentences',
  ];

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "Great question! Based on your current progress in 'Advanced Fullstack Web Development', here is a breakdown:";
      if (messageText.toLowerCase().includes('quiz') || messageText.toLowerCase().includes('practice')) {
        aiResponseText = "Here are 3 quick practice questions:\n1. What is the key difference between useEffect and useLayoutEffect?\n2. How does Server Side Rendering improve initial LCP?\n3. Name two CSS containment properties.";
      } else if (messageText.toLowerCase().includes('summarize') || messageText.toLowerCase().includes('module')) {
        aiResponseText = "Module 3 Summary: You covered Asynchronous State Handling, Optimistic UI updates, and Custom Hook abstractions. Your assignment score on this was 96/100!";
      } else {
        aiResponseText = `I have analyzed your request: "${messageText}". In enterprise web architectures, maintaining clean separation of concerns and type-safe APIs ensures high scalability and low technical debt. Let me know if you want a code snippet sample!`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-[#059669] to-[#10B981] text-white shadow-xl shadow-[#059669]/30 flex items-center justify-center hover:scale-110 transition-all duration-300 ${
          isOpen ? 'hidden' : 'flex'
        }`}
        title="Open EduFlow AI Assistant"
      >
        <div className="relative">
          <Bot className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-[#0F172A] rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-[#0F172A] rounded-full" />
        </div>
      </button>

      {/* Slide-over AI Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[560px] animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#0F172A] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#059669] to-[#10B981] flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm flex items-center gap-1.5">
                  EduFlow AI Assistant
                  <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded-full font-sans">
                    GPT-4o
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Contextual Tutor & Assignment Helper</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-[#059669] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm whitespace-pre-line leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0F172A] text-white rounded-tr-none'
                      : 'bg-white border border-[#E2E8F0] text-[#111827] shadow-sm rounded-tl-none'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs py-2">
                <div className="w-7 h-7 rounded-lg bg-[#059669] text-white flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
                <span>AI is reasoning and crafting response...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="p-2.5 bg-white border-t border-[#E2E8F0] overflow-x-auto flex gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-xs bg-[#F8FAFC] hover:bg-[#059669]/10 text-[#475569] hover:text-[#059669] px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] whitespace-nowrap transition-colors flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-[#059669]" />
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-[#E2E8F0]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about syllabus, code, quizzes..."
                className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-[#059669] disabled:opacity-50 hover:bg-[#047857] text-white p-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
