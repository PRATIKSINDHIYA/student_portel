import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, TextField, Container, Box, Typography, IconButton, Paper } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    email: '',
    phone: '',
    address: '',
    guardianName: '',
    guardianPhone: '',
    dateOfBirth: '',
    gender: '',
    // Add other fields here
  });
  const [viewStudent, setViewStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, 'students');
      const studentsSnapshot = await getDocs(studentsCollection);
      const studentsList = studentsSnapshot.docs.map((studentDoc) => ({ id: studentDoc.id, ...studentDoc.data() }));
      setStudents(studentsList);
    };

    fetchStudents();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const studentDocRef = doc(db, 'students', currentStudentId);
        const studentDoc = await getDoc(studentDocRef);
        if (studentDoc.exists()) {
          console.log('Updating document with ID:', currentStudentId);
          console.log('New student data:', newStudent);
          await updateDoc(studentDocRef, newStudent);
          console.log('Document updated with ID:', currentStudentId);
        } else {
          console.error('No document to update');
        }
      } else {
        const docRef = await addDoc(collection(db, 'students'), newStudent);
        console.log('Document added with ID:', docRef.id);
      }
      setShowModal(false);
      setIsEditing(false);
      setCurrentStudentId(null);
      // Refresh students list
      const studentsCollection = collection(db, 'students');
      const studentsSnapshot = await getDocs(studentsCollection);
      const studentsList = studentsSnapshot.docs.map((studentDoc) => ({ id: studentDoc.id, ...studentDoc.data() }));
      setStudents(studentsList);
    } catch (error) {
      console.error('Error adding/updating document:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      console.log('Attempting to delete document with ID:', id);
      await deleteDoc(doc(db, 'students', id));
      console.log('Document deleted with ID:', id);
      // Refresh students list
      const studentsCollection = collection(db, 'students');
      const studentsSnapshot = await getDocs(studentsCollection);
      const studentsList = studentsSnapshot.docs.map((studentDoc) => ({ id: studentDoc.id, ...studentDoc.data() }));
      setStudents(studentsList);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleEditStudent = (student) => {
    setNewStudent(student);
    setCurrentStudentId(student.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleViewStudent = (student) => {
    setViewStudent(student);
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Students
        </Typography>
        <Button variant="contained" color="primary" onClick={() => {
          setNewStudent({
            name: '',
            class: '',
            section: '',
            rollNumber: '',
            email: '',
            phone: '',
            address: '',
            guardianName: '',
            guardianPhone: '',
            dateOfBirth: '',
            gender: '',
            // Add other fields here
          });
          setIsEditing(false);
          setShowModal(true);
        }}>
          Add Student
        </Button>
        <Paper elevation={3} mt={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewStudent(student)}><Visibility /></IconButton>
                    <IconButton onClick={() => handleEditStudent(student)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDeleteStudent(student.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box
            p={4}
            bgcolor="background.paper"
            component={Paper}
            elevation={3}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {isEditing ? 'Edit Student' : 'Add Student'}
            </Typography>
            <form onSubmit={handleAddStudent}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
              <TextField
                label="Class"
                fullWidth
                margin="normal"
                value={newStudent.class}
                onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
              />
              <TextField
                label="Section"
                fullWidth
                margin="normal"
                value={newStudent.section}
                onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
              />
              <TextField
                label="Roll Number"
                fullWidth
                margin="normal"
                value={newStudent.rollNumber}
                onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
              <TextField
                label="Phone"
                fullWidth
                margin="normal"
                value={newStudent.phone}
                onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
              />
              <TextField
                label="Address"
                fullWidth
                margin="normal"
                value={newStudent.address}
                onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
              />
              <TextField
                label="Guardian Name"
                fullWidth
                margin="normal"
                value={newStudent.guardianName}
                onChange={(e) => setNewStudent({ ...newStudent, guardianName: e.target.value })}
              />
              <TextField
                label="Guardian Phone"
                fullWidth
                margin="normal"
                value={newStudent.guardianPhone}
                onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
              />
              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={newStudent.dateOfBirth}
                onChange={(e) => setNewStudent({ ...newStudent, dateOfBirth: e.target.value })}
              />
              <TextField
                label="Gender"
                fullWidth
                margin="normal"
                value={newStudent.gender}
                onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
              />
              {/* Add other fields here */}
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? 'Update' : 'Submit'}
              </Button>
            </form>
          </Box>
        </Modal>

        <Modal open={!!viewStudent} onClose={() => setViewStudent(null)}>
          <Box
            p={4}
            bgcolor="background.paper"
            component={Paper}
            elevation={3}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <Typography variant="h6" gutterBottom>
              View Student
            </Typography>
            {viewStudent && (
              <Box>
                <Typography>ID: {viewStudent.id}</Typography>
                <Typography>Name: {viewStudent.name}</Typography>
                <Typography>Class: {viewStudent.class}</Typography>
                <Typography>Section: {viewStudent.section}</Typography>
                <Typography>Roll Number: {viewStudent.rollNumber}</Typography>
                <Typography>Email: {viewStudent.email}</Typography>
                <Typography>Phone: {viewStudent.phone}</Typography>
                <Typography>Address: {viewStudent.address}</Typography>
                <Typography>Guardian Name: {viewStudent.guardianName}</Typography>
                <Typography>Guardian Phone: {viewStudent.guardianPhone}</Typography>
                <Typography>Date of Birth: {viewStudent.dateOfBirth}</Typography>
                <Typography>Gender: {viewStudent.gender}</Typography>
                {/* Add other fields here */}
              </Box>
            )}
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default StudentsPage;
