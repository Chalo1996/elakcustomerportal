import { Menu, Switch } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { useTheme } from "../store/context/theme-context";
import imgLogo from "../assets/Equity_Group_Logo.png";

const Sidebar = ({ onSelect }) => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e) => {
    onSelect(e.key);
  };

  const items = [
    // Logo item
    {
      key: "logo",
      label: (
        <img
          src={imgLogo}
          alt="Equity Bank"
          style={{ width: 90, height: 50 }}
        />
      ),
    },
    {
      key: "sub1",
      icon: <UserOutlined />,
      label: "User",
      children: [
        { key: "1", label: "Tom" },
        { key: "2", label: "Bill" },
        { key: "3", label: "Alex" },
      ],
    },
    {
      key: "sub2",
      icon: <LaptopOutlined />,
      label: "Team",
      children: [
        { key: "4", label: "Team 1" },
        { key: "5", label: "Team 2" },
      ],
    },
    {
      key: "sub3",
      icon: <NotificationOutlined />,
      label: "Messages",
      children: [
        { key: "6", label: "Message 1" },
        { key: "7", label: "Message 2" },
        { key: "8", label: "Message 3" },
      ],
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
  ];

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256, height: "100vh" }}
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
      theme={theme}
    />
  );
};

export default Sidebar;
