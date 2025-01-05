export const reservation = async (
  handleClickSpeak: (text: string) => Promise<void>,
  answer: () => Promise<string | null>,
  finishOrder: () => void
): Promise<void> => {
  try {
    await handleClickSpeak('Vous voulez réserver pour quelle heure ?');
    const userResponse = await answer();

    if (userResponse) {
      const timeMatch = userResponse.match(/([01]?\d|2[0-3])h(:?\d{2})?/i);

      if (timeMatch) {
        const extractedTime = timeMatch[0];
        await confirmReservation(handleClickSpeak, answer, extractedTime, finishOrder);
      } else {
        await handleClickSpeak('Je n\'ai pas compris.');
        await reservation(handleClickSpeak, answer, finishOrder); // Relance la réservation
      }
    } else {
      await reservation(handleClickSpeak, answer, finishOrder); // Relance la réservation si pas de réponse
    }
  } catch (error) {
    console.error('Error in reservation:', error);
  }
};

export const confirmReservation = async (
  handleClickSpeak: (text: string) => Promise<void>,
  answer: () => Promise<string | null>,
  extractedTime: string,
  finishOrder: () => void
): Promise<void> => {
  try {
    await handleClickSpeak(`Confirmez-vous que vous voulez réserver pour ${extractedTime}`);
    const userResponse = await answer();

    if (userResponse) {
      if (userResponse.includes('oui')) {
        await handleClickSpeak(`Parfait ! Je réserve pour ${extractedTime}. À tout à l'heure !`);
        await finishOrder();
      } else {
        await handleClickSpeak('D\'accord, choisissez un nouvel horaire de réservation');
        await reservation(handleClickSpeak, answer, finishOrder); // Relance la réservation
      }
    } else {
      await confirmReservation(handleClickSpeak, answer, extractedTime, finishOrder); // Relance la confirmation si pas de réponse
    }
  } catch (error) {
    console.error('Error in reservation:', error);
  }
};
