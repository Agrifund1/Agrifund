'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '@/hooks/useChat';
import { useTheme } from 'next-themes';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, isLoading } = useChat();
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full shadow-lg transition-colors",
          isDark 
            ? "bg-white text-black hover:bg-gray-200" 
            : "bg-green-600 text-white hover:bg-green-700"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {isOpen && (
        <Card className={cn(
          'absolute bottom-16 right-0 w-[380px] h-[600px] flex flex-col shadow-xl border',
          isDark ? 'bg-gray-900' : 'bg-white'
        )}>
          <div className={cn(
            "flex items-center justify-between p-4 border-b",
            isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          )}>
            <h3 className="font-semibold">AgriFund Assistant</h3>
            <Button
              onClick={() => setIsOpen(false)}
              size="icon"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className={cn(
            "flex-1 overflow-y-auto p-4 space-y-4",
            isDark ? 'bg-gray-900' : 'bg-white'
          )}>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            onSend={sendMessage}
            disabled={isLoading}
          />
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
