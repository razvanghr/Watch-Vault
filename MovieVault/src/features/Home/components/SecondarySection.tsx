import React from "react";
import ContentCard from "./ContentCard";
import styled from "styled-components";
import { Colors } from "../../../watch-components/Colors";

const contentCardData = [
  {
    color: Colors.PRIMARY_BLUE,
    title: "Discover and Organze Your Film Journey",
    description:
      "Easily keep track of the movies you've watched, rate your favorites, and explore new films based on personalized recommendations.",
    secondaryTitle: "Movie Tracker",
  },
  {
    color: Colors.PRIMARY_BLUE,
    title: "Your Ultimate Movie Companion",
    description:
      "Save your watched films, curate lists, and get recommendations tailored just for you. Take your movie-watching experience to the next level!",
    secondaryTitle: "Film Hub",
  },
  {
    color: Colors.PRIMARY_BLUE,
    title: "Never Lose Track of Your Favorites",
    description:
      "Create a personal catalog of the films you've seen, add reviews, and discover new titles to enjoy. Join a community of film lovers today!",
    secondaryTitle: "Movie Library",
  },
];

const SecondarySection = () => {
  return (
    <SectionWrapper>
      <SectionContainer>
        {contentCardData.map((data, index) => {
          return (
            <ContentCard
              key={`contentc-card-${index}`}
              color={data.color}
              description={data.description}
              secondaryTitle={data.secondaryTitle}
              title={data.title}
            ></ContentCard>
          );
        })}
      </SectionContainer>
    </SectionWrapper>
  );
};

export default SecondarySection;

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
`;
