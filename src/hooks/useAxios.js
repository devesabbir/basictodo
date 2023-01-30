import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../context/TaskContext";

const useAxios = () => {
  const { data, setData } = useContext(Task);
  const navigate = useNavigate()

  const axiosConfig = () => {
    axios.defaults.baseURL = "https://basictodo-two.vercel.app";
  };

  const getSectors = async () => {
    try {
      axiosConfig();
      let response = await axios.get("/task/getsectors")
      setData((prev) => {
        return {
          ...prev,
          sectorOptions: response.data.data,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addSector = async (title) => {
    try {
      axiosConfig()
      await axios.post("/task/addsector", {title: title});
      getSectors();
    } catch (err) {
      console.log(err);
    }
  };

  // Get All Task
  const getTasks = async () => {
    try {
      axiosConfig();
      let response = await axios.get("/task/gettasks");
      setData((prev) => {
        return {
          ...prev,
          tasks: response.data.data,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  

  // Create New Task
  const createTask = async (data) => {
    try {
      axiosConfig();
      await axios.post("/task/createtask", {...data}).then( res => {
        if(res.status === 201){
          navigate('/edit/' + res.data.data._id)
        }
      })
      getTasks()
    } catch (err) {
      console.log(err);
    }
  };

   // Create New Task
   const editTask = async (id, data) => {

    try {
      axiosConfig();
      await axios.post("/task/edittask/" + id, {...data}).then( res => {

        if(res.status === 200){
          navigate('/')
        }
      })
      getTasks()
    } catch (err) {
      console.log(err);
    }
  };


  return {
    axiosConfig,
    getSectors,
    addSector,
    getTasks,
    createTask,
    editTask
  };
};

export default useAxios;
