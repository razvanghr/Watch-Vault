import React from "react";

import Intro from "../components/HomePageComp/Intro";
import Reveal from "../components/HomePageComp/Reveal";

import { Link } from "react-router-dom";

// Components

import revealImage1 from "../assets/Images/revealImage1.png";
import revealImage2 from "../assets/Images/revealImage2.jpg";
import revealImage3 from "../assets/Images/revealImage3.png";
import revealImage4 from "../assets/Images/revealImage4.png";

function HomePage({ isLogged }) {
  return (
    <div className="home-container">
      <div className="home-page">
        <Reveal>
          <Intro isLogged={isLogged} />
        </Reveal>
        <Reveal>
          <div className="reveal-container">
            <div className="reveal-component">
              <img src={revealImage1} alt="" />
              <p>
                Have you ever stumbled upon a movie you loved and then struggled
                to remember its title? With MovieHub, you can easily save and
                organize your favorite films in one place. No more post-it notes
                or endless searching!
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="reveal-container">
            <div
              className="reveal-component"
              style={{ flexDirection: "row-reverse" }}
            >
              <img src={revealImage3} alt="" />
              <p>
                Keep Track of Watched Movies: Mark movies as "watched" and never
                watch the same movie twice . Our platform helps you keep an
                organized list of all the films you've already seen.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="reveal-container">
            <div className="reveal-component">
              <img src={revealImage4} alt="" />
              <p>
                Looking for your next cinematic adventure? Our powerful search
                feature lets you explore a vast database of movies, including
                details like cast, plot summaries, and user reviews. Find new
                releases, old classics, and hidden gems with ease.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="reveal-container">
            <div className="reveal-component-join">
              <h1>Join Now and Dive into the World of Cinema!</h1>
              <Link to="/register">
                <button>JOIN NOW</button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default HomePage;
