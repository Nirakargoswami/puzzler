import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

import { Getuserdata, doc, updateDoc, getDoc, collection, db, getDocs } from "../Firebase/firebse"
import "./ansqusionpage.css"
import { Button, LinearProgress, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { async } from "@firebase/util";

const QuizApp = () => {
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
    const [friendScores, setFriendScores] = useState([]);

    const params = useParams();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Color = ["#2979ff", "#ff5722", "#ffc400", "651fff", "#d500f9", "#e91e63", "#3d5afe", "#9c27b0"]

    const randomNumberColor = () => {
        const No = Math.floor(Math.random() * 9)

        setColor(Color[No])
    }

    useEffect(() => {

        if (params.quiId) {
            const getData = Getuserdata(params.quiId)
            getData.then((x) => {
                console.log((x))
                setquestionsArray(x)
            })
            Fetsh();
        }
    }, [])

    const handleOptionClick = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    const handleNextClick = () => {
        if (selectedOption === null) {
            handleClickOpen()
            return;
        }

        randomNumberColor()
        if ((questionsArray.data.length) === (currentQuestionIndex + 1)) {
            setGameover(true)
            setStart(true)
            const userDocRef = doc(db, 'Quizmingle', params.quiId);

            getDoc(userDocRef)
                .then((userDocSnapshot) => {
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        const existingFriendScores = userData.friendScore || [];

                        // Add new score to existing friend scores
                        const updatedFriendScores = [...existingFriendScores, { name: name, score: score }];

                        // Update the friendScore field with combined data
                        return updateDoc(userDocRef, {
                            friendScore: updatedFriendScores
                        });
                    } else {
                        console.log("User document not found");
                    }
                })
                .then(() => {
                    Fetsh(); // Update friend scores after updating the score
                    console.log('Friend score updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating friend score:', error);
                });

            return;

        }
        if (selectedOption !== null) {
            if (questionsArray.data[currentQuestionIndex].ans === selectedOption) {
                setScore(score + 1);
            }
            setSelectedOption(null)
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }

    };

    const Fetsh = async () => {

        const friendScoresCollection = doc(db, 'Quizmingle', params.quiId);
        const userDocSnapshot = await getDoc(friendScoresCollection);
        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const friendScoresData = userData.friendScore || [];
            console.log(friendScoresData)
            // Assuming the array of friends is named 'friends'
            setFriendScores(friendScoresData);
        }
    }

    const FetchFriendScores = () => {


        return (
            <TableContainer component={Paper}>
                <Table aria-label="friend-scores-table">
                    <TableHead style={{ textAlign: "center" }} >
                        <TableRow>
                            <TableCell>Friend </TableCell>
                            <TableCell align="right">Score</TableCell>
                        </TableRow>
                    </TableHead>
                    {friendScores ?
                        <TableBody>
                            {friendScores && friendScores.map((x) =>

                                <TableRow
                                    key={x.name} // Assuming you have a 'name' field in your Firestore documents
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell style={{ textAlign: "center" }} component="th" scope="row">
                                        {x.name}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }} >{x.score}</TableCell> {/* Assuming you have a 'score' field in your Firestore documents */}
                                </TableRow>


                            )}
                        </TableBody>
                        :
                        <caption class="css-7478fk">No data</caption>
                    }

                </Table>
            </TableContainer>
        )


    };



    const progress = ((currentQuestionIndex + 1) / questionsArray && questionsArray.data.length) * 100;

    return (
        <>
            {!questionsArray && !open && !gameOver && Start && <div>
                Loading
            </div>}
            {
                gameOver &&
                <main className="Home_main">
                    <div className="css-vg5ilo">Your score: <br />
                        {score} out of {questionsArray.data.length}
                    </div>

                    <div className="css-ffdj00">
                        <p class="chakra-text css-d755lw" style={{ margin: "0px" }}>Create your Quiz</p>
                        <br />
                        It is your turn now. Create your quiz and send it to your partner!
                        <br />
                        <Link style={{ width: "100%" }} to={"/"}>
                            <Button style={{ backgroundColor: "#805AD5", with: "100%", marginTop: "5px", borderRadius: "10px" }} variant="contained" onClick={handleNextClick}>Get Started</Button>
                        </Link>
                    </div>
                </main>


            }
            {!Start && !open &&
                <main className="Home_main">

                    <div>
                        <div className="css-oldy3w">
                            Prove how well you Know {questionsArray && questionsArray.name} ?
                        </div>
                        <div className="Box Gmestabox css-cu0uac ">
                            <h2 className="Box css-cu0uac ">What is your Name </h2>
                            <input className="css-1u1dnir " onChange={(e) => setName(e.target.value)}>

                            </input>

                            <Button variant="contained" style={{ backgroundColor: "rgb(254, 44, 84)", width: "100%" }} className="button" onClick={() => setStart(true)}>  Get Started</Button>
                        </div>
                    </div>

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

                    <div class="css-18fgjcj">
                        <p class="chakra-text css-d755lw">Create your Couple Quiz</p>
                        <br />
                        It is your turn now. Create your quiz and send it to your partner<br />
                        <Link style={{ width: "100%" }} to={"/"}>
                            <Button style={{ backgroundColor: "#805AD5", with: "100%", marginTop: "5px", borderRadius: "5px" }} variant="contained" onClick={handleNextClick}>Get Started</Button>
                        </Link>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div class="css-ipd9fp">
                            <p class="chakra-text css-d755lw">Top friends of {questionsArray && questionsArray.name}</p>
                            <br />
                            <div class="chakra-table__container css-zipzvv">



                                {friendScores &&

                                    FetchFriendScores()

                                }




                            </div>
                        </div>
                    </div>
                </main>


            }
            {gameOver &&
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div class="css-ipd9fp">
                        <p class="chakra-text css-d755lw">Top friends of {questionsArray && questionsArray.name}</p>
                        <br />
                        <div class="chakra-table__container css-zipzvv">



                            {friendScores &&

                                FetchFriendScores()

                            }




                        </div>
                    </div>
                </div>

            }
            {open &&
                <div>

                    <Dialog
                        open={open}

                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle style={{ fontSize: "13px", padding: "10px 10px " }}>{"Please select an option before clicking Next"}</DialogTitle>


                    </Dialog>
                </div>
            }
            {questionsArray && !gameOver && Start &&
                <div>

                    <div className="Score">
                        <Typography className="scorebutton" style={{ backgroundColor: !color ? "#ff5722" : color }} variant="body1" >Score: {score}/{questionsArray.data.length}</Typography>

                    </div>
                    <div className="css-q0xr6t" style={{ backgroundColor: !color ? "#ff5722" : color }}>
                        <div className="css-1mygs9k ">
                            <Typography variant="h6"> {questionsArray.data[currentQuestionIndex].question.replace(
                                /\b(your|you|my|mine)\b/g,
                                name || "your"
                            )}</Typography>

                        </div>
                        <div className="css-19nn44a ">
                            <ui className="css-1xa84ef"  >
                                {questionsArray.data[currentQuestionIndex].options.map((option, index) => (
                                    <li
                                        key={index}
                                        variant={selectedOption === index ? 'contained' : 'outlined'}
                                        onClick={() => handleOptionClick(index)}
                                        disabled={selectedOption !== null}
                                        style={{
                                            backgroundColor: selectedOption === null ? "rgb(240, 240, 246)" : questionsArray.data[currentQuestionIndex].ans === index ?
                                                'green' :
                                                selectedOption === index ? 'red' : "rgb(240, 240, 246)",

                                            color: selectedOption === index
                                                ? questionsArray.data[currentQuestionIndex].ans === index
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

export default QuizApp;
