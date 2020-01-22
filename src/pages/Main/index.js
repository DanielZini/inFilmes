import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import ScrollableAnchor, { goToAnchor } from 'react-scrollable-anchor';
import './style.scss';

//Components
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import LoadingCard from './../../components/LoadingCard';

//Imagens
import banner from './../../assets/banner/03.jpg'
import defaultCover from './../../assets/default-cover.jpg'

//Functions
import { listMoviesByTitle } from './../../services/functions'

// filmes para listar
const defaultMovies = [
  "The Godfather",
  "The Lord of The Rings",
  "Harry Potter",
]

const Main = () => {

  const [isLoading, setIsLoading] = useState(true);

  // estados relacionados a busca
  const [moviesToSearch, setMoviesToSearch] = useState(defaultMovies);
  const [movieYearToSearch, setMovieYearToSearch] = useState();
  const [isSearch, setIsSearch] = useState(false);

  //estado relacionado a listagem
  const [moviesToList, setMoviesToList] = useState([]);

  useEffect(() => {

    const listMovies = async () => {

      setMoviesToList(await listMoviesByTitle(moviesToSearch, movieYearToSearch, isSearch));
      setIsLoading(false);

    }

    listMovies();

  }, [moviesToSearch, movieYearToSearch, isSearch, isLoading])

  const handlerSearchFunction = async (movieTitle, movieYear) => {

    if (movieTitle) {
      setIsLoading(true);
      setMoviesToSearch([movieTitle]);
      setMovieYearToSearch(movieYear);
      setIsSearch(true);

      goToAnchor('anchor', false);

    } else {
      setIsLoading(true);
      setMoviesToSearch(defaultMovies);
      setIsSearch(false);
      goToAnchor('anchor', false);

    }
  }

  const handlerClearSearch = () => {
    setIsLoading(true);
    setMoviesToSearch(defaultMovies);
    setIsSearch(false);
  }

  return (
    <div>
      <Header searchFunction={handlerSearchFunction} />

      <div className="full-banner">
        <div className="item">
          <div className="bg" style={{ backgroundImage: 'url(' + banner + ')' }}></div>
        </div>
      </div>

      <ScrollableAnchor id={'anchor'}>
        <div></div>
      </ScrollableAnchor>

      {isLoading ?

        <section>
          <Container>
            <div className="list-catalog">
              <Row noGutters={true}>
                <LoadingCard num={6} />
              </Row>
            </div>
          </Container>
        </section>

        :

        moviesToList.length <= 0 ?

          <section>
            <Container>
              <div className="list-catalog">
                <p className="text-center">Nenhum filme encontrado</p>
              </div>
            </Container>
          </section>

          :

          moviesToList.map((item, index) => {

            return (
              <section key={index}>
                <Container>

                  {isSearch &&
                    <button type="button" className="clear-search" onClick={() => handlerClearSearch()}>
                      <FontAwesomeIcon icon={faLongArrowAltLeft} />
                      Voltar
                      </button>
                  }
                  <h2>
                    <span>{item['subTitle']}</span> {item['title']}
                  </h2>

                  <div className="list-catalog">
                    <Row noGutters={true}>

                      {

                        item['movies'].map(movie => {

                          const cover = movie.Poster !== "N/A" ? movie.Poster : defaultCover;

                          return (
                            <Col xs="12" sm="6" md="4" lg="3" key={movie.imdbID}>
                              <a href="/catalog" title={movie.Title}>
                                <div className="item">
                                  <div className="bg" style={{ backgroundImage: 'url(' + cover + ')' }}></div>

                                  <div className="icon">
                                    <FontAwesomeIcon icon={faLink} />
                                  </div>

                                  <div className="desc">
                                    <h3>{movie.Title}</h3>
                                  </div>
                                </div>
                              </a>
                            </Col>
                          )
                        })

                      }

                    </Row>
                  </div>

                </Container>
              </section>
            )

          })}

      <Footer />
    </div>
  );
};

export default Main;