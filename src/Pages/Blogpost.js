import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


const Blogposdt = () => {
    const [Blogdata, setBlogdata] = useState([])
    const params = useParams()
    console.log(params.Blogid)
    useEffect(() => {
        fethdata()
    }, [params.Blogid])
    const fethdata = async () => {
        try {
            const apiUrl = `https://writers.explorethebuzz.com/api/articles/${params.Blogid}?populate[featureImage][fields][0]=url`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const Maindata = JSON.parse(data.data.content)
                    //console.log(data); // You can process the data here
                    setBlogdata(Maindata);
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

    console.log(Blogdata, "Blogdata")
    return (
        <>
            <div>
                <div>
                    {Blogdata.blocks && Blogdata.blocks
                        .map((block, index) => {
                            if (block.type === 'paragraph') {
                                return (
                                    <Typography
                                    className="BlogTite"
                                        key={index}
                                        variant="body1"
                                        dangerouslySetInnerHTML={{ __html: block.data.text }}
                                    />
                                );
                            } else if (block.type === 'image') {
                                return (
                                    <Card key={index}>
                                        
                                        <CardMedia
                                       
                                            component="img"
                                            alt="Image"
                                            height="auto"
                                            src={`https://writers.explorethebuzz.com${block.data.file.url}`}
                                        />
                                    </Card>
                                );
                            } else if (block.type === 'LinkTool') {
                                return (
                                    <Link key={index} src={block.data.link} target="_blank" rel="noopener noreferrer">
                                        {block.data.link}
                                    </Link>
                                );
                            }
                            return null; // Handle other block types as needed
                        })}
                </div>

            </div>
        </>
    )
}

export default Blogposdt;