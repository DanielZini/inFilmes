import React, { useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import logo from './../../assets/inFilmes.svg';
import logo_n from './../../assets/inFilmes-n.svg';
import "./style.scss";

// Components
import SearchBar from './../SearchBar';

const Header = props => {

  const { searchFunction, negativeLogo } = props;

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
            <a href="/" title="inFilmes">
              {negativeLogo ?
                <div>
                  <img src={logo_n} alt="inFilmes" className="logo" />
                  <img src={logo_n} alt="inFilmes" className="logo logo-n" />
                </div>
                :
                <div>
                  <img src={logo_n} alt="inFilmes" className="logo logo-n" />
                  <img src={logo} alt="inFilmes" className="logo" />
                </div>
              }
            </a>
          </Col>
          {searchFunction &&
            <Col xs="3" sm="8" >

              <SearchBar searchFunction={searchFunction} />
            </Col>
          }
        </Row>
      </Container>
    </header>
  )
}

export default Header;