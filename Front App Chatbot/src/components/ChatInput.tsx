import React, { useState } from 'react';
import { Mic, Send, Loader2 } from 'lucide-react';
import { ChatInputProps } from '../types/chat';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    resetTranscript 
  } = useSpeechRecognition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  React.useEffect(() => {
    if (transcript) {
      setMessage(transcript);
      resetTranscript();
    }
  }, [transcript]);

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`p-2 rounded-full ${
          isListening ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        <Mic size={20} />
      </button>
      
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Send size={20} />
        )}
      </button>
    </form>
  );
};