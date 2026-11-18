import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ===================== AUTH =====================

export const regUser = (data) => API.post("/auth/register", data);

export const logUser = (data) => API.post("/auth/login", data);

// ================== ASSIGNMENTS =================

export const getAssignment = () => API.get("/assignment");

export const CreateAssignment = (formData) => {
  const token = localStorage.getItem("token");

  return API.post("/assignment/create", formData, {
    headers: {
      Authorization: token,
    },
  });
};

// Student dashboard (Assignment + Status)
export const getStudentAssignments = () => {
  const token = localStorage.getItem("token");

  return API.get("/submission/student", {
    headers: {
      Authorization: token,
    },
  });
};

export const Deleteassignment = (id) => {
  const token = localStorage.getItem("token");

  return API.delete(`/assignment/delete/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

// ================== SUBMISSIONS =================

// Student uploads solution
export const uploadSubmission = (formData) => {
  const token = localStorage.getItem("token");

  return API.post("/submission/upload", formData, {
    headers: {
      Authorization: token,
    },
  });
};

// Faculty gets all submitted assignments
export const getSubmissions = () => {
  return API.get("/submission/all");
};

// Faculty marks assignment as Done
export const markDone = (id) => {
  return API.put(`/submission/done/${id}`);
};

// export const dashboardstatus = (
//   assignmentId
// ) =>
//   API.get(
//     `/dashboard/assignment/${assignmentId}`
//   );


// Get statistics of ALL assignments

export const getAllAssignmentStats = () =>
  API.get("/dashboard/assignments");

export default API;

