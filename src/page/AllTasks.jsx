import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../context/TaskContext";
import useAxios from "../hooks/useAxios";

const AllTasks = () => {
 
  const navigate = useNavigate()
  const { getSectors, addSector, getTasks, createTask } = useAxios();
  const { data } = useContext(Task);
  // Sector Add Input Value
  const [sectorVal, setSectorVal] = useState("");

 
  useEffect(() => {
    getSectors()
    getTasks()
  }, []);

  // All Handlers
  const handleSectorAdd = () => {
    if (sectorVal === "") {
      alert("You have to fill out the field");
    }
    addSector(sectorVal);
    setSectorVal("");
  };

  //  Handle AddTask
  const handleAddTask = () => {
     createTask('') 
  }

  //  Handle Edit
  const handleEdit = (id) => {
    navigate('/edit/' + id)
  }


  return (
    <div>
      <div className="conteiner">
        <div className="row my-5">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="row my-2">
              <div className="col-12">
                <div className="card border">
                  <div
                    style={{ justifyContent: "space-between" }}
                    className="card-header d-flex"
                  >
                    <div className="card-title">
                      <div className="h3">All Tasks</div>
                    </div>
                    <div className="card-action">
                      <div onClick={handleAddTask} className="btn btn-primary">Add New Task</div>
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="table w-100 border table-stripe">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Sectore</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.tasks && data.tasks.map((item,i) => 
                          <>
                        <tr key={i}>
                          <td>{item.name}</td>
                          <td>{item.sector}</td>
                          <td className="d-flex">
                            <div onClick={() => handleEdit(item._id)} className="edit mx-2 cursor-pointer">
                              <i className="bi text-warning bi-pencil-square"></i>
                            </div>
                            <div className="open mx-2">
                              <i className="bi text-success bi-eye-fill"></i>
                            </div>
                            <div className="getLink mx-2">
                              <i className="bi text-primary bi-link-45deg"></i>
                            </div>
                          </td>
                        </tr>
                          </>
                          )
                        }
                     
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="row my-2">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">
                      <h3>Add Sector Options</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="sector-input">
                          <input
                            type="text"
                            className="form-control my-2"
                            placeholder="Input a sector name"
                            value={sectorVal}
                            onChange={(event) =>
                              setSectorVal(event.target.value)
                            }
                          />
                        </div>
                        <div className="sector-input-actions text-end">
                          <button
                            onClick={handleSectorAdd}
                            className="btn btn-success"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <strong>All Sector Options</strong>
                        <hr />

                        <div className="list-group">
                          {data.sectorOptions.length === 0 && (
                            <p className="alert alert-warning">
                              Sectors Not Found!
                            </p>
                          )}
                          {data.sectorOptions.map((item) => {
                            return (
                              <div key={item._id} className="list-group-item">
                                {item.title}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
