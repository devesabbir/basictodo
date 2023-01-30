import React from "react";
import { useState } from "react";

export const Task = React.createContext({
  sectorOptions: [],
  tasks: [],
});

const TaskContext = ({ children }) => {
  const [data, setData] = useState({
    sectorOptions: [],
    tasks: [],
  });
  return <Task.Provider value={{ data, setData }}>{children}</Task.Provider>;
};

export default TaskContext;
