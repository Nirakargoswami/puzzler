import React from "react"
import Friend from "../asssets/26829956.jpg"
import Coupel from "../asssets/22507028.jpg"
export const MainQuizquestion =
{
  friend: [
   
      { question: "Which movie best describes our friendship?", options: ["Dil Chahta Hai", "3 Idiots", "Sholay", "Yeh Jawaani Hai Deewani"] },
      { question: "Where was our first hangout in?", options: ["School", "on Ground", "Class", "collage"] },
      { question: "What's our favorite  street food?", options: ["Pani Puri", "Vada Pav", "Chaat", "Samosa"] },
      { question: "What festival do we enjoy celebrating together?", options: ["Diwali", "Holi", "Ganesh Chaturthi", "Navrari"] },
      { question: "Which Indian city would we love to explore together?", options: ["Jaipur", "Varanasi", "Goa", "Mumbai"] },
      { question: "Which Indian historical place would we like to visit?", options: ["Taj Mahal", "Red Fort", "Hampi", "Qutub Minar"] },
      { question: "What's our go-to Bollywood dance move?", options: ["Bhangra", "Garba", "Dandiya", "Zumba"] },
      { question: "Which Indian tradition resonates with our friendship?", options: ["Raksha Bandhan", "Navratri", "Onam", "Eid"] },
      { question: "What's my favorite Indian dessert?", options: ["Gulab Jamun", "Rasgulla", "Jalebi", "Kheer"] },
      { question: "Which Indian slang word do we use the most?", options: ["Buddy", "Bakchod", "Chumma", "Dost"] },
      { question: "If we could go on a road trip in India, where would it be?", options: ["Leh-Ladakh", "Rann of Kutch", "Kerala Backwaters", "Golden Triangle"] },
      { question: "What's our favorite Indian song that represents our friendship?", options: ["Yeh Dosti Hum Nahi Todenge", "Tera Yaar Hoon Main", "Masti Ki Paathshala", "Jeene Ke Hain Chaar Din"] }
 
  ],
  couple:
    [
      { question: 'What is your favorite TV show?', options: ['Anupamaa', 'Yeh Rishta Kya Kehlata Hai', 'Yeh Hai Chahatein', 'Taarak Mehta Ka Ooltah Chashmah'] },
      
      { question: 'What is your dream holiday?', options: ['A trip to Maldives', 'Camping in the forest', 'Touring the country', 'Lying on an exotic beach'] },
      { question: 'What is afraid of the most you?', options: ['Speed Racing', 'Spiders', 'Lizard', 'Lightning strikes'] },
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
        question: "When is your Birthday",
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
     
    ]

}


export const Changethequeston = (q) => {
  if (q === "What is my favorite Bollywood movie genre?") {

  }
}


export const PreshowofQuiz = {
  friend: {
    img: <img className="Photos" src={Friend} />,
    name: "Best friend Quiz",
    question: "How well do your friends know you?",
  },
  couple: {
    img: <img className="Photos" src={Coupel} />,
    name: 'Couple Quiz',
    question: "How well do your Partner know you?"
  },

}


export const LocalQuiz = {
  youtubsers: {
    img: <img className="Photos" src={Friend} />,
    name: "",
    question: "How well do your friends know you?",
  },
  couple: {
    img: <img className="Photos" src={Coupel} />,
    name: 'Couple Quiz',
    question: "How well do your Partner know you?"
  },

}
