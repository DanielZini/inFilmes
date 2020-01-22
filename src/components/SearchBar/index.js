import React, { useState } from 'react';
import { InputGroupAddon, InputGroup, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import "./style.scss";

// Components

const SearchBar = (props) => {

  const [openSearchMobile, setFixedClass] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');

  const { searchFunction } = props;

  const handlerOpenSearchMobile = () => {
    setFixedClass('active');
  }
  const handlerCloseSearchMobile = () => {
    setFixedClass('');
  }

  const handlerSearch = event => {
    event.preventDefault();

    searchFunction(movieTitle, movieYear);
  }

  return (
    <div>
      <button
        type="button"
        className="openSearchMobile visible-xs"
        onClick={() => handlerOpenSearchMobile()}>
        <FontAwesomeIcon icon={faSearch} />
      </button>

      <form onSubmit={handlerSearch} className={"form-search " + openSearchMobile}>

        <button
          type="button"
          className="closeSearchMobile visible-xs"
          onClick={() => handlerCloseSearchMobile()}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <InputGroup>
          <Input
            placeholder="Nome do filme:"
            name="movieTitle"
            style={{ flex: 3 }}
            value={movieTitle}
            onChange={e => setMovieTitle(e.target.value)} />

          <InputGroupAddon addonType="append">
            -
          </InputGroupAddon>

          <Input
            placeholder="Ano:"
            name="movieYear"
            maxLength="4"
            style={{ flex: 1 }}
            value={movieYear}
            onChange={e => setMovieYear(e.target.value)} />

          <InputGroupAddon addonType="append">
            <button type="submit" className="bt-search">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </InputGroupAddon>

        </InputGroup>
      </form>
    </div>
  )
}

export default SearchBar;