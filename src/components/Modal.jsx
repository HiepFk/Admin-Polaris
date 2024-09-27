import React from "react";
import { XIcon } from "@shopify/polaris-icons";
import styled from "styled-components";
import { Icon } from "@shopify/polaris";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  return (
    <Wrapper className="popup-overlay" onClick={handleOutsideClick}>
      <div className="container" />
      <div className="content">
        <div className="close_icon" onClick={onClose}>
          <Icon source={XIcon} tone="base" />
        </div>
        {children}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  justify-content: center;
  align-items: center;
  .container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #6b7280;
    opacity: 0.75;
  }
  .content {
    position: relative;
    z-index: 10;
    padding: 1.5rem;
    padding-top: 2.5rem;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 32rem;
    background-color: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .close_icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
  }
  .close_icon:hover {
    opacity: 0.8;
  }
`;

export default Modal;
