import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

import Student from "../Student/Student";
import Student_Dashboard from "../Student/Content/Student_Dashboard";
import Submission from "../Student/Content/Submission";

import Faculty from "./Faculty/Faculty";
import Dashboard from "./Faculty/Dashboard";
import CreateAssignment from "./Faculty/CreateForm";
import StudentList from "./Faculty/Student_List";

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/" element={<Login />} />
      <Route path="/reg" element={<Register />} />

      {/* Student */}
      <Route path="/student" element={<Student />} />
      <Route path="/student/dashboard" element={<Student_Dashboard />} />
      <Route path="/student/submission" element={<Submission />} />

      {/* Faculty */}
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/faculty/dashboard" element={<Dashboard />} />
      <Route path="/faculty/create" element={<CreateAssignment />} />
      <Route path="/faculty/students" element={<StudentList />} />
    </Routes>
  );
}

export default App;