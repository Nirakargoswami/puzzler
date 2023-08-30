import React, { useEffect, useState } from 'react';
import { Creatuser } from "../../Firebase/firebse"
import CancelIcon from '@mui/icons-material/Cancel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import LoadingSpiner from "../Spiner/Spiner"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';

import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';

import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
const QuestionEditor = ({ data, name, type }) => {
  console.log("its working ", data)
  // Step 2: Set up the component's state
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState(false);
  const [Addinsta, SEtAddinst] = useState(false)
  const [id, setID] = useState()
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const [ShowShairLink, setShowShairLink] = useState(false)
  // Step 3: Provide UI elements to add, edit, and delete questions and options
  function handleQuestionChange(event, index) {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    setQuestions(data)
  }, [])

  function handleOptionChange(event, questionIndex, optionIndex) {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  }
  const selecct = (questionIndex, selec) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].ans = selec
    setQuestions(newQuestions)
  }
  function handleAddOption(questionIndex) {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  }

  const HandleOptionchange = (index, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[index].options.splice(optionIndex, 1)
    setQuestions(newQuestions);
  }
  function handleRemoveQuestion(questionIndex) {
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    console.log(newQuestions)
    setQuestions(newQuestions);
  }

  function handleAddQuestion() {
    const newQuestions = [...questions, { question: '', options: ['', '', '', ''] }];
    setQuestions(newQuestions);
  }

  const MakeaQuestioui = () => {
    return (
      <>
        <main className='Home_main__nLjiQ'>
          {questions && questions.map((q, index) => (
            <div className='css-1xsveqn' key={index}>
              <div className='css-15hb4qy'>Question {index + 1}</div>
              <div className='css-r4358i'>

                <textarea type="text"
                  className='Inputs textarea css-1gxocc'
                  rows="auto"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(e, index)}>{q.question}</textarea>
                <br />
                {q.options.map((option, optionIndex) => {
                  return (
                    <div className='css-5k76gu '>
                      <FormControlLabel className='SLect' control={<Checkbox size="small" checked={(q.ans == optionIndex) ? true : false} className='SLect' onClick={() => selecct(index, optionIndex)} />} />

                      <textarea
                        key={optionIndex}
                        type="text"
                        value={option}
                        className="Input textarea css-1gxocc"
                        onChange={(e) => handleOptionChange(e, index, optionIndex)}
                      />


                      <CancelIcon className='Cancle' onClick={() => HandleOptionchange(index, optionIndex)} />

                      <br />
                    </div>
                  )
                }


                )}


              </div>

              <Button style={{ backgroundColor: "#805AD5", color: "white" }} onClick={() => handleAddOption(index)} className="Ma MB" variant="contained">Add Option</Button>

              <Button style={{ backgroundColor: "#805AD5", color: "white" }} onClick={() => handleRemoveQuestion(index)} className="Ma MB" variant="contained">Remove Question</Button>

            </div>
          ))}
          {questions &&
            <>
              <Button onClick={handleAddQuestion} style={{ backgroundColor: "#805AD5", color: "white" }} className="MT " variant="contained">Add Question</Button>
              <Button onClick={handleSubmit} style={{ backgroundColor: "rgb(255, 15, 57)", marginTop: "20px !important" }} className="MT" variant="contained" color="success" >Submit</Button>
            </>
          }


        </main>
      </>
    )
  }

  useEffect(() => {
    MakeaQuestioui()
  }, [questions])
  // Step 5: Implement the handleSubmit function
  function handleSubmit() {
    console.log('Submitted data:', questions);
    setLoading(true)
    const Ans = Creatuser(questions, name, type)
    if (Ans) {
      Ans.then((x) => {
        console.log(x)
        setID(x)
        setShowShairLink(true)
        setLoading(false)
      })


    }
    // You can perform additional actions here, such as sending the data to a server.
    // For demonstration purposes, we are just logging the data to the console.
  }

  const copyToClipboard = () => {
    const textArea = document.createElement('textarea');
    textArea.value = `https://mindpuzzlers.gangsofgamer.com/quizpage/Anstpage/${id}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
  };
  const handleShareOnWhatsApp = () => {
    const link = `https://mindpuzzlers.gangsofgamer.com/quizpage/Anstpage/${id}`; // Replace with your actual link

    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(link)}`;

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
  };
  const copyAndRedirect = async () => {
    try {
      await navigator.clipboard.writeText(`https://mindpuzzlers.gangsofgamer.com/quizpage/Anstpage/${id}`);
      window.location.href = "your-wp-app-link";
    } catch (error) {
      console.error("Error copying link: ", error);
    }
  };
  const Gototheinstageam = () => {
    const instagramUrl = `https://www.instagram.com/`;

    // Open the Instagram profile URL in a new tab or window
    window.open(instagramUrl, '_blank');
  }

  // Step 4: Render the UI
  return (
    <>
      {!id && !loading &&
        <div className='Home_container__bCOhY'>


          {MakeaQuestioui()}
        </div>


      }
      {loading &&
        <LoadingSpiner />
      }

      {id && ShowShairLink && !loading &&
        <main className='Home_main__nLjiQ '>
          <div className='css-1e0mhkg '>
            <div className='css-1x61a8'>
              <div className='css-cu0uac '>
                Your Quiz is ready!
                <br />
                Share your Quiz link with all your friends and see their results.
              </div>
              {open &&
                <div>
                  
                  <Dialog
                    open={open}

                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle style={{textAlign:"center"}}>{"Add To Your Instagram"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        <List>
                        <ListItem>
                          <CommentIcon style={{marginRight:"10px"}} /> <ListItemText primary={`Go into Your Instagram `} />
                          </ListItem>
                          <ListItem>
                          <CommentIcon style={{marginRight:"10px"}} /> <ListItemText primary={`tap the "Edit Profile" button`} />
                          </ListItem>
                          <ListItem>
                          <CommentIcon style={{marginRight:"10px"}} /> <ListItemText primary={`Add Your Link To Website Link" field`} /> 
                          </ListItem>
                          <ListItem>
                          <CommentIcon style={{marginRight:"10px"}} /> <ListItemText primary={`Save Changes`} /> 
                          </ListItem>

                          </List>
                         
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button  style={{ backgroundColor: "#FE2C54", color: "white", marginTop: "10px" }}onClick={handleClose}>Close</Button>
                      <Button  style={{ backgroundColor: "#22c35e", color: "white", marginTop: "10px" }} onClick={() => Gototheinstageam()}>Goto the Instagram</Button>
                    </DialogActions>
                  </Dialog>
                </div>

              }
              <div className='css-19nn44a'>
                <input className='Input' value={`https://mindpuzzlers.gangsofgamer.com/quizpage/Anstpage/${id}`} />

                <Button className='Witdh' style={{ backgroundColor: "#FE2C54", color: "white", marginTop: "10px" }} onClick={copyToClipboard}>Copy Link</Button>
                {copied && <p>Copied to clipboard!</p>}
                <Button className='Witdh' style={{ backgroundColor: "#22c35e", color: "white", marginTop: "10px" }} onClick={handleShareOnWhatsApp}>Send Quiz In whatsapp</Button>
                <Button className='Witdh' style={{ backgroundColor: "#E53E3E", color: "white", marginTop: "10px" }} onClick={() => setOpen(true)}>Add In Instagram Bio</Button>


              </div>

            </div>

          </div>


        </main>
      }
    </>
  );
};

export default QuestionEditor;
