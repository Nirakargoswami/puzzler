import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
const QuizRecommendation = () => {
  const [datas, setdata] = useState([]);

  const recommendQuizzes = (data) => {
    const randomIndices = [];
    while (randomIndices.length < 4) {
      const randomIndex = Math.floor(Math.random() * data.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    const recommendedQuizzes = randomIndices.map(index => data[index]);
    setdata(recommendedQuizzes);
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const apiUrl =
        "https://writers.explorethebuzz.com/api/quizzes?filters[for][$eq]=Nirakar&fields[0]=name&fields[1]=slug&fields[2]=rank&populate[thumbnail][fields][0]=url&pagination[page]=1&pagination[pageSize]=10";

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      recommendQuizzes(data.data);
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
    }
  };


  console.log(datas);

  return (
    <>
     <h2>Recommended Quizzes</h2>
     <div className='REbox'>
     
      {datas.map((x) => {
        return (
          <Link to={`/NormalQuiz/${x.id
            }`} style={{ textDecoration: "none", marginBottom: "20px" }}>
            <div className="css-qrax4f">
              <div className="css-sb08dx">
                <span className="sapn1">
                  <span className="span2">
                    <img className="Reimge" src={`https://writers.explorethebuzz.com${x.thumbnail.url}`} />

                  </span>
                  <div style={{textAlign:"center"}}>

                    <h3  style={{ color: "black", fontSize: "18px", margin: "0px" }}>{x.name}</h3>
                  </div>
                </span>
              </div>
            </div>
          </Link>
        )
      })

      }

    </div>
    </>
    
  );
};

export default QuizRecommendation;
