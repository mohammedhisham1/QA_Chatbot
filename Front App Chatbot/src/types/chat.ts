export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isAudio?: boolean;
}

export interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export interface ChatMessageProps {
  message: Message;
}