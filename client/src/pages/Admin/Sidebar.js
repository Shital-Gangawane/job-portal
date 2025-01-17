import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";
import { BiShoppingBag } from "react-icons/bi";
import { GrCertificate } from "react-icons/gr";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import NavLink from "./NavLink";
import dp from "../../assets/user.png";
import { useAdminContext } from "../../context/adminContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAdminToken, adminData } = useAdminContext();

  useEffect(() => {
    navigate("/admin/dashboard");
  }, []);

  const adminLogoutHandler = () => {
    sessionStorage.removeItem("adminToken");
    setAdminToken("");
    navigate("/admin");
  };

  return (
    <div className="bg-gray-800  text-white h-screen md:w-52 lg:w-80  flex flex-col items-center">
      <div className=" p-4 flex gap-1  w-full mb-3">
        <div className=" border-2 h-8 rounded-full aspect-square overflow-hidden p-1 cursor-pointer">
          <img className="w-full h-full" src={dp} />
        </div>
        <h2 className=" text-xl hidden md:block  font-bold cursor-pointer">
          {adminData.name}
        </h2>
      </div>
      <nav className="flex w-full flex-col items-center justify-center gap-3">
        <NavLink
          to="/admin/dashboard"
          icon={<RxDashboard size={25} />}
          label="Dashboard"
          location={location}
        />
        <NavLink
          to="/admin/candidates"
          icon={<BsPerson size={25} />}
          label="Candidates"
          location={location}
        />
        <NavLink
          to="/admin/employers"
          icon={<BiShoppingBag size={25} />}
          label="Employers"
          location={location}
        />
        <NavLink
          to="/admin/jobs"
          icon={<GrCertificate size={25} />}
          label="Jobs"
          location={location}
        />

        {adminData?.isSuperAdmin && (
          <NavLink
            to="/admin/admins"
            icon={<RiAdminFill size={25} />}
            label="Admins"
            location={location}
          />
        )}

        <button
          onClick={adminLogoutHandler}
          className={`w-full p-2 px-4 hover:bg-orange-700 transition duration-300 flex items-center justify-center sm:justify-normal gap-1 
            `}
        >
          <RiLogoutCircleLine size={25} />
          <p
            className={` hidden md:block text-start
           "text-white" 
        `}
          >
            Logout
          </p>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
