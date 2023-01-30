import React from "react";
import { Routes, Route } from "react-router-dom";
import AddEditTask from "../page/AddEditTasks";
import AllTasks from "../page/AllTasks";
import SharedTasks from "../page/SharedTasks";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AllTasks />} />
        <Route path="/edit/:id" element={<AddEditTask />} />
        <Route path="/shared/:id" element={<SharedTasks />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
