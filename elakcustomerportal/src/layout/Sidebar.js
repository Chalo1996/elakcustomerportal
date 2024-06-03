import { Menu, Switch } from "antd";
import {
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
  HomeOutlined,
  GlobalOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useTheme } from "../store/context/theme-context";
import imgLogo from "../assets/Equity_Group_Logo.png";
import darkLogo from "../assets/dark-logo.png";
import profileImg from "../assets/profile.png";

const { SubMenu } = Menu;

const Sidebar = ({ onSelect }) => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e) => {
    onSelect(e.key);
  };

  const items = [
    {
      key: "logo",
      selectable: false,
      label: (
        <img
          src={theme === "dark" ? darkLogo : imgLogo}
          alt="Equity Bank"
          style={{ width: 90, height: 60, marginTop: 20 }}
        />
      ),
    },
    {
      key: "profile",
      selectable: false,
      label: (
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
      style={{ width: 256, height: "100vh" }}
      defaultSelectedKeys={["home"]}
      mode="inline"
      theme={theme}
    >
      {items.map((item) => {
        const menuItemStyle = {
          height: "auto",
        };

        if (item.children) {
          return (
            <SubMenu
              key={item.key}
              icon={item.icon}
              title={item.label}
              style={menuItemStyle}
            >
              {item.children.map((child) => (
                <Menu.Item key={child.key}>{child.label}</Menu.Item>
              ))}
            </SubMenu>
          );
        } else if (item.divider) {
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
