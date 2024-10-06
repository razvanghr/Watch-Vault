import React from "react";
import styled from "styled-components";
import { Row } from "../../../watch-components/Row";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Padding } from "../../../watch-components/spacing/Spacing";
import { Colors } from "../../../watch-components/Colors";

const Navigation = () => {
  return (
    <NavigationContainer>
      <NavigationLeft>
        <Typography variant="h5">Watch Vault</Typography>
      </NavigationLeft>
      <NavigationRight>
        <StyledLink to={"/contact"}>
          <Typography>Contact</Typography>
        </StyledLink>
      </NavigationRight>
    </NavigationContainer>
  );
};

export default Navigation;

const NavigationContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  padding: ${Padding.P8};
  background-color: ${Colors.PRIMARY_BLUE};
`;

const NavigationLeft = styled.div``;

const NavigationRight = styled.div`
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
