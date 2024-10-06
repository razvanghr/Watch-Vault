import React, { Children } from "react";
import styled from "styled-components";
import { Padding } from "./spacing/Spacing";

type RowType = {
  children: React.ReactNode;
};

export const Row = ({ children }: RowType) => {
  return <RowComponent>{children}</RowComponent>;
};

const RowComponent = styled.div`
  display: flex;
  flex-direction: row;
`;
