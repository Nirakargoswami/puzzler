import React from "react";
import { Link } from "react-router-dom";
import "./Quizbox.css"
const Quizbox = ({ data }) => {
    return (
        <>

            <h2>
                Create Your  <span className="Mark">Quiz</span>
            </h2>
            <h2>Best Friend & Couple Quiz</h2>
            <div className="css-vr61ey ">
            {
                data.map((x) => {
                    return (
                        <Link style={{textDecoration:"none"}} to={`/quizpage/${x.name === "Best friend Quiz" ? "friend" : x.name === "couple Quiz" ? "couple" :x.name   }`}>
                            <div className="css-sdqkp0">
                              

                                    {x.img}
                                    <h3 style={{color:"black",fontSize:"17px"}}>{x.name}</h3>
                         


                            </div>
                        </Link>
                    )
                })
            }
            </div>
            


        </>
    )
}

export default Quizbox 