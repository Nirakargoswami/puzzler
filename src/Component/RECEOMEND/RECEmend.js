import React from 'react';

const QuizRecommendation = ({ quizData }) => {
  const recommendQuizzes = () => {

    console.log(quizData)
    // Generate 4 random indices
    const randomIndices = [];
    while (randomIndices.length < 5) {
      const randomIndex = Math.floor(Math.random() * quizData.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    // Extract the recommended quizzes using the random indices
    const recommendedQuizzes = randomIndices.map(index => quizData[index]);
    return recommendedQuizzes;
  };

  const recommendedQuizzes = recommendQuizzes();
console.log(recommendedQuizzes)
  return (
    <div>
      <h2>Recommended Quizzes</h2>
      {/* <ul>
        {recommendedQuizzes.map((quiz, index) => (
          <li key={index}>{quiz.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default QuizRecommendation
