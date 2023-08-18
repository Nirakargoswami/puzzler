import React, { useState, useEffect } from 'react';
import {db, collection, getDocs, deleteDoc, doc, getDoc } from '../../Firebase/firebse'; // Import necessary Firebase modules
import Button from '@mui/material/Button'; // Updated import
import TableContainer from '@mui/material/TableContainer'; // Updated import
import Table from '@mui/material/Table'; // Updated import
import TableHead from '@mui/material/TableHead'; // Updated import
import TableBody from '@mui/material/TableBody'; // Updated import
import TableRow from '@mui/material/TableRow'; // Updated import
import TableCell from '@mui/material/TableCell'; // Updated import
import Paper from '@mui/material/Paper'; // Updated import

const QuizTable = ({setQuestions,setName,setMainimag,setImageurl,handleClose,setallquizdata}) => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizData, setSelectedQuizData] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const quizzesSnapshot = await getDocs(collection(db, "quiznames"));
      const quizzesData = quizzesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuizzes(quizzesData);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleDelete = async (id, name) => {
    try {
      // Delete the quiz name document
      await deleteDoc(doc(db, "quiznames", id));
      console.log('Quiz name deleted successfully.');

      // Delete the corresponding quiz data using the name
      const quizDataRef = doc(db, "quizedata", name);
      await deleteDoc(quizDataRef);
      alert("Quiz data deleted successfully.")
      console.log('Quiz data deleted successfully.');

      fetchQuizzes();
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleEdit = async (name) => {
    try {
      const quizDataRef = doc(db, "quizedata", name.split(" ").join(""));
      const quizDataSnapshot = await getDoc(quizDataRef);
      if (quizDataSnapshot.exists()) {
        const retrievedData = quizDataSnapshot.data();
       console.log(retrievedData)
        setQuestions(retrievedData.data);
        setName(retrievedData.name)
        setMainimag(retrievedData.quizeimgeurl)
       
        setallquizdata(retrievedData)
        handleClose()
      } else {
        console.log("Quiz data not found");
        setSelectedQuizData(null);
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Quiz Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell>{quiz.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(quiz.name)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(quiz.id, quiz.quryname)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     
    </div>
  );
};

export default QuizTable;
