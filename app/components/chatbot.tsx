'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
interface Message { role: 'user' | 'gemini'; text: string; }
export function Chatbot({ selectedPlayer }: { selectedPlayer: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (chatContainerRef.current) { chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; } }, [messages]);
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: input, player: selectedPlayer || "the selected player" }), });
      if (!response.ok) { throw new Error('Failed to get response from the server.'); }
      const data = await response.json();
      const geminiMessage: Message = { role: 'gemini', text: data.text };
      setMessages((prev) => [...prev, geminiMessage]);
    } catch (error) {
      console.error(error);
      toast.error("Uh oh! Something went wrong.", { description: "There was a problem connecting to the AI. Please try again.", });
    } finally { setIsLoading(false); }
  };
  return (
    <Card className="h-full flex flex-col"><CardHeader><CardTitle>Ask Gemini about {selectedPlayer || "a Player"}</CardTitle></CardHeader><CardContent className="flex-grow flex flex-col gap-4"><div ref={chatContainerRef} className="h-64 flex-grow overflow-y-auto rounded-md border p-4 bg-muted/50 space-y-4"><AnimatePresence>{messages.length === 0 ? (<p className="text-sm text-muted-foreground">Ask a question about {selectedPlayer || "the selected player"}...</p>) : (messages.map((msg, index) => (<motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{msg.text}</div></motion.div>)))} {isLoading && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start"><div className="bg-muted rounded-lg px-4 py-2"><span className="animate-pulse">...</span></div></motion.div>)}</AnimatePresence></div><form onSubmit={handleSendMessage} className="flex gap-2"><Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." disabled={isLoading} /><Button type="submit" disabled={isLoading}>{isLoading ? '...' : 'Send'}</Button></form></CardContent></Card>
  );
}
