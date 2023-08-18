import React, { useEffect, useState } from 'react';
import { Creatuser, updateDoc } from "../../src/Firebase/firebse"
import CancelIcon from '@mui/icons-material/Cancel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FullScreenDialog from "../Component/AditQuiz/Aditquiz"
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LoadingSpiner from "../Component/Spiner/Spiner"
import { HandleImageUpdload, retrieveImage, addDoc, getDoc, getDocs, setDoc, db, collection, doc } from "../Firebase/firebse"
const QuestionEditor = () => {
    // Step 2: Set up the component's state
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isImageQuestion, setIsImageQuestion] = useState(false);
    const [quizeiamge, setquizeiamge] = useState()
    const [name, setName] = useState()
    const [Imageurl, setImageurl] = useState()
    const [allquizdata, setallquizdata] = useState()
    const [id, setID] = useState()
    const [questionImageURLs, setQuestionImageURLs] = useState({});
    const [Edit, setEdit] = useState(false)

    const [copied, setCopied] = useState(false);
    const [Mainimag, setMainimag] = useState()
    const [ShowShairLink, setShowShairLink] = useState(false)
    // Step 3: Provide UI elements to add, edit, and delete questions and options

    const Sample = [

        {
            question: { text: 'Question', image: null },
            options: [
                'Option 1',
                'option 2',
                'Option 3',
                'Option 4',
                'Option 5',
            ],

        },

    ]

    const Delettheimage = (index) =>{

 const newQuestions = [...questions];
    newQuestions[index].question.image = null; // Set the image property to null
    newQuestions[index].question.url = null; // Set the image URL to null
    setQuestions(newQuestions);
    Render()
    }
    const Render = () => {
        return (
            <main className='Home_main__nLjiQ'>

                <textarea

                    type="text"
                    value={name}
                    placeholder="Quize Name"
                    className="Input textarea css-1gxocc"
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                Quiz Image
                <input type="file"
                    onChange={(e) => Quizeimage(e)} />

                {Mainimag &&
                    <div className="css-qrax4f">
                        <div className="css-sb08dx">
                            <span className="sapn1">
                                <span className="span2">
                                    <img className="Image" src={Mainimag} />

                                </span>

                            </span>
                        </div>
                    </div>

                }


                {questions && questions.map((q, index) => (
                    <div className='css-1xsveqn' key={index}>
                        <div className='css-15hb4qy'>Question {index + 1}</div>
                        <div className='css-r4358i'>



                            <>

                                {
                                    q.question.url ?
                                        (
                                            <>
                                                <div className="css-qrax4f">
                                                    <div className="css-sb08dx">
                                                        <span className="sapn1">
                                                            <span className="span2">
                                                                <img className="Image" src={q.question.url} />
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button onClick={() => Delettheimage(index)}>
                                                    DElet The image
                                                </Button>
                                            </>
                                        ) :
                                        (
                                            <>
                                                <div className="css-qrax4f">
                                                    <div className="css-sb08dx">
                                                        <span className="sapn1">
                                                            <span className="span2">
                                                                <img className="Image" src={questionImageURLs[index]} />
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button onClick={() => Delettheimage(index)}>
                                                    DElet The image
                                                </Button>
                                            </>
                                        )
                                }
                            </>




                            <>
                                <input type="file" onChange={(e) => handleImageChange(e, index)} />
                            </>

                            <textarea
                                type="text"
                                className='Inputs textarea css-1gxocc'
                                rows="auto"
                                onChange={(e) => handleQuestionChange(e, index)}
                            >
                                {q.question.text}
                            </textarea>


                            <div>or</div>

                            <Button onClick={SetImage} style={{ backgroundColor: "rgb(255, 15, 57)", }} className="MT" variant="contained" color="success" >Image</Button>


                            {/* <textarea type="text"
                        className='Inputs textarea css-1gxocc'
                        rows="auto"
                        onChange={(e) => handleQuestionChange(e, index)}>{q.question}</textarea> */}
                            <br />
                            {q.options.map((option, optionIndex) => {
                                return (
                                    <div className='css-5k76gu '>
                                        <FormControlLabel className='SLect' control={
                                            <Checkbox size="small" className='SLect' onClick={() => selecct(index, optionIndex)} />
                                        } />
                                        <textarea
                                            key={optionIndex}
                                            type="text"
                                            style={{ padding: "0px 16px" }}
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
                <Button onClick={handleAddQuestion} style={{ backgroundColor: "#805AD5", color: "white", padding: "3px 7px" }} className="MT " variant="contained">Add Question</Button>
                <Button onClick={handleSubmit} style={{ backgroundColor: "rgb(255, 15, 57)", marginTop: "20px !important", padding: "3px 7px" }} className="MT" variant="contained" color="success" >Submit</Button>


            </main>
        )
    }

    useEffect(() => {
        Render()
    }, [questions])

    function handleQuestionChange(event, index) {
        const newQuestions = [...questions];
        newQuestions[index].question.text = event.target.value;
        setQuestions(newQuestions);

        // Check if the question starts with a specific prefix to identify image questions

    }

    const SetImage = () => {
        setIsImageQuestion(true)
    }




    const Quizeimage = (event) => {
        const imageFile = event.target.files[0]
        console.log(imageFile.name)

        setquizeiamge(imageFile.name)
        const imageurl = retrieveImage(imageFile.name)
        imageurl.then((x) => {
            setMainimag(x)
        })
        HandleImageUpdload(event).then((x) => {
            setImageurl(x)
        })
    }
    function handleOptionChange(event, questionIndex, optionIndex) {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = event.target.value;
        setQuestions(newQuestions);
    }
    const selecct = (questionIndex, selec) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].ans = selec
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
        setQuestions(newQuestions);
    }

    function handleAddQuestion() {
        setIsImageQuestion(false)
        const newQuestions = [...questions, { question: { text: '', image: null }, options: ['', '', '', ''] }];
        setQuestions(newQuestions);
    }
    function handleImageChange(event, questionIndex) {
        const newQuestions = [...questions];
        const imageFile = event.target.files[0];
        // Mark this question as an image question
        newQuestions[questionIndex].question.image = imageFile.name;
        setQuestions(newQuestions);

        HandleImageUpdload(event).then((downloadURL) => {
            newQuestions[questionIndex].question.url = downloadURL
            setQuestionImageURLs((prevURLs) => ({
                ...prevURLs,
                [questionIndex]: downloadURL,
            }));
        });
    }
    // Step 5: Implement the handleSubmit function
    async function handleSubmit() {
        if (!name) {
            alert("pleae add naem to save quize")
            return
        }
        // const textQuestions = questions.filter((q) => !q.question.startsWith('[IMAGE]'));
        // const imageQuestions = questions.filter((q) => q.question.startsWith('[IMAGE]'));

        // Handle text questions (send to server, etc.)
        // console.log('Text Questions:', textQuestions);

        // Handle image questions (upload images, etc.)
        // for (const imageQuestion of imageQuestions) {
        //     const imageFile = imageQuestion.imageFile;

        //     // Use appropriate code to upload imageFile to a storage service
        //     // For example, using Firebase Storage:
        //     // const imageUrl = await uploadImageToStorage(imageFile);

        //     // console.log('Image URL:', imageUrl);
        // }

        if (questions.length === 0) {
            console.log("No questions to submit.");
            return;
        }

        const quizName = name; // Replace with the actual quiz name
        const quizData = questions;

        try {
            const quizNameRef = collection(db, "quiznames");
            const quizNameQuerySnapshot = await getDocs(quizNameRef);
            const existingQuizNames = quizNameQuerySnapshot.docs.map((doc) => doc.data().name);

            if (existingQuizNames.includes(quizName)) {
                const quizDocRef = doc(db, "quizedata", quizName.split(" ").join(""));
                const quizDocSnapshot = await getDoc(quizDocRef);

                if (quizDocSnapshot.exists()) {
                    // Update the quiz data

console.log(quizDocRef)
                    // Save the updated quiz data back to 'quizedata' collection
                    await updateDoc(quizDocRef, {  data: quizData, name: quizName, Image: allquizdata.Image, quizeimgeurl: allquizdata.quizeimgeurl });

                    console.log('Quiz data updated successfully.');
                } else {
                    console.log("Quiz data not found for updating.");
                }

                return;
            }
            // Step 1: Save quiz name to the 'quiznames' collection
            await addDoc(collection(db, "quiznames"), { name: quizName, image: quizeiamge, quryname: quizName.split(" ").join(""), quizeimgeurl: Imageurl });

            // Step 2: Save quiz data to the 'quizedata' collection with the same name as document ID
            const quizDocRef = doc(db, "quizedata", quizName.split(" ").join(""));
            await setDoc(quizDocRef, { data: quizData, name: quizName, Image: quizeiamge, quizeimgeurl: Imageurl });

            console.log('Quiz data submitted successfully.');
            // You can also show success messages or perform other actions here.
        } catch (error) {
            console.error('Error submitting quiz data:', error);
        }
        console.log('Submitted data:', questions);
        // setLoading(true)
        // const Ans = Creatuser(questions)
        // if (Ans) {
        //   Ans.then((x) => {
        //     console.log(x)
        //     setID(x)
        //     setShowShairLink(true)
        //     setLoading(false)
        //   })


        // }
        // You can perform additional actions here, such as sending the data to a server.
        // For demonstration purposes, we are just logging the data to the console.
    }



    // const copyToClipboard = () => {
    //     const textArea = document.createElement('textarea');
    //     textArea.value = `http://localhost:3000/quizpage/Anstpage/${id}`;
    //     document.body.appendChild(textArea);
    //     textArea.select();
    //     document.execCommand('copy');
    //     document.body.removeChild(textArea);
    //     setCopied(true);
    // };
    const handleShareOnWhatsApp = () => {
        const link = `http://localhost:3000/quizpage/Anstpage/${id}`; // Replace with your actual link

        // Construct the WhatsApp URL
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(link)}`;

        // Redirect to WhatsApp
        window.location.href = whatsappUrl;
    };
    const copyAndRedirect = async () => {
        try {
            await navigator.clipboard.writeText(`http://localhost:3000/quizpage/Anstpage/${id}`);
            window.location.href = "your-wp-app-link";
        } catch (error) {
            console.error("Error copying link: ", error);
        }
    };
    // Step 4: Render the UI
    return (
        <>
            {!id && !loading &&
                <div className='Home_container__bCOhY Flex'>
                    <FullScreenDialog onClick={() => setEdit(true)} setallquizdata={setallquizdata} setMainimag={setMainimag} setQuestions={setQuestions} setName={setName} setImageurl={setImageurl} />
                    {
                        questions &&
                        Render()
                    }


                </div>


            }
            {loading &&
                <LoadingSpiner />
            }

            {/* {id && ShowShairLink && !loading &&
                <main className='Home_main__nLjiQ '>
                    <div className='css-1e0mhkg '>
                        <div className='css-1x61a8'>
                            <div className='css-cu0uac '>
                                Your Quiz is ready!
                                <br />
                                Share your Quiz link with all your friends and see their results.
                            </div>
                            <div className='css-19nn44a'>
                                <input className='Input' value={`http://localhost:3000/quizpage/Anstpage/${id}`} />

                                <Button className='Witdh' style={{ backgroundColor: "#FE2C54", color: "white", marginTop: "10px" }} onClick={copyToClipboard}>Copy Link</Button>
                                {copied && <p>Copied to clipboard!</p>}
                                <Button className='Witdh' style={{ backgroundColor: "#22c35e", color: "white", marginTop: "10px" }} onClick={handleShareOnWhatsApp}>Send Quiz In whatsapp</Button>
                                <Button className='Witdh' style={{ backgroundColor: "#E53E3E", color: "white", marginTop: "10px" }} onClick={copyToClipboard}>Add In Instagram Bio</Button>


                            </div>

                        </div>

                    </div>


                </main>
            } */}
        </>
    );
};

export default QuestionEditor;
