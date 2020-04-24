import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import Home from "./pages/Home";
import Results from "./pages/Results";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <Router>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Navbar.Brand href="/">Vision Power</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/results">Results</Nav.Link>
          </Nav>
        </Navbar>
        <Container>
          <Switch>
            <Route path="/results" component={Results} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
