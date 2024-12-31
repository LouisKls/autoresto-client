export const handleOrderAnswer = async (
  textAnswer: string,
  courses: () => Promise<void>,
  answer: () => Promise<string | undefined>,
  handleCoursesAnswer: (response: string) => Promise<void>,
  handleRestartOrder: () => Promise<void>,
  handleQuitOrder: () => Promise<void>
): Promise<void> => {
  if (textAnswer.includes('commander')) {
    await courses();
    console.log('Attente finis');
    const userResponse = await answer();
    if (userResponse) {
      await handleCoursesAnswer(userResponse.toLowerCase());
    } else {
      await handleRestartOrder();
    }
  } else {
    await handleQuitOrder();
  }
};