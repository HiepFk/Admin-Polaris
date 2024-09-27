import React from "react";
import { menu, footer_button } from "../utils/menu";
import { Link } from "react-router-dom";
import styled from "styled-components";
function Navbar() {
  return (
    <Wrapper>
      <div className="menu_list">
        {menu.map((item) => {
          return (
            <Link to={item.url} key={item.id} className="menu_item">
              {item.icon}
              <span className="menu_label">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <Link to={footer_button.url} className="menu_item">
        {footer_button.icon}
        <span className="menu_label">{footer_button.label}</span>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 10vw;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 4rem;
  background-color: #ebebeb;
  justify-content: space-between;

  .menu_item {
    display: flex;
    align-items: center;
    padding: 1rem 2rem 1rem 1rem;
    gap: 0.5rem;
  }
  .menu_label {
    font-size: 13px;
    line-height: 20px;
    color: #303030;
    font-weight: 550;
  }
`;

export default Navbar;
