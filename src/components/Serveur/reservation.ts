export const reservation = async (
  handleClickSpeak: (text: string) => Promise<void>,
  answer: () => Promise<string | null>
): Promise<void> => {
  try {
    await handleClickSpeak('Vous voulez réserver pour quelle heure ?');
    const userResponse = await answer();

    if (userResponse) {
      const timeMatch = userResponse.match(/([01]?\d|2[0-3])h(:?\d{2})?/i);

      if (timeMatch) {
        const extractedTime = timeMatch[0];
        await handleClickSpeak(`Parfait ! Je réserve pour ${extractedTime}. À toute à l'heure !`);
      } else {
        await handleClickSpeak('Je n\'ai pas compris.');
        await reservation(handleClickSpeak, answer); // Relance la réservation
      }
    } else {
      await reservation(handleClickSpeak, answer); // Relance la réservation si pas de réponse
    }
  } catch (error) {
    console.error('Error in reservation:', error);
  }
};
