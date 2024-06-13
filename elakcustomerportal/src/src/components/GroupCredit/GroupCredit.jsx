import React, { useState, useEffect } from "react";
import { Modal, Button, Tooltip } from "antd";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import {
  LeftOutlined,
  UserOutlined,
  TeamOutlined,
  RightOutlined,
} from "@ant-design/icons";
import IndividualCover from "./IndividualCover";
import MultipleCover from "./MultipleCover";
import { useTheme } from "../../store/context/theme-context";

export const GroupCredit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home/group-credit") {
      setIsModalOpen(true);
    }
  }, [location.pathname]);

  const handleSelect = (path) => {
    setIsModalOpen(false);
    navigate(path);
  };

  const title = (
    <div className='relative w-[297px] h-[48px]'>
      <p
        className={`${
          theme === "dark" ? "text-white bg-gray-800" : "text-[#929497]"
        } font-medium text-left font-open-sans text-lg leading-6`}
      >
        What type of cover would you prefer?
      </p>
    </div>
  );

  const modalStyle = {
    width: "354px",
    height: "364px",
    gap: "0px",
  };

  const btnStyle =
    "w-full h-[48px] px-8 py-2 shadow-none text-base text-center font-open-sans text-[#A32A29]";

  return (
    <>
      <Modal
        title={title}
        className={theme === "dark" ? "dark-theme" : ""}
        style={modalStyle}
        open={isModalOpen}
        footer={null}
        closable={false}
      >
        <div className='flex gap-4'>
          <Tooltip title='The individual customer product applies only to single individuals and sole proprietorships. Welcome our valued customer!'>
            <Button
              className={btnStyle}
              type='link'
              onClick={() => handleSelect("individual-cover")}
            >
              Individual &gt;
            </Button>
          </Tooltip>
          <Tooltip title='The group customer product applies to multiple indivuals and partnerships. You can therefore have upto 7 partners 🙀. You will need to provide their details alongside yours. Welcome our valued customers!'>
            <Button
              className={btnStyle}
              type='link'
              onClick={() => handleSelect("multiple-cover")}
            >
              Group &gt;
            </Button>
          </Tooltip>
        </div>
      </Modal>
      <Routes>
        <Route path='individual-cover' element={<IndividualCover />} />
        <Route path='multiple-cover' element={<MultipleCover />} />
      </Routes>
    </>
  );
};
