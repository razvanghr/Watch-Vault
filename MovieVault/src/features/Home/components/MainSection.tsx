import { Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { REGISTER_PATH, LOGIN_PATH } from "../../../utils/paths/path";
import { Colors } from "../../../watch-components/Colors";
import { Margin } from "../../../watch-components/spacing/Spacing";

const MainSection = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <HomeContent>
        <Typography variant="body2">Watch Vault</Typography>
        <Typography variant="h3">
          Track your movies. Discover new favorites. Stay organized.
        </Typography>
        <Typography variant="body2">
          Effortlessly save the movies you've watched, create personalized
          lists, and find new films to explore.
          <FreeToUse onClick={() => navigate(REGISTER_PATH)}>
            Free to use
          </FreeToUse>{" "}
          Easy to get started.
          <br /> Just sign up and let our platform help you manage your
          movie-watching journey, recommend new titles, and keep your
          collections organized.
        </Typography>
        <ButtonContainer>
          <Button
            onClick={() => navigate(LOGIN_PATH)}
            size="medium"
            variant="outlined"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate(REGISTER_PATH)}
            size="medium"
            variant="outlined"
          >
            Register
          </Button>
        </ButtonContainer>
      </HomeContent>
    </HomeContainer>
  );
};

export default MainSection;

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40rem;
  background-color: ${Colors.PRIMARY_WHITE};
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: ${Margin.P24};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${Margin.P14};
`;

const FreeToUse = styled.div`
  color: ${Colors.PRIMARY_BLUE};
  font-weight: bold;
  cursor: pointer;
`;
