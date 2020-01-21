import React, { useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import logo from './../../assets/inFilmes.svg';
import logo_n from './../../assets/inFilmes-n.svg';
import "./style.scss";

// Components
import SearchBar from './../SearchBar';

const Header = () => {

  const [fixedClass, setFixedClass] = useState([]);

  window.addEventListener('scroll', () => {

    if (window.scrollY > 0) {
      setFixedClass('fixed')
    } else {
      setFixedClass('')
    }
  });

  return (
    <header className={fixedClass}>
      <Container>
        <Row>
          <Col xs="9" sm="4">
            <h1>
              <a href="/" title="inFilmes">
                <img src={logo} alt="inFilmes" className="logo" />
                <img src={logo_n} alt="inFilmes" className="logo logo-n" />
              </a>
            </h1>
          </Col>
          <Col xs="3" sm="8" >

            <SearchBar />
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header;