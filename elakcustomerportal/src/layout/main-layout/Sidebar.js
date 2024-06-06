import { Menu, Switch, Button, Divider } from "antd";
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
} from "../icons/icons";
import { useTheme } from "../../store/context/theme-context";
import imgLogo from "../../assets/Equity_Group_Logo.png";
import darkLogo from "../../assets/dark-logo.png";
import { Link } from "react-router-dom";

const Sidebar = ({ onSelect, collapsed, toggleCollapsed }) => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e) => {
    onSelect(e.key);
  };

  const items = [
    {
      key: collapsed ? "collapsed" : "expanded",
      style: { height: "auto" },
      label: (
        <div className="flex items-center">
          {collapsed && (
            <MenuOutlined
              style={{ margin: "auto" }}
              onClick={toggleCollapsed}
            />
          )}
          {!collapsed && (
            <>
              <Button
                type="text"
                onClick={toggleCollapsed}
                style={{ marginRight: "auto", marginTop: 20 }}
              >
                <span style={{ color: theme === "dark" ? "white" : "maroon" }}>
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
      className: "non-interactive",
      style: { height: "auto" },
      label: !collapsed && (
        <div className="flex items-center rounded-lg my-7 mx-0">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-[#A32A29] text-white flex items-center justify-center rounded-full">
              PN
            </div>
          </div>
          <div className="ml-3">
            <p className="font-semibold leading-tight">Profile Name</p>
            <p className="text-gray-500 leading-tight">Personal</p>
          </div>
        </div>
      ),
    },
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "space",
      label: "",
      className: "non-interactive",
    },
    {
      key: "divider1",
      width: "auto",
      label: <Divider />,
      className: "non-interactive",
    },
    {
      key: "more",
      icon: <EllipsisOutlined className="rotate-90" />,
      label: <Link to="/more">More</Link>,
    },
    {
      key: "accounts",
      icon: <AccountsIcon />,
      label: <Link to="/accounts">Accounts</Link>,
    },
    {
      key: "transact",
      icon: <TransactIcon />,
      label: <Link to="/transact">Transact</Link>,
    },
    {
      key: "borrow",
      icon: <BorrowIcon />,
      label: <Link to="/borrow">Borrow</Link>,
    },
    {
      key: "save",
      icon: <SaveIcon />,
      label: <Link to="/save">Save</Link>,
    },
    {
      key: "insure",
      icon: <UmbrellaIcon />,
      label: <Link to="/insure">Insure</Link>,
    },
    {
      key: "theme",
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
      icon: <GlobalOutlined />,
      label: <Link to="/english">English</Link>,
    },
    {
      key: "signout",
      icon: <LogoutOutlined />,
      label: <Link to="/signout">Sign Out</Link>,
    },
  ];

  return (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={["home"]}
      mode="inline"
      style={{
        height: "100vh",
        overflowY: "auto",
      }}
      items={items}
      theme={theme}
    />
  );
};

export default Sidebar;
