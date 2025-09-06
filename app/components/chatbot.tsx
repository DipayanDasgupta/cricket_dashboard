'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'gemini';
  text: string;
}

// This component expects the name of the selected player as a string
export function Chatbot({ selectedPlayer }: { selectedPlayer: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('div');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the exact payload our new backend is expecting
        body: JSON.stringify({ message: input, player: selectedPlayer }),
      });

      const data = await response.json();
      if (!response.ok) {
        // Use the detailed error message from the backend
        throw new Error(data.error || 'Failed to get response from the server.');
      }
      
      const geminiMessage: Message = { role: 'gemini', text: data.text };
      setMessages((prev) => [...prev, geminiMessage]);

    } catch (error: any) {
      console.error(error);
      toast.error("Uh oh! Something went wrong.", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Ask Gemini about {selectedPlayer || "a Player"}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <ScrollArea className="h-64 flex-grow" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            <AnimatePresence>
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">Ask a question about {selectedPlayer || "the selected player"}...</p>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))
              )}
              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <span className="animate-pulse">...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." disabled={!selectedPlayer || isLoading} />
          <Button type="submit" disabled={!selectedPlayer || isLoading}>{isLoading ? '...' : 'Send'}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
