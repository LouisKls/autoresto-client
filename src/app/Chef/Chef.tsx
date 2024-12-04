import React, { useState, useEffect } from "react";

interface TextToSpeechProps {
  defaultText?: string; // Texte par défaut à lire (optionnel)
}

const Chef: React.FC<TextToSpeechProps> = ({ defaultText = "" }) => {
  const [text, setText] = useState(defaultText);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      const googleFrenchVoice = availableVoices.find(
        (voice) => voice.lang === "fr-FR" && voice.name.toLowerCase().includes("google")
      );

      if (googleFrenchVoice) {
        setSelectedVoice(googleFrenchVoice.name);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    if (typeof window !== "undefined" && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleSpeak = (text:string) => {
    if (!text) {
      alert("Aucun texte à lire.");
      return;
    }

    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Appliquer la voix sélectionnée
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.error("Une erreur s'est produite :", e);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Votre navigateur ne supporte pas l'API Web Speech.");
    }
  };

  const handleStop = () => {
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "400px" }}>
      <h1>Text-to-Speech</h1>
        <button
            onClick={() => handleSpeak("Salut Chef! Si tu veux commencer une commande, dis, Commander!")}
            >
            Parler
        </button>
    </div>
  );
};

export default Chef;
