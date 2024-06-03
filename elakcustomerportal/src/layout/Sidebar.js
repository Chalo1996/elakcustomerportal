import { useState } from "react";
import { Menu, Switch, Button } from "antd";
import {
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
  HomeOutlined,
  GlobalOutlined,
  EllipsisOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import {
  AccountsIcon,
  TransactIcon,
  BorrowIcon,
  SaveIcon,
  UmbrellaIcon,
} from "./icons/icons";
import { useTheme } from "../store/context/theme-context";
import imgLogo from "../assets/Equity_Group_Logo.png";
import darkLogo from "../assets/dark-logo.png";
import profileImg from "../assets/profile.png";

// const { SubMenu } = Menu;

const Sidebar = ({ onSelect }) => {
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = (e) => {
    onSelect(e.key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    {
      key: collapsed ? "collapsed" : "expanded",
      selectable: collapsed ? true : false,
      label: (
        <div className="flex items-center">
          {collapsed && <MenuOutlined onClick={toggleCollapsed} />}
          {!collapsed && (
            <>
              <Button
                type="text"
                onClick={toggleCollapsed}
                style={{ marginRight: "auto", marginTop: 20 }}
              >
                <span style={{ color: "maroon" }}>
                  <MenuOutlined />
                </span>
              </Button>
              <img
                src={theme === "dark" ? darkLogo : imgLogo}
                alt="Equity Bank"
                style={{ width: 90, height: 60, marginTop: 20 }}
              />
            </>
          )}
        </div>
      ),
    },
    {
      key: "profile",
      selectable: false,
      label: !collapsed && (
        <div className="mt-7 flex w-full items-center justify-start">
          <div>
            <img
              src={profileImg}
              alt="Profile"
              className="border-red-500 w-12 h-12 rounded-full"
            />
          </div>
          <div className="ml-5">
            <p className="font-bold">John Doe</p>
            <p style={{ fontSize: 12, color: "#888" }}>Professional Title</p>
          </div>
        </div>
      ),
    },
    {
      key: "home",
      selectable: true,
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "space",
      label: "",
    },
    {
      key: "divider1",
      divider: true,
    },
    {
      key: "more",
      selectable: true,
      icon: <EllipsisOutlined />,
      label: "More",
    },
    {
      key: "accounts",
      selectable: true,
      icon: <AccountsIcon />,
      label: "Accounts",
    },
    {
      key: "transact",
      selectable: true,
      icon: <TransactIcon />,
      label: "Transact",
    },
    {
      key: "borrow",
      selectable: true,
      icon: <BorrowIcon />,
      label: "Borrow",
    },
    {
      key: "save",
      selectable: true,
      icon: <SaveIcon />,
      label: "Save",
    },
    {
      key: "insure",
      selectable: true,
      icon: <UmbrellaIcon />,
      label: "Insure",
    },
    {
      key: "theme",
      selectable: true,
      icon: theme === "dark" ? <MoonOutlined /> : <SunOutlined />,
      label: (
        <div className="flex items-center justify-between">
          <span className="mr-2">Dark Mode</span>
          <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            size="small"
          />
        </div>
      ),
    },
    {
      key: "english",
      selectable: true,
      icon: <GlobalOutlined />,
      label: "English",
    },
    {
      key: "signout",
      selectable: true,
      icon: <LogoutOutlined />,
      label: "Sign Out",
    },
  ];

  return (
    <Menu
      onClick={handleClick}
      style={{
        width: collapsed ? 80 : 256,
        minHeight: "100vh",
        height: "100%",
      }}
      defaultSelectedKeys={["home"]}
      mode="inline"
      theme={theme}
      inlineCollapsed={collapsed}
    >
      {items.map((item) => {
        const menuItemStyle = {
          height: "auto",
        };

        if (item.divider) {
          return <Menu.Divider key={item.key} />;
        } else {
          return (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              style={menuItemStyle}
              disabled={!item.selectable}
            >
              {item.label}
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
};

export default Sidebar;
