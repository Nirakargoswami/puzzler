import React from "react"
import Friend from "../asssets/26829956.jpg"
import Coupel from "../asssets/22507028.jpg"
export const MainQuizquestion = 
    {
friend : [
    { question: ' Which one wish that creates the perfect life for you?', options: ['Money$$', 'True Love', 'Superpower', 'Unlimited Snacks',"Nothing I'm perfact"] },
    { question: 'Can you keep a secret?', options: ['Yes', "No", 'Maybe'] },
    { question: 'If you get an opportunity for an adventurous journey, who would you prefer?', options: ['Alone', 'Family', 'Friends', 'Soulmate'] },

  ] ,
  couple :
  [
    { question: 'What is your favorite TV show?', options: ['Anupamaa', 'Yeh Rishta Kya Kehlata Hai', 'Yeh Hai Chahatein', 'Taarak Mehta Ka Ooltah Chashmah'] },
    { question: 'What is your dream holiday?', options: ['A trip to Maldives', 'Camping in the forest', 'Touring the country', 'Lying on an exotic beach'] },
    { question: 'What is afraid of the most you?', options: ['Speed Racing', 'Spiders', 'Lizard', 'Lightning strikes'] },

  ] 

}
export const coupleQuestionsWithOptions = [
 
  {
    question: 'What is your favorite Bollywood movie genre?',
    options: [
      'Romantic',
      'Action',
      'Comedy',
      'Drama',
      'Thriller',
    ],
  },
  {
    question: 'Which place in India would You love to visit the most?',
    options: [
      'Goa',
      'Himachal Pradesh',
      'Kerala',
      'Rajasthan',
      'Andaman and Nicobar Islands',
    ],
  },
  {
    question: 'What hobby makes your partner happy??',
    options: [
      'Reading book',
      'Playing Game',
      'Riding Cars',
      'Coocking',
      'Chaat',
    ],
  },
  {
    question: "Where would your partner like to live in the future?",
    options: [
      'Himachal',
      'Canada',
      'Switzerland',
      'Mumbai',
    ],
  },
  {
    question: "Whne is your Birthday",
    options: [
      'Oct 23',
      'jan 10 ',
      'sep 7',
      'dec 22',
    ],
  },
  {
    question: "What does your partner enjoy the most about life?",
    options: [
      'work',
      'sleeping',
      'outing',
      'Earning money',
    ],
  },
  {
    question: " What color does your partner like the least?",
    options: [
      'Green',
      'black',
      'Pink',
      'Blue',
    ],
  },
  {
    question: " What color does your partner like the least?",
    options: [
      'Green',
      'black',
      'Pink',
      'Blue',
    ],
  },
 
  // ... Add more questions with options
];

export const Changethequeston = (q) => {
if(q === "What is my favorite Bollywood movie genre?"){
     
}
}
 

export const PreshowofQuiz = {
friend : {
  img:<img className="Photos" src={Friend}/>,
  name : "Best friend Quiz",
  question : "How well do your friends know you?",
} ,
couple : {
  img:<img className="Photos" src={Coupel}/>,
  name : 'Couple Quiz',
  question : "How well do your Partner know you?"
},

}


export const LocalQuiz = {
  youtubsers: {
    img:<img className="Photos" src={Friend}/>,
    name : "",
    question : "How well do your friends know you?",
  } ,
  couple : {
    img:<img className="Photos" src={Coupel}/>,
    name : 'Couple Quiz',
    question : "How well do your Partner know you?"
  },
  
  }
