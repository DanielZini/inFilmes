import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons';
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

const Main = () => {

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // filmes para listar
  const movies = [
    "The Godfather",
    "The Lord of The Rings",
    "Harry Potter",
  ]

  useEffect(() => {

    const listMovies = async () => {

      setMovieList(await listMoviesByTitle(movies));
      setIsLoading(false);
    }

    listMovies();

  }, [movies])

  return (
    <div>
      <Header />

      <div className="full-banner">
        <div className="item">
          <div className="bg" style={{ backgroundImage: 'url(' + banner + ')' }}></div>
        </div>
      </div>

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

        movieList.length <= 0 ?

          <section>
            <Container>
              <div className="list-catalog">
                <p className="text-center">Nenhum filme encontrado</p>
              </div>
            </Container>
          </section>

          :

          movieList.map((item, index) => {

            return (
              <section key={index}>
                <Container>

                  <h2><span>Coleção</span> {item['title']}</h2>

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