import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import spinner from "../pokemonComponents/spinner.gif";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

//Create a reusable component?
const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    toManyRequests: false,
  };

  //Lifecycle Methods. componentWillMount is executed before rendering, on both the server and the client side. componentDidMount is executed after the first render only on the client side. This is where AJAX requests and DOM or state updates should occur.
  componentDidMount() {
    //Assigning the values from what we've passed in with url wise.
    const { name, url } = this.props;
    //Retrieving the pokemon index by splitting the url and getting the lenght -2 component.
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    //const imageUrl = `./sprites/pokemon/${pokemonIndex}.png`;
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    //writes to the state.
    this.setState({ name, imageUrl, pokemonIndex });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        {/* setting the route dynamically. */}
        <StyledLink to={`pokemonComponents/${this.state.pokemonIndex}`}>
          <Card className="card">
            <h5 className="card-header">{this.state.pokemonIndex}</h5>
            {/* If image is loading show the spinner gif if not display the Sprite component we created earlier */}
            {this.state.imageLoading ? (
              <img
                src={spinner}
                style={{ width: "5em", height: "5em" }}
                className="card-img-top rounded mx-auto d-block mt-2"
              />
            ) : null}
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              src={this.state.imageUrl}
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })}
              style={
                this.state.toManyRequests
                  ? { display: "none" }
                  : this.state.imageLoading
                  ? null
                  : { display: "block" }
              }
            />
            {this.state.toManyRequests ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  To Many Requests
                </span>
              </h6>
            ) : null}
            <div className="card-body mx-auto">
              <h6 className="card-title">
                {/* Goes through each card and capitalises only the first letter. could be replaced with bootstraps text-capitalize */}
                {this.state.name
                  .toLowerCase()
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </h6>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
