import React from 'react';
import { Col } from "reactstrap";
import "./style.scss";

const LoadingCard = (props) => {

  let component = [];

  if (props.num) {
    for (let i = 0; i < props.num; i++) {
      component.push(
        <Col xs="12" sm="6" md="4" lg="3" key={i}>
          <div className="card"></div>
        </Col>
      )
    }

  } else {
    component =
      <Col xs="12" sm="6" md="4" lg="3">
        <div className="card"></div>
      </Col>
  }

  return component;
}

export default LoadingCard;