import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Task } from "../context/TaskContext";
import useAxios from './../hooks/useAxios';

const AddTasks = () => {
  const { getSectors, editTask, axiosConfig} = useAxios();
  const { data } = useContext(Task);
  const { id } = useParams()
  const [input, setInput] = useState({})
  const [checked, setChecked] = useState(false);
  

  useEffect(() => {
    getSectors()
    // getSingleTask(id)
    const singleTask = async (id) => {
       axiosConfig()
       await axios.get('/task/gettask/' + id).then(res => {
        setInput((prev) => ({
           ...prev,
           ...res.data.data
        }))     
       })
    }

    singleTask(id)

  },[id])
 

  // Handle Input
  const handleInput = (e) => {
     let name = e.target.name 
     let value = e.target.value
     setInput((prev) => ({
      ...prev,
      [name] : value
   }))
   
  }
 
  //  Handle Terms 
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
   
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.name || !input.sector || checked === false) {
      alert('All Feild Are Required!')
    } else {
     let data = {...input, agreeWithTerms:checked}
     editTask(id, data) 
   }
  }


 
  
 
  return (
    <div className="conteiner">
         <div className="row my-5">
             <div className="col-2"></div>
             <div className="col-8">
             <div className="card border p-5">

           <form onSubmit={handleSubmit}>
       
          <div className="form-outline mb-4">
            <span>Name:</span>
            <input name="name" onChange={handleInput} type="text" value={input.name} className="form-control" />
          </div>

          <div className="form-outline mb-4">
            <span>Sector:</span>
           <select name="sector" onChange={handleInput} className="select w-100 border p-2">
              {
                data.sectorOptions && data.sectorOptions.map((item,i) => 
                <>
                  <option selected={input.sector === item.title} key={i} value={item.title}>{item.title}</option>
                </>)
              }
           
            </select>
          </div>

   
          <div className="row mb-4">
            <div className="col">
        
              <div className="form-check">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleChange}
                />
                <label className="form-check-label"> Agree with All Terms & Conditions.</label>
              </div>
            </div>
          </div>

   
          <button type="submit" className="btn btn-primary btn-block">Save</button>
         </form>
             </div>    
             </div>
             <div className="col-2"></div>
         </div>
    </div>
  )
};

export default AddTasks;
