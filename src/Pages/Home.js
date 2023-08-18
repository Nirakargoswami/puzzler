import React, { useEffect, useState } from "react";
import Quizbox from "../Component/Qiizbox/Quizbox"
import Typography from '@mui/material/Typography';
import Imagefried from "../asssets/26829956.jpg";
import couple from "../asssets/22507028.jpg";
import { retrieveImage } from "../Firebase/firebse"
import ImageUpload from "../Component/Uplodaimage/Uploaimage"
import "./Home.css"
import { db, collection, getDocs, deleteDoc, doc, getDoc } from '../Firebase/firebse'; // Import necessary Firebase modules

import { Link } from "react-router-dom";
import { async } from "@firebase/util";
const Home = () => {
    const [url, setUrl] = useState()
    const [quizzes, setQuizzes] = useState([])

    const data = [
        {
            name: "Best friend Quiz",
            img: <img className="Photo" src={Imagefried} />
        },
        {
            name: "couple Quiz",
            img: <img className="Photo" src={couple} />
        }
    ]


    useEffect(() => {
        fethdata()
    }, [])
const fethdata = async() => {
    try {
        const quizzesSnapshot = await getDocs(collection(db, "quiznames"));
        const quizzesData = quizzesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(quizzesData)
        setQuizzes(quizzesData);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
    } 
}
    //     const imageName = '22507028.jpg'; // Replace with your image's name

    //     useEffect(() => {
    //         const imageURL =  retrieveImage(imageName);
    //         imageURL.then((x) => {
    //             console.log(x)
    //             if (x) {
    //                 // Use the imageURL to display the image on your web page
    //                 const imgElement = document.createElement('img');
    //                 setUrl(x)
    //               }
    //         })
    // console.log(imageURL)



    //     },[])





    return (
        <>
            <div>
                <div className="MainboxCol">
                    <Quizbox data={data} />
                </div>


                {
                    <>
                        <div className="Inda">
                            <h2>India's Top <span class="Mark">Quiz</span></h2>
                        </div>
                        <div className="css-pc76bz ">
                            {quizzes && quizzes.map((x) => {
                                return (
                                    <Link to={`/NormalQuiz/${x.quryname}`} style={{ textDecoration: "none",marginBottom:"20px" }}>
                                        <div className="css-qrax4f">
                                            <div className="css-sb08dx">
                                                <span className="sapn1">
                                                    <span className="span2">
                                                        <img className="Image" src={x.image} />

                                                    </span>
                                                    <div className="css-1dm2hj8">

                                                        <h3 style={{ color: "black", fontSize: "17px", margin: "0px" }}>{x.name}</h3>
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
                }


            </div>

        </>
    )
}

export default Home