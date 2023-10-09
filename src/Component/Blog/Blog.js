import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Link} from "react-router-dom";
const fethdata = async () => {

    try {
        const apiUrl = "https://writers.explorethebuzz.com/api/articles?filters[categories][id][$in][0]=9&populate[featureImage][fields][0]=url&fields[0]=title&fields[1]=slug&fields[2]=shortDesc&pagination[page]=1&pagination[pageSize]=10";

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for handling it outside
    }
}

const Blog = () => {
    const [blog, setLBogdata] = useState()
    useEffect(() => {
        const fetchDataAndSetQuizzes = async () => {
            try {
                const data = await fethdata();
                console.log(data, "data");
                setLBogdata(data.data); // Assuming setQuizzes is a state updater function
            } catch (error) {
                // Handle any errors here
            }
        };

        fetchDataAndSetQuizzes();

    }, [])

    return (
        <>
            <div>

                <div className="Indas">
                    <h2>India's  Trendig<span class="Mark">Blog</span></h2>
                    {blog && blog.map((x) => {
                        return (
                            <div>
                            <div style={{marginBottom:"50px"}}>
                                <Link style={{textDecoration: "none"}} to={`/Blogposdt/${x.id}`}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardHeader
                                   className="Cardtitile"
                                   style={{fontSize:"1rem"}}
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                R
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={x.title}
                                        subheader="September 14, 2016"
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={`https://writers.explorethebuzz.com${x.featureImage.url}`}
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {x.shortDesc}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
                                      
                                    </CardActions>

                                </Card>
                                </Link>

                            </div>

                        </div>
                        )
                       
                    })

                    }

                </div>





            </div>
        </>
    )
}

export default Blog;