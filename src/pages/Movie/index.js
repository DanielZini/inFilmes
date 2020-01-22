import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
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
import logoImdb from './../../assets/logos/imdb.png'
import logoRotten from './../../assets/logos/rottentomatoes.png'
import logoMeta from './../../assets/logos/metacritic.png'

//Functions
import { listMoviesById } from './../../services/functions'

const Movie = () => {

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [movieDetail, setMovieDetail] = useState();

  useEffect(() => {

    const getMovie = async () => {

      setMovieDetail(await listMoviesById(id));
      setIsLoading(false);
    }

    getMovie();

  }, [id])

  if (!isLoading && movieDetail['Response'] === "False") {
    return <Redirect to='/' />
  }

  let imgCover = banner;

  if (!isLoading && movieDetail["Poster"]) imgCover = movieDetail["Poster"];

  return (
    <article>
      <Header negativeLogo={true} />

      {isLoading ?

        <div></div>

        :
        <div>
          <div className="banner-movie">
            <div className="item">
              <div className="bg" style={{ backgroundImage: 'url(' + imgCover + ')' }}></div>
              <div className="desc">
                <Container>
                  <h1>{movieDetail["Title"]}</h1>
                </Container>
              </div>
            </div>
          </div>

          <section>
            <Container>
              <Row>
                <Col sm="12" md="6" lg="4">
                  <img src={imgCover} alt={movieDetail["Title"]} className="img-responsive full-cover" />
                </Col>
                <Col sm="12" md="6" lg="5">
                  <p className="font-text">{movieDetail["Plot"]}</p>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="dark">
            <Container>
              <Row>
                <Col sm="6" md="6" lg="5">
                  <ul>
                    {movieDetail["Genre"] !== "N/A" &&
                      <li><strong>Genre: </strong>{movieDetail["Genre"]}</li>}
                    {movieDetail["Released"] !== "N/A" &&
                      <li><strong>Released: </strong>{movieDetail["Released"]}</li>}
                    {movieDetail["Director"] !== "N/A" &&
                      <li><strong>Director: </strong>{movieDetail["Director"]}</li>}
                    {movieDetail["Writer"] !== "N/A" &&
                      <li><strong>Writer: </strong>{movieDetail["Writer"]}</li>}
                    {movieDetail["Production"] !== "N/A" &&
                      <li><strong>Production: </strong>{movieDetail["Production"]}}</li>}
                    {movieDetail["Runtime"] !== "N/A" &&
                      <li><strong>Runtime: </strong>{movieDetail["Runtime"]}</li>}
                  </ul>
                </Col>
                <Col sm="6" md="6" lg="4">
                  <ul>
                    {movieDetail["DVD"] !== "N/A" &&
                      <li><strong>DVD: </strong>{movieDetail["DVD"]}</li>}
                    {movieDetail["Awards"] !== "N/A" &&
                      <li><strong>Awards: </strong>{movieDetail["Awards"]}</li>}
                    {movieDetail["Actors"] !== "N/A" &&
                      <li><strong>Actors: </strong>{movieDetail["Actors"]}</li>}
                    {movieDetail["Language"] !== "N/A" &&
                      <li><strong>Language: </strong>{movieDetail["Language"]}</li>}
                    {movieDetail["Country"] !== "N/A" &&
                      <li><strong>Country: </strong>{movieDetail["Country"]}</li>}
                  </ul>
                </Col>
              </Row>
            </Container>
          </section>

          <section>
            <Container>
              <Row>

                {movieDetail["Ratings"].map(item => {

                  let logo;

                  if (item.Source === "Internet Movie Database") {
                    logo = logoImdb;
                  } else if (item.Source === "Rotten Tomatoes") {
                    logo = logoRotten;
                  } else {
                    logo = logoMeta;

                  }

                  return (
                    <Col sm="4" lg="3">
                      <div className="wrap-rating">
                        <img src={logo} alt={item.Source} className="center-block img-responsive" />
                        <p>{item.Value}</p>
                      </div>
                    </Col>
                  )

                })}
              </Row>
            </Container>
          </section>
        </div>
      }


      <Footer />
    </article>
  );
};

export default Movie;