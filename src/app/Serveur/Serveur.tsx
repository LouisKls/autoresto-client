import React, { useState, useEffect } from "react";

const Serveur: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");

  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState<string>("");

  const [error, setError] = useState<string>("");

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

  const handleSpeak = (text: string) => {
    return new Promise<void>((resolve, reject) => {
      if (!text) {
        alert("Aucun texte à lire.");
        reject("No text to speak.");
      }

      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);

        const voice = voices.find((v) => v.name === selectedVoice);
        if (voice) {
          utterance.voice = voice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          resolve();
        };
        utterance.onerror = (e) => {
          console.error("Une erreur s'est produite :", e);
          setIsSpeaking(false);
          reject(e);
        };

        window.speechSynthesis.speak(utterance);
      } else {
        alert("Votre navigateur ne supporte pas l'API Web Speech.");
        reject("Speech synthesis not supported.");
      }
    });
  };

  const stopTalking = () => {
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const listenResponse = () => {
    return new Promise<string>((resolve, reject) => {
      if (typeof window !== "undefined") {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.lang = "fr-FR";
          recognition.interimResults = false;

          recognition.onresult = (event: any) => {
            const currentTranscript = event.results[event.resultIndex][0].transcript;
            setResponse(currentTranscript);
            recognition.stop();
            stopTalking();
            resolve(currentTranscript);
          };

          recognition.onerror = (event: any) => {
            setError("Erreur : " + event.error);
            reject(event.error);
          };

          recognition.onend = () => {
            setIsListening(false);
          };

          recognition.start();
          setIsListening(true);
        } else {
          setError("La reconnaissance vocale n'est pas disponible dans cet environnement.");
          reject("Speech recognition not available.");
        }
      }
    });
  };

  const answer = async () => {
    try {
      const userResponse = await listenResponse(); // Wait for response to be captured
      return userResponse;
    } catch (error) {
      console.error("Error during speech recognition:", error);
    }
  };

  const startOrder = async () => {
    try {
      await handleSpeak("Salut Chef! Si tu veux commencer une commande, dis, Commander!");
    } catch (error) {
      console.error("Error during speaking:", error);
    }
  };

  const restartOrder = async () => {
    try {
      await handleSpeak("Désolé Chef mais j'ai pas compris! Si tu veux commencer une commande, dis, Commander!");
    } catch (error) {
      console.error("Error during speaking:", error);
    }
    const userResponse = await answer();
    if(userResponse){
      await handleOrderAnswer(userResponse.toLowerCase());
    }else{
      await restartOrder();
    }
  };

  const quitOrder = async () => {
    try {
      await handleSpeak("Pas de soucis Chef ! A la prochaine !");
    } catch (error) {
      console.error("Error during speaking:", error);
    }
  };



  const handleOrderAnswer = async (textAnswer:string) => {
    if (textAnswer.includes("commander")) {
      await courses();
      console.log("Attente finis");
      const userResponse = await answer();
      if(userResponse){
        await handleCoursesAnswer(userResponse.toLowerCase());
      }else{
        await restartOrder();
      }
    }else{
      await quitOrder();
    }
  };

  const courses = async () => {
    try {
      await handleSpeak("Super! Il te faut une entrée, un plat, ou un dessert, mon petit gourmand ?");
    } catch (error) {
      console.error("Error during speaking:", error);
    }
  };

  const restartCourses = async () => {
    try {
      await handleSpeak("Désolé Chef mais j'ai pas compris! Il te faut une entrée, un plat, ou un dessert ?");
    } catch (error) {
      console.error("Error during speaking:", error);
    }
    const userResponse = await answer();
    if(userResponse){
      await handleCoursesAnswer(userResponse.toLowerCase());
    }else{
      await restartCourses();
    }
  };

  const handleCoursesAnswer = async (answer:string) => {
    if (answer.includes("entrée") || answer.includes("plat") || answer.includes("dessert")) {
      await item();
    }else{
      await quitOrder();
    }
  };

  const item = async () => {
    try {
      handleSpeak("Parfait ! J'ai 4 choix à te proposer : Ma grosse bite dans ta bouche, mon fromage de sperme, un caca tout mou ou ta mère ?");
    } catch (error) {
      console.error("Error during speaking:", error);
    }
  };

  const order = async () => {
    await startOrder(); // Wait for "startOrder" to finish before proceeding
    const userResponse = await answer();
    if(userResponse){
      await handleOrderAnswer(userResponse.toLowerCase());
    }else{
      await restartOrder();
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "400px", margin: "0 auto", backgroundColor: "#f4f4f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h1 style={{ textAlign: "center", color: "#333", fontSize: "24px", marginBottom: "20px" }}>Auto Resto !</h1>
      <button 
        onClick={order} 
        style={{
          display: "block",
          width: "100%",
          padding: "15px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s",
          boxSizing: "border-box",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
      >
        Commander
      </button>
  
      {error && <p style={{ color: "red", textAlign: "center", fontSize: "14px", marginTop: "10px" }}>{error}</p>}
  
      {isListening && <p style={{ color: "#555", textAlign: "center", fontSize: "16px", marginTop: "15px" }}>Écoute en cours...</p>}
    </div>
  );
  
};

export default Serveur;