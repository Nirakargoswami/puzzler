import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { db, collection, getDocs, deleteDoc, doc, getDoc } from '../Firebase/firebse'; // Import necessary Firebase modules
import Confetti from 'react-confetti'
import { useWindowSize } from "@uidotdev/usehooks";
import QuizRecommendation from "../Component/RECEOMEND/RECEmend"
import "./ansqusionpage.css"
import { Button, Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import CommentIcon from '@mui/icons-material/Comment';
import ListItemText from '@mui/material/ListItemText';

import BarChartIcon from '@mui/icons-material/BarChart';
import ShareIcon from '@mui/icons-material/Share';
const NormalQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [questionsArray, setquestionsArray] = useState()
    const [gameOver, setGameover] = useState(false)
    const [Start, setStart] = useState(false)
    const [name, setName] = useState()
    const [names, setNames] = useState()
    const [Mainuser, setMainuser] = useState()
    const [color, setColor] = useState()
    const [open, setOpen] = useState(false);
    const [run, setrun] = useState(true)
    const [Quizeee, setQuizzes] = useState()
    const [remainingTime, setRemainingTime] = useState(30); // Initialize timer with 30 seconds
    const [copied, setCopied] = useState(false);
    const params = useParams();
    const [opens, setOpens] = useState(false);

    const size = useWindowSize();




    const Color = ["#2979ff", "#ff5722", "#bc186b", "651fff", "#d500f9", "#e91e63", "#3d5afe", "#9c27b0"]

    const randomNumberColor = () => {

        const No = Math.floor(Math.random() * 9)

        setColor(Color[No])
    }




    useEffect(() => {
        let timer;

        if (Start && !gameOver && questionsArray) {
            timer = setTimeout(() => {
                if (remainingTime > 1) {
                    setRemainingTime(remainingTime - 1);
                } else {
                    //console.log("fasdfafa")
                    handleNextClick(); // Move to the next question when time is up
                }
            }, 1000); // Update timer every second
        }


        return () => {
            clearTimeout(timer); // Clear the timer on component unmount or state changes
        };
    }, [remainingTime, Start, gameOver, questionsArray]);

    useEffect(() => {
        if (remainingTime < 2 && Start) {
           
            if ((selectedOption !== null) && questionsArray.qna[currentQuestionIndex].options[selectedOption].correct === true) {
                setScore(score + 1);
            }
            setSelectedOption(null)
            setRemainingTime(30)
            randomNumberColor()

            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }, [remainingTime])

    const fethdata = async () => {
        try {
            const apiUrl = "https://writers.explorethebuzz.com/api/quizzes?filters[for][$eq]=Nirakar&fields[0]=name&fields[1]=slug&fields[2]=rank&populate[thumbnail][fields][0]=url&pagination[page]=1&pagination[pageSize]=10";

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    //console.log(data); // You can process the data here
                    setQuizzes(data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });

            // const quizzesSnapshot = await getDocs(collection(db, "quiznames"));
            // const quizzesData = quizzesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            // //console.log(quizzesData)
            // setQuizzes(quizzesData);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    }

    useEffect(() => {

        //console.log(params.quizname, "kfmadsfka")
        if (gameOver) {
            setGameover(false)
            setStart(false)
            setOpen(false)
            setColor()
            setCopied(false)
            setCurrentQuestionIndex(0)
            setSelectedOption(null)
            setquestionsArray([])
            setName()
            setScore(0)
            setNames()
            setRemainingTime(30)
            handleEdit(params.quizname)
        } else {
            handleEdit(params.quizname)
        }
    }, [params.quizname])
    const handleClose = () => {
        setOpens(false);
    };
    const handleClickOpen = () => {
        setOpens(true);
    };
    
    
    const handleEdit = async (name) => {
        try {
            const apiUrl = `https://writers.explorethebuzz.com/api/quizzes/${name}`;
            const queryParams = [
                "fields[0]=name",
                "populate[thumbnail][fields][0]=url",
                "populate[qna][populate][media][fields]=url",
                "populate[qna][populate][options][populate][media][fields]=url"
            ];

            const queryString = queryParams.join("&");
            const fullUrl = `${apiUrl}?${queryString}`;

            fetch(fullUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Process the retrieved data here
                    setquestionsArray(data.data);

                    setName(data.data.name)
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                });

            // const quizDataRef = doc(db, "quizedata", name);
            // const quizDataSnapshot = await getDoc(quizDataRef);
            // if (quizDataSnapshot.exists()) {
            //     const retrievedData = quizDataSnapshot.data();
            //     //console.log(retrievedData.data)
            //     setquestionsArray(retrievedData.data);
            //     //console.log(retrievedData.data)

            //     setName(retrievedData.name)
            // } else {
            //     //console.log("Quiz data not found");
            //     setSelectedQuizData(null);
            // }
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    };

    const handleOptionClick = (optionIndex) => {
        setSelectedOption(optionIndex);
    };


    const handleNextClick = () => {
        randomNumberColor()

        if ((questionsArray.qna.length) === (currentQuestionIndex + 1)) {
            if (selectedOption && questionsArray.qna
            [currentQuestionIndex].options[selectedOption].correct
                === true) {
                setScore(score + 1);
            }

            setGameover(true)
            setrun(true)
            setTimeout(() => {
                setrun(false)
            }, 5000)
            //console.log("log out")
            return
        }

       
        if ((selectedOption !== null) && questionsArray && questionsArray.qna
        [currentQuestionIndex].options[selectedOption].correct) {
            //console.log(score)
            setScore((x) => x + 1);
            setSelectedOption(null)
            setRemainingTime(30)
            randomNumberColor()
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }else{
            setSelectedOption(null)
            setRemainingTime(30)
            randomNumberColor()
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }


    };

    const copyToClipboard = () => {
        const textArea = document.createElement('textarea');
        textArea.value = `https://mindpuzzlers.gangsofgamer.com/NormalQuiz/${params.quizname}`
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
    };
    const handleShareOnWhatsApp = () => {
        const link = `https://mindpuzzlers.gangsofgamer.com/NormalQuiz/${params.quizname}`; // Replace with your actual link

        // Construct the WhatsApp URL
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(link)}`;

        // Redirect to WhatsApp
        window.location.href = whatsappUrl;
    };
    const Gototheinstageam = () => {
        const instagramUrl = `https://www.instagram.com/`;

        // Open the Instagram profile URL in a new tab or window
        window.open(instagramUrl, '_blank');
    }

    return (
        <>
            {!questionsArray && !open && !gameOver && Start && <div>
                Loading
            </div>}
            {
                gameOver &&
                <><main className='Home_main__nLjiQ '>




                    <QuizRecommendation />

                    <div className="css-vg5ilo">Your score: <br />
                        {score} out of {questionsArray.qna.length}
                    </div>
                    {opens &&
                        <div>

                            <Dialog
                                open={opens}

                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle style={{ textAlign: "center" }}>{"Add To Your Instagram"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        <List>
                                            <ListItem>
                                                <CommentIcon style={{ marginRight: "10px" }} /> <ListItemText primary={`Go into Your Instagram `} />
                                            </ListItem>
                                            <ListItem>
                                                <CommentIcon style={{ marginRight: "10px" }} /> <ListItemText primary={`tap the "Edit Profile" button`} />
                                            </ListItem>
                                            <ListItem>
                                                <CommentIcon style={{ marginRight: "10px" }} /> <ListItemText primary={`Add Your Link To Website Link" field`} />
                                            </ListItem>
                                            <ListItem>
                                                <CommentIcon style={{ marginRight: "10px" }} /> <ListItemText primary={`Save Changes`} />
                                            </ListItem>

                                        </List>

                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button style={{ backgroundColor: "#FE2C54", color: "white", marginTop: "10px" }} onClick={handleClose}>Close</Button>
                                    <Button style={{ backgroundColor: "#22c35e", color: "white", marginTop: "10px" }} onClick={() => Gototheinstageam()}>Goto the Instagram</Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                    }
                    {run && <Confetti
                        width={size.width}
                        height={size.height}

                        run={run}

                    />}
                    <div className='css-1e0mhkg '>
                        <div className='css-1x61a8'>
                            <div className='css-cu0uac '>
                                Your Quiz is ready!
                                <br />
                                Share your Quiz link with all your friends and see their results.
                            </div>
                            <div className='css-19nn44a'>
                                <input className='Input' value={`https://mindpuzzlers.gangsofgamer.com/${params.quizname}`} />

                                <Button className='Witdh' style={{ backgroundColor: "#FE2C54", color: "white", marginTop: "10px" }} onClick={copyToClipboard}>Copy Link</Button>
                                {copied && <p>Copied to clipboard!</p>}
                                <Button className='Witdh' style={{ backgroundColor: "#22c35e", color: "white", marginTop: "10px" }} onClick={handleShareOnWhatsApp}>Send Quiz In whatsapp</Button>
                                <Button className='Witdh' style={{ backgroundColor: "#E53E3E", color: "white", marginTop: "10px" }} onClick={() => setOpens(true)}>Add In Instagram Bio</Button>

                                {/* <Button className='Witdh' style={{ backgroundColor: "#E53E3E", color: "white", marginTop: "10px" }} onClick={copyToClipboard}>Add In Instagram Bio</Button> */}


                            </div>

                        </div>

                    </div>
                    <div className="css-ffdj00">
                        <p class="chakra-text css-d755lw" style={{ margin: "0px" }}>Create your Quiz</p>
                        <br />
                        It is your turn now. send it to your Friends! and see how good they are
                        <br />
                        <Link style={{ width: "100%" }} to={"/"}>
                            <Button style={{ backgroundColor: "#805AD5", with: "100%", marginTop: "5px", borderRadius: "10px" }} variant="contained" onClick={handleNextClick}>Get Started</Button>
                        </Link>
                    </div>




                </main>
                </>


            }
            {!Start && !open &&
                <main className="Home_main">

                    <div className="NEWBOX">
                        {questionsArray && questionsArray.thumbnail &&
                            <div className="css-qrax4f">
                                <div className="css-sb08dx">
                                    <span className="sapn1">
                                        <span className="span2">
                                            <img className="Image" src={`https://writers.explorethebuzz.com${questionsArray.thumbnail.url}`} alt="Question Image" />

                                        </span>

                                    </span>
                                    <h2 className="Box css-cu0uac ">{name}</h2>
                                </div>


                            </div>}

                        <div className="Box Gmestabox css-cu0uac ">




                            <Button variant="contained" style={{ backgroundColor: "rgb(254, 44, 84)", width: "100%" }} className="button" onClick={() => setStart(true)}>  Get Started</Button>
                        </div>
                    </div>
                    <p class="chakra-text css-1llf3l7">How to play?</p>
                    <ul className="css-qdfofv" role="list" >
                        <li className="css-dl50kq">
                            <HistoryIcon className="css-5atgzs " />
                            <span>You will get 30 seconds to answer each question</span>
                        </li>
                        <li className="css-dl50kq">
                            <BarChartIcon className="css-5atgzs " />
                            <span>You will see correct answers and your score after end of the quiz</span>
                        </li>
                        <li className="css-dl50kq">
                            <ShareIcon className="css-5atgzs " />
                            <span>Do share your results on social media and invite others for quiz too.</span>
                        </li>

                    </ul>

                    {/* 
                    <div className="css-1uybl6b ">
                        <div className="css-14gl5v3">
                            <div className="css-oldy3w">
                            Prove how well you {name}
                            </div>
                            <div className="css-cu0uac ">
                                What is your Name
                            </div>
                        </div>

                    </div> */}
                </main>

            }

            {questionsArray && !gameOver && Start &&
                <div>

                    <div className="Score">
                        <Typography className="scorebutton" style={{ backgroundColor: !color ? "#ff5722" : color }} variant="body1" >Score: {score}/{questionsArray.qna.length}</Typography>

                    </div>
                    <div className="css-q0xr6t" style={{ backgroundColor: !color ? "#ff5722" : color }}>

                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className="css-1mygs9k ">
                            <Typography className="Timer" style={{ marginTop: "0px" }} variant="h6">
                                {remainingTime}
                            </Typography>
                            {questionsArray && questionsArray.qna[currentQuestionIndex].media &&
                                <div className="css-qrax4f">
                                    <div className="css-sb08dx">
                                        <span className="sapn1">
                                            <span className="span2">
                                                <img className="Image" src={`https://writers.explorethebuzz.com${questionsArray.qna[currentQuestionIndex].media.url}`} alt="Question Image" />

                                            </span>

                                        </span>
                                    </div>
                                </div>}
                            <Typography style={{ marginTop: "20px" }} variant="h6">{questionsArray.qna[currentQuestionIndex].question
                            } ?

                            </Typography>



                        </div>
                        <div className="css-19nn44a ">
                            <ui className="css-1xa84ef"  >
                                {questionsArray && questionsArray.qna[currentQuestionIndex].options
                                    .map((option, index) => (
                                        <li
                                            key={index}
                                            variant={selectedOption ? 'contained' : 'outlined'}
                                            onClick={() => handleOptionClick(index)}
                                            disabled={selectedOption !== null}
                                            style={{
                                                backgroundColor: selectedOption === null ? "rgb(240, 240, 246)"
                                                    : questionsArray.qna[currentQuestionIndex].options[index].correct

                                                        === true ?
                                                        'green' :
                                                        selectedOption === index ? 'red' : "rgb(240, 240, 246)",

                                                color: selectedOption === null ? "black" :
                                                    selectedOption === index ? "white" :
                                                        (questionsArray.qna[currentQuestionIndex].options[index].correct) === true

                                                            ? "white" : "black"
                                                ,
                                                pointerEvents: selectedOption !== null ? 'none' : 'auto',
                                                cursor: selectedOption !== null ? 'not-allowed' : 'pointer'
                                            }}>
                                            {option.text}
                                        </li>
                                    ))}
                            </ui>
                        </div>
                    </div>
                    <div>

                    </div>
                    {/* {selectedOption === null && (
                        <div style={{ marginTop: '5px' }}>
                            <Typography variant="body1" color="error">
                              
                            </Typography>
                        </div>
                    )} */}
                    <Button style={{ backgroundColor: !color ? "#ff5722" : color, marginTop: "10px" }} variant="contained" onClick={handleNextClick}>Next</Button>

                </div>}
        </>

    );
};

export default NormalQuiz;
