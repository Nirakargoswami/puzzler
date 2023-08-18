import React, { useEffect, useState } from "react";
import QuestionEditor from "../Component/QiestonAns/Qannas"
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { MainQuizquestion } from "../Constatant/constatn"
import { PreshowofQuiz } from "../Constatant/constatn"
const quizpage = () => {
    const [data, setdata] = useState()
    const [Predata, setPredata] = useState()
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [Error, setError] = useState()
    const params = useParams();
    console.log(params)

    const GEtstart = () => {
        if (name) {
            setShow(true)
           
        } else {
            setError(true)
            setTimeout(() => {
                setError(false)
            },[2500])
        }

    }

    useEffect(() => {

        setdata(MainQuizquestion[params.quizname])
        setPredata(PreshowofQuiz[params.quizname])
    }, [])
    console.log(PreshowofQuiz, MainQuizquestion)

    return (
        <div >
            {
                Predata && !show &&

                <div className="MainboxCol Box">

                    {Predata.img}
                    <h1 className="Marks Mb MT">
                        {Predata.name}
                    </h1>
                    {
            Error && 
            <Alert variant="filled" severity="error">
                Please Enter The Name
            </Alert>}
                    <h3 className="Box Mainfor">{Predata.question}</h3>
                    <div className="Box Gmestabox css-cu0uac ">
                        <h2 className="Box css-cu0uac ">What is your Name </h2>
                        <input className="css-1u1dnir " onChange={(e) => setName(e.target.value)}>

                        </input>

                        <Button variant="contained" style={{ backgroundColor: "rgb(254, 44, 84)" }} className="button" onClick={GEtstart}>  Get Started</Button>
                    </div>

                </div>

            }
            {


            }

            {data && show &&
                <QuestionEditor data={data && data} name={name && name} />}
        </div>
    )
}

export default quizpage;