import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { db, collection, getDocs, deleteDoc, doc, getDoc } from '../Firebase/firebse'; // Import necessary Firebase modules

import "./ansqusionpage.css"
import { Button, Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
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
    const [Mainuser, setMainuser] = useState()
    const [color, setColor] = useState()
    const [open, setOpen] = useState(false);
    const [remainingTime, setRemainingTime] = useState(30); // Initialize timer with 30 seconds
    const [copied, setCopied] = useState(false);
    const params = useParams();
    const handleClickOpen = () => {
        setOpen(true);
    };

    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" {...props} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }


    const handleClose = () => {
        setOpen(false);
    };

    const Color = ["#2979ff", "#ff5722", "#ffc400", "651fff", "#d500f9", "#e91e63", "#3d5afe", "#9c27b0"]

    const randomNumberColor = () => {

        const No = Math.floor(Math.random() * 9)

        setColor(Color[No])
    }


    useEffect(() => {

        if (params.quizname) {
            handleEdit(params.quizname)
            console.log(params.quizname)
        }
    }, [params.quizname])

    useEffect(() => {
        let timer;

        if (Start && !gameOver && questionsArray) {
            timer = setTimeout(() => {
                if (remainingTime > 1) {
                    setRemainingTime(remainingTime - 1);
                } else {
                    console.log("fasdfafa")
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
            console.log("remainingTime")
            if (questionsArray[currentQuestionIndex].ans === selectedOption) {
                setScore(score + 1);
            }
            setSelectedOption(null)
            setRemainingTime(30)
            randomNumberColor()

            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }, [remainingTime])
    useEffect(() => {
        handleEdit(params.quizname)
    }, [params.quizname])

    const handleEdit = async (name) => {
        try {
            const quizDataRef = doc(db, "quizedata", name);
            const quizDataSnapshot = await getDoc(quizDataRef);
            if (quizDataSnapshot.exists()) {
                const retrievedData = quizDataSnapshot.data();
                console.log(retrievedData.data)
                setquestionsArray(retrievedData.data);
                console.log(retrievedData.data)

                setName(retrievedData.name)
            } else {
                console.log("Quiz data not found");
                setSelectedQuizData(null);
            }
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    };
    const handleOptionClick = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    const handleNextClick = () => {


        randomNumberColor()
        if ((questionsArray.length) === (currentQuestionIndex + 1)) {
            if (questionsArray[currentQuestionIndex].ans === selectedOption) {
                setScore(score + 1);
            }
            setGameover(true)
            return
        }
        if (questionsArray[currentQuestionIndex].ans === selectedOption) {
            setScore(score + 1);
        }
        console.log(remainingTime)
        setSelectedOption(null)
        setRemainingTime(30)
        randomNumberColor()


        setCurrentQuestionIndex(currentQuestionIndex + 1);

    };
    const copyToClipboard = () => {
        const textArea = document.createElement('textarea');
        textArea.value = `http://localhost:3000/NormalQuiz/${params.quizname}`
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
    };
    const handleShareOnWhatsApp = () => {
        const link = `http://localhost:3000/NormalQuiz/${params.quizname}`; // Replace with your actual link

        // Construct the WhatsApp URL
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(link)}`;

        // Redirect to WhatsApp
        window.location.href = whatsappUrl;
    };
    const progress = ((currentQuestionIndex + 1) / questionsArray && questionsArray.length) * 100;

    return (
        <>
            {!questionsArray && !open && !gameOver && Start && <div>
                Loading
            </div>}
            {
                gameOver &&
                <><main className='Home_main__nLjiQ '>
                    <div className="css-vg5ilo">Your score: <br />
                        {score} out of {questionsArray.length}
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
                    
                        <div className='css-1e0mhkg '>
                            <div className='css-1x61a8'>
                                <div className='css-cu0uac '>
                                    Your Quiz is ready!
                                    <br />
                                    Share your Quiz link with all your friends and see their results.
                                </div>
                                <div className='css-19nn44a'>
                                    <input className='Input' value={`http://localhost:3000/NormalQuiz/${params.quizname}`} />

                                    <Button className='Witdh' style={{ backgroundColor: "#FE2C54", color: "white", marginTop: "10px" }} onClick={copyToClipboard}>Copy Link</Button>
                                    {copied && <p>Copied to clipboard!</p>}
                                    <Button className='Witdh' style={{ backgroundColor: "#22c35e", color: "white", marginTop: "10px" }} onClick={handleShareOnWhatsApp}>Send Quiz In whatsapp</Button>
                                    <Button className='Witdh' style={{ backgroundColor: "#E53E3E", color: "white", marginTop: "10px" }} onClick={copyToClipboard}>Add In Instagram Bio</Button>


                                </div>

                            </div>

                        </div>


                    </main>
                </>


            }
            {!Start && !open &&
                <main className="Home_main">

                    <div>

                        <div className="Box Gmestabox css-cu0uac ">
                            <h2 className="Box css-cu0uac ">What is your Name </h2>
                            <input className="css-1u1dnir " onChange={(e) => setName(e.target.value)}>

                            </input>

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
                        <Typography className="scorebutton" style={{ backgroundColor: !color ? "#ff5722" : color }} variant="body1" >Score: {score}/{questionsArray.length}</Typography>

                    </div>
                    <div className="css-q0xr6t" style={{ backgroundColor: !color ? "#ff5722" : color }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className="css-1mygs9k ">
                            {questionsArray[currentQuestionIndex].question.image &&
                                <div className="css-qrax4f">
                                    <div className="css-sb08dx">
                                        <span className="sapn1">
                                            <span className="span2">
                                                <img className="Image" src={`/${questionsArray[currentQuestionIndex].question.image}`} alt="Question Image" />

                                            </span>

                                        </span>
                                    </div>
                                </div>}
                            <Typography variant="h6">{questionsArray[currentQuestionIndex].question.text}</Typography>

                            <Typography className="Timer" style={{ marginTop: "10px" }} variant="h6">
                                {remainingTime}


                            </Typography>

                        </div>
                        <div className="css-19nn44a ">
                            <ui className="css-1xa84ef"  >
                                {questionsArray[currentQuestionIndex].options.map((option, index) => (
                                    <li
                                        key={index}
                                        variant={selectedOption === index ? 'contained' : 'outlined'}
                                        onClick={() => handleOptionClick(index)}
                                        disabled={selectedOption !== null}
                                        style={{
                                            backgroundColor: selectedOption === null ? "rgb(240, 240, 246)" : questionsArray[currentQuestionIndex].ans === index ?
                                                'green' :
                                                selectedOption === index ? 'red' : "rgb(240, 240, 246)",

                                            color: selectedOption === index
                                                ? questionsArray[currentQuestionIndex].ans === index
                                                    ? 'black'
                                                    : 'white'
                                                : 'black',
                                            pointerEvents: selectedOption !== null ? 'none' : 'auto',
                                            cursor: selectedOption !== null ? 'not-allowed' : 'pointer'
                                        }}>
                                        {option}
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
