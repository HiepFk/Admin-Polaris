import React from "react";
import styled from "styled-components";
function CommonChart({ children, label, value }) {
  return (
    <Wrapper>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  .label {
    font-size: 13px;
    line-height: 20px;
    font-weight: 650;
    color: #303030;
  }

  .value {
    font-size: 16px;
    line-height: 20px;
    font-weight: 650;
    color: #000000;
    margin-top: 1rem;
  }
`;

export default CommonChart;
