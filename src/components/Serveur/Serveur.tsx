import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";


const Serveur: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");

  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState<string>("");

  const [error, setError] = useState<string>("");

  const [itemOrder, setItemOrder] = useState<string[]>([]);

  const [items, setItems] = useState<Item[]>([]);
  const [data, setData] = useState({
    items: {
      entrees: [],
      plats: [],
      desserts: [],
      boissons: []
    }
  });
  


  type Item = {
    id: string;
    name: string;
    price: number;
    image: string;
    type: string;
    allergene: string;
    description: string;
  };  

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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/items/items.json');
        const data = await response.json();
        setData(data);

        // Merge items from all categories into a single array
        const allItems = [
          ...data.items.entrees,
          ...data.items.plats,
          ...data.items.desserts,
          ...data.items.boissons
        ];

        console.log("allItems : ",allItems);


        setItems(allItems); // Update state with the merged array of items
      } catch (error) {
        console.error("Erreur lors du chargement des items :", error);
      }
    };

    fetchItems();
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
      await handleSpeak("Super! Il te faut une boisson, une entrée, un plat, ou un dessert, mon petit gourmand ?");
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


  const handleCoursesAnswer = async (respond: string) => {
    if (respond.includes("entrée") || respond.includes("plat") || respond.includes("dessert") || respond.includes("boi")) {
      await chooseAnItem(respond);
    } else {
      await quitOrder();
    }
  };
  
  const chooseAnItem = async (response: string) => {
    // Définir les catégories
    const categories = {
      entree: data.items.entrees,
      plat: data.items.plats,
      dessert: data.items.desserts,
      boisson: data.items.boissons
    };
  
    let chosenCategory;
    if (response.includes("entrée")) {
      chosenCategory = categories.entree;
    } else if (response.includes("plat")) {
      chosenCategory = categories.plat;
    } else if (response.includes("dessert")) {
      chosenCategory = categories.dessert;
    } else if (response.includes("boi")) {
      chosenCategory = categories.boisson;
    }
  
    if (chosenCategory) {
      // Sélectionner 4 éléments aléatoires de la catégorie choisie
      const randomItems = getRandomItems(chosenCategory, 4);
      await itemChoice(randomItems);
      const userResponse = await answer();
  
      if (userResponse) {
        // Fonction de normalisation et de suppression des accents
        const removeAccents = (str: string) => {
          return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

        // Fonction de nettoyage pour convertir en minuscules et supprimer les accents
        const sanitizeString = (str: string) => {
          return removeAccents(str.trim().toLowerCase()); // Supprime les accents et met tout en minuscule
        };

        // Nettoyage des éléments dans la liste avant de les utiliser avec Fuse
        const cleanedItems = items.map(item => ({
          ...item,
          name: sanitizeString(item.name), // Nettoyer chaque élément
        }));

        // Configuration de Fuse.js
        const fuse = new Fuse(cleanedItems, {
          keys: ['name'],
          threshold: 0.5, // Tolérance de la correspondance (plus faible = plus strict)
        });

        // Nettoyer la réponse de l'utilisateur
        const sanitizedUserResponse = sanitizeString(userResponse);

        // Recherche avec Fuse.js
        const results = fuse.search(sanitizedUserResponse);

        let matchedKeyword = null;
        if (results.length > 0) {
           matchedKeyword = results[0].item;
          console.log(`Matched item: ${matchedKeyword.name}`);
        } else {
          console.log('No match found');
        }     
  
        if (matchedKeyword) {
          console.log(`Matched item: ${matchedKeyword.name}`);
          itemOrder.push(matchedKeyword.name);
          await handleSpeak("Parfait ! C'est enregistré !");
          await continueOrder();
        } else {
          console.log('No match found');
        }
  
        // Si l'utilisateur mentionne "autre", recommencez le choix
        if (userResponse.toLowerCase().includes("autre")) {
          await chooseAnItem(response); // Passez la même catégorie pour choisir à nouveau
        }
      }
    }
  };
  
  // Fonction pour obtenir des éléments aléatoires
  const getRandomItems = (category: any[], count: number) => {
    const shuffled = [...category].sort(() => 0.5 - Math.random()); // Mélange les éléments
    return shuffled.slice(0, count); // Prend les "count" premiers éléments
  };  


  const itemChoice = async (items:Item[]) => {
    try {
      await handleSpeak("Parfait ! J'ai 4 choix à te proposer :");
      await handleSpeak(items[0].name);
      await handleSpeak(items[1].name);
      await handleSpeak(items[2].name);
      await handleSpeak(items[3].name);
      await handleSpeak("Autres choix");
      await handleSpeak("Lequel veux tu ?");
    } catch (error) {
      console.error("Error during speaking:", error);
    }
  };

  const continueOrder = async () => {
    if(itemOrder.length>0){
      await handleSpeak("Actuellement dans ta commande il y a ces articles :");
      for (const item of itemOrder) {
        await handleSpeak(item);
      }
    }
    if(itemOrder.length>0){
      await handleSpeak("Veux tu, commander quelque-chose ? Annuler le dernier article ? Ou passer à la réservation ?");
    }else{
      await handleSpeak("Veux tu, commander quelque-chose ? Ou stopper la commande");
    }
    const userResponse = await answer();
    if(userResponse) {
      await handleContinueOrderAnswer(userResponse.toLowerCase());
    }else{
      await continueOrder();
    }
  };

  const handleContinueOrderAnswer = async (textAnswer:string) => {
    if (textAnswer.includes("commander")) {
      await courses();
      const userResponse = await answer();
      if(userResponse){
        await handleCoursesAnswer(userResponse.toLowerCase());
      }else{
        await restartOrder();
      }
    }else{
      if (textAnswer.includes("réser")) {
        await handleSpeak("Super, passons à la réservation");
        await reservation();
      }else{
        if (textAnswer.includes("annuler")) {
          await handleSpeak("D'accord j'annule ton dernier article");
          itemOrder.pop();
          await continueOrder();
        }else{
          if (textAnswer.includes("stop")) {
            await handleSpeak("D'accord je stoppe la commande, à la prochaine !");
          }else{
            await continueOrder();
          }
        }
      }
    }
  };

  const reservation = async () => {
    await handleSpeak("Vous voulez réserver pour quelle heure ?");
    const userResponse = await answer();

    if (userResponse) {
        const timeMatch = userResponse.match(/([01]?\d|2[0-3])h(:?\d{2})?/i);
        
        if (timeMatch) {
            const extractedTime = timeMatch[0];
            await handleSpeak(`Parfait ! Je réserve pour ${extractedTime}. À toute à l'heure !`);
        } else {
            await handleSpeak("Je n'ai pas compris.");
            await reservation();
        }
    } else {
        await reservation();
    }
};


  const order = async () => {
    await startOrder();
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