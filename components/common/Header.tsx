import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

interface Props {}

const Header = (props: Props) => {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <>
      <Menu stackable>
        <Menu.Item>
          <img src="/favicon.ico" />
        </Menu.Item>

        <Menu.Item
          name="features"
          active={activeItem === "features"}
          onClick={() => handleItemClick("features")}
        >
          Features
        </Menu.Item>

        <Menu.Item
          name="testimonials"
          active={activeItem === "testimonials"}
          onClick={() => handleItemClick("testimonials")}
        >
          Testimonials
        </Menu.Item>

        <Menu.Item
          name="sign-in"
          active={activeItem === "sign-in"}
          onClick={() => handleItemClick("sign-in")}
        >
          Sign-in
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Header;
