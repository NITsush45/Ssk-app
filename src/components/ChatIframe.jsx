'use client';

import { useEffect, useState } from 'react';

const ChatIframe = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  return (
    <div className="rounded-lg overflow-hidden shadow-2xl border border-emerald-500/30 h-full">
      <iframe
        src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=c35e3576-f277-4270-ae82-0f813a22c3c9"
        className="w-full h-full bg-white"
        title="SSK AI Chatbot"
        allow="microphone"
        loading="lazy"
      />
    </div>
  );
};

export default ChatIframe;