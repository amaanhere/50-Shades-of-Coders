'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Mic, PhoneOff, Send, Paperclip, Maximize, Minimize } from 'lucide-react';
import Image from 'next/image';

interface ConsultationInterfaceProps {
  consultationId: string; // or appointmentId
}

interface Message {
  id: string;
  text: string;
  sender: 'patient' | 'doctor';
  timestamp: Date;
}

export function ConsultationInterface({ consultationId }: ConsultationInterfaceProps) {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'doctor', timestamp: new Date(Date.now() - 60000 * 5) },
    { id: '2', text: 'Hi Doctor, I have been experiencing a persistent cough.', sender: 'patient', timestamp: new Date(Date.now() - 60000 * 4) },
  ]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setChatMessages([
        ...chatMessages,
        { id: Date.now().toString(), text: message, sender: 'patient', timestamp: new Date() },
      ]);
      setMessage('');
    }
  };
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullScreen(true);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    }
  };


  return (
    <Card className="w-full shadow-xl overflow-hidden">
      <CardHeader className="bg-secondary/50 border-b p-4">
        <div className="flex justify-between items-center">
          <CardTitle>Consultation with Dr. Placeholder</CardTitle>
          <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
            {isFullScreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            <span className="sr-only">{isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 md:flex md:h-[600px]">
        {/* Video Area */}
        <div className="md:flex-1 bg-muted/40 relative flex items-center justify-center p-4 aspect-video md:aspect-auto">
          <Image
            src="https://picsum.photos/seed/patient/800/600"
            alt="Patient Video Feed"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
            data-ai-hint="person video call"
          />
           <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p className="text-2xl text-white font-semibold">
              {isVideoOff ? "Video Off" : "Doctor's Video Feed Placeholder"}
            </p>
          </div>
          <div className="absolute bottom-4 right-4 w-1/4 max-w-[150px] aspect-video bg-black border-2 border-primary rounded-md overflow-hidden">
             <Image
                src="https://picsum.photos/seed/doctor6/200/150"
                alt="Doctor Video Feed"
                layout="fill"
                objectFit="cover"
                data-ai-hint="person talking"
              />
            <p className="absolute inset-0 flex items-center justify-center text-xs text-white bg-black/30">
              Your Video
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="md:w-1/3 border-t md:border-t-0 md:border-l flex flex-col bg-background">
          <ScrollArea className="flex-grow p-4 h-64 md:h-auto">
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.sender === 'patient'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center space-x-2 bg-secondary/30">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t bg-secondary/50 flex justify-center items-center space-x-2 md:space-x-4">
        <Button variant={isVideoOff ? "secondary" : "outline"} onClick={() => setIsVideoOff(!isVideoOff)} size="lg">
          <Video className={`mr-2 h-5 w-5 ${isVideoOff ? 'text-destructive' : ''}`} /> {isVideoOff ? 'Start Video' : 'Stop Video'}
        </Button>
        <Button variant={isMuted ? "secondary" : "outline"} onClick={() => setIsMuted(!isMuted)} size="lg">
          <Mic className={`mr-2 h-5 w-5 ${isMuted ? 'text-destructive' : ''}`} /> {isMuted ? 'Unmute' : 'Mute'}
        </Button>
        <Button variant="destructive" size="lg">
          <PhoneOff className="mr-2 h-5 w-5" /> End Call
        </Button>
      </CardFooter>
    </Card>
  );
}
