import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Trash2, Play, Pause, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  onClear: () => void;
  language: string;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  onRecordingComplete, 
  onClear,
  language
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete(blob);
        
        // Stop all tracks in the stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert(language === 'en' ? "Please enable microphone access." : "請開啟麥克風權限。");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const clearRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setIsPlaying(false);
    setRecordingTime(0);
    onClear();
  };

  const togglePlayback = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  return (
    <div className="bg-brand-surface-container rounded-2xl p-6 border border-brand-outline/10">
      <AnimatePresence mode="wait">
        {!audioUrl ? (
          <motion.div 
            key="recording"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            {isRecording ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="font-mono text-xl font-bold text-brand-primary">{formatTime(recordingTime)}</span>
                </div>
                <button
                  type="button"
                  onClick={stopRecording}
                  className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors shadow-lg"
                >
                  <Square size={24} fill="currentColor" />
                </button>
                <p className="text-xs font-sans font-bold text-brand-on-surface/40 uppercase tracking-widest">
                  {language === 'en' ? 'Recording Voice Memory...' : '正在錄製語音記憶...'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 w-full">
                <button
                  type="button"
                  onClick={startRecording}
                  className="w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center hover:bg-brand-primary/20 transition-colors shadow-sm"
                >
                  <Mic size={24} />
                </button>
                <p className="text-xs font-sans font-bold text-brand-on-surface/40 uppercase tracking-widest text-center">
                  {language === 'en' ? 'Click to Record Voice Memory' : '點擊開始錄製語音記憶'}
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="w-full flex items-center justify-between bg-brand-background p-4 rounded-xl border border-brand-outline/5">
              <button
                type="button"
                onClick={togglePlayback}
                className="w-12 h-12 rounded-full bg-brand-primary text-brand-surface flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
              </button>
              
              <div className="flex-1 px-4 flex flex-col gap-1">
                <div className="h-1.5 w-full bg-brand-surface-container rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-primary"
                    animate={isPlaying ? { width: '100%' } : { width: '0%' }}
                    transition={isPlaying ? { duration: recordingTime, ease: "linear" } : { duration: 0.2 }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-brand-on-surface/30">
                  {formatTime(recordingTime)}
                </span>
              </div>

              <button
                type="button"
                onClick={clearRecording}
                className="w-10 h-10 rounded-full text-brand-on-surface/20 hover:text-red-500 hover:bg-red-50 transition-all"
                title={language === 'en' ? 'Delete' : '刪除'}
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <audio 
              ref={audioPlayerRef} 
              src={audioUrl} 
              onEnded={() => setIsPlaying(false)}
              className="hidden" 
            />
            
            <button
              type="button"
              onClick={startRecording}
              className="flex items-center gap-2 text-xs font-bold text-brand-primary hover:underline"
            >
              <RefreshCw size={12} />
              {language === 'en' ? 'Record Again' : '重新錄製'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
