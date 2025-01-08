import { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { Message } from './types/chat';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { speak } = useSpeechSynthesis();

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add the user message to the messages array
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
const response = await fetch("http://localhost:8000/api/chat/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: content }), // تأكد من إرسال المحتوى
});

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred");
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response, // Assuming your backend returns this key
        sender: 'bot',
        timestamp: new Date(),
      };

      // Add the bot response to the messages array
      setMessages((prev) => [...prev, botMessage]);
      speak(botMessage.content);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          content: "Sorry, something went wrong. Please try again later.",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [speak]);

  return (
    <Layout>
      <div className="flex flex-col h-full py-4">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </Layout>
  );
}

export default App;
