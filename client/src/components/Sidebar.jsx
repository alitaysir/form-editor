import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navLinkStyles =
    "block px-4 py-2 text-white hover:bg-gray-700 transition";

  return (
    <div className="fixed top-16 left-0 w-48 h-[calc(100vh-4rem)] bg-gray-800 text-white shadow-md">
      <nav className="flex flex-col space-y-2 p-4">
        <NavLink
          to="/create-test"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Create Test
        </NavLink>
        <NavLink
          to="/view-answers"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          View Answers
        </NavLink>
        <NavLink
          to="/answer-test"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Answer Test
        </NavLink>
        <NavLink
          to="/delete-test"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Delete All Test
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
