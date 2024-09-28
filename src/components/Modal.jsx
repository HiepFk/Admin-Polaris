import React from "react";
import { XIcon } from "@shopify/polaris-icons";
import styled from "styled-components";
import { Icon, Text } from "@shopify/polaris";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  return (
    <Wrapper onClick={handleOutsideClick}>
      <div className="container popup-overlay" />
      <div className="content">
        {title && (
          <div className="modal_header">
            <Text variant="headingMd" as="div">
              {title}
            </Text>

            <div className="close_icon" onClick={onClose}>
              <Icon source={XIcon} tone="base" />
            </div>
          </div>
        )}

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
  z-index: 999;
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
    border-radius: 0.5rem;
    width: 100%;
    max-width: 40rem;
    background-color: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .modal_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .close_icon {
    cursor: pointer;
    opacity: 0.8;
  }
  .close_icon:hover {
    opacity: 1;
  }
`;

export default Modal;
