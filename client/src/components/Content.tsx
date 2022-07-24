import React, {useEffect, useState, useCallback} from 'react';
import Exchange from './exchange/Exchange';
import Issue from './issue/Issue';
import Premium from './premium/Premium';
import Slider from "react-slick";
import "./Content.css"

interface ContentViewType {
    view : Number
}


function Content({view} : ContentViewType):React.ReactElement {

    console.log("render")

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
        <main>
          <div className = "content-view">
            <Slider {...settings}>
            <div>
                <h3><Exchange /></h3>
            </div>
            <div>
                <h3><Issue /></h3>
            </div>
            <div>
                <h3><Premium /></h3>
            </div>
            </Slider>
            </div>
        </main>

    );
}

export default Content;

