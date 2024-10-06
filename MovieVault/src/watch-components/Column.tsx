import React from "react";
import styled from "styled-components";

type ColumnType = {
  children: React.ReactNode;
};

export const Column = ({ children }: ColumnType) => {
  return <ColumnComponent>{children}</ColumnComponent>;
};

const ColumnComponent = styled.div`
  display: flex;
  flex-direction: column;
`;
