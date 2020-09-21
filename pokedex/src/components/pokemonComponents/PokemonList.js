import React, { Component } from "react";

import PokemonCard from "./PokemonCard";
import axios from "axios";

export default class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/",
    pokemon: null,
  };

  async componentDidMount() {
    //Pull the data from this states url. As set above.
    const res = await axios.get(this.state.url);
    //returns the object with the data, and in this case sets it to the "results" column of the API which is the array of pokemon. path is res.data.results in this case
    this.setState({ pokemon: res.data["results"] });
    console.log(res);
  }

  render() {
    return (
      <React.Fragment>
        {/* If pokemon exists create a card with their unique property values. If not display not loaded yet on the page. */}
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map((pokemon) => (
              // Maps through each pokemon and assigns their values as fetched from res.data.results.
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <h1>Not loaded yet.</h1>
        )}
      </React.Fragment>
    );
  }
}
