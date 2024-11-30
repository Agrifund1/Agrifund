import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageType } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface Props {
  message: ChatMessageType;
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      'flex w-full mb-4',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      <div className={cn(
        'max-w-[80%] rounded-lg p-4',
        isUser 
          ? isDark 
            ? 'bg-white text-black' 
            : 'bg-green-600 text-white'
          : isDark 
            ? 'bg-gray-800 text-white' 
            : 'bg-white text-black'
      )}>
        <ReactMarkdown className={cn(
          "prose max-w-none",
          isDark ? "prose-invert" : "prose-green"
        )}>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
