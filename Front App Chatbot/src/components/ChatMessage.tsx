import React from 'react';
import { ChatMessageProps } from '../types/chat';
import { Bot, User } from 'lucide-react';

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex items-start max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 ${isBot ? 'mr-2' : 'ml-2'}`}>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            {isBot ? <Bot size={20} /> : <User size={20} />}
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg ${
          isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-500 text-white'
        }`}>
          <p className="text-sm">{message.content}</p>
          <span className="text-xs opacity-75 mt-1 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};