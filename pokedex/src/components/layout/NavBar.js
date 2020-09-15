import React, { Component } from "react";
import styled from "styled-components";

const Style = styled.a`
  .navbar {
    background-color: #ef5350;
  }
`;
export default class NavBar extends Component {
  render() {
    return (
      <Style>
        <div>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top">
            <a
              href=""
              className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
            >
              Pokédex
            </a>
          </nav>
        </div>
      </Style>
    );
  }
}
