import React from "react";
import styled from "styled-components";
import { Margin, Radius } from "../../../watch-components/spacing/Spacing";
import { Typography } from "@mui/material";
import { Colors } from "../../../watch-components/Colors";

type ContentCardProps = {
  title: string;
  secondaryTitle: string;
  description: string;
  color: string;
};

const ContentCard = ({
  title,
  secondaryTitle,
  description,
  color,
}: ContentCardProps) => {
  return (
    <ContentCardStyled>
      <TextChip chipColor={color}>
        <Typography color={Colors.PRIMARY_WHITE} variant="body2">
          {secondaryTitle}
        </Typography>
      </TextChip>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
    </ContentCardStyled>
  );
};

export default ContentCard;

const ContentCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${Radius.P8};
  gap: ${Margin.P10};
  width: 300px;
`;

const TextChip = styled.div<{ chipColor: string }>`
  width: 50%;
  border-radius: ${Radius.P8};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ chipColor }) => chipColor};
`;
