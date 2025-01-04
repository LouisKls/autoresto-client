export const courses = async (handleClickSpeak: (text: string) => Promise<void>) => {
  try {
    await handleClickSpeak('Super! Il te faut une boisson, une entrée, un plat, ou un dessert, mon petit gourmand ?');
  } catch (error) {
    console.error('Error during speaking:', error);
  }
};

export const restartCourses = async (
  handleClickSpeak: (text: string) => Promise<void>,
  answer: () => Promise<string | undefined>,
  handleCoursesAnswer: (response: string) => Promise<void>
) => {
  try {
    await handleClickSpeak('Désolé Chef mais j\'ai pas compris! Il te faut une entrée, un plat, ou un dessert ?');
  } catch (error) {
    console.error('Error during speaking:', error);
  }

  const userResponse = await answer();
  if (userResponse) {
    await handleCoursesAnswer(userResponse.toLowerCase());
  } else {
    await restartCourses(handleClickSpeak, answer, handleCoursesAnswer);
  }
};
