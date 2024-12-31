import { useCallback } from 'react';

interface UseOrderCommandsProps {
  handleSpeak: (text: string) => Promise<void>;
  answer: () => Promise<string | undefined>;
  courses: () => Promise<void>;
  handleCoursesAnswer: (text: string) => Promise<void>;
}

export const useOrderCommands = ({
                                   handleSpeak,
                                   answer,
                                   courses,
                                   handleCoursesAnswer
                                 }: UseOrderCommandsProps) => {
  const startOrder = useCallback(async () => {
    try {
      await handleSpeak("Salut Chef! Si tu veux commencer une commande, dis, Commander!");
    } catch (error) {
      console.error("Error during speaking:", error);
    }
  }, [handleSpeak]);

  const quitOrder = useCallback(async () => {
    try {
      await handleSpeak("Pas de soucis Chef ! A la prochaine !");
    } catch (error) {
      console.error("Error during speaking:", error);
    }
  }, [handleSpeak]);

  const handleOrderAnswer = useCallback(async (textAnswer: string) => {
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
  }, [courses, answer, handleCoursesAnswer, quitOrder]);

  const restartOrder = useCallback(async () => {
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
  }, [handleSpeak, answer, handleOrderAnswer]);

  return {
    startOrder,
    restartOrder,
    quitOrder,
    handleOrderAnswer
  };
};