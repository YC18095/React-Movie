import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper";
import { baseApi, apiKey, movieImagesUrl, movieImagew500 } from "../api/apis";
import { Component, useCallback, useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import Button from "../components/Button";

const Home = () => {
  const SlideWrapper = styled.div`
    .containerHeader {
      //animation for poster and overview , title based active swiper
      .swiper-slide {
        .poster {
          transform: scale(0);
          transition: transform 2000ms ease;
        }
        .content-container {
          transform: translateY(30px);
          opacity: 0;
          transition: all 2000ms ease;
        }
        &-active {
          .poster {
            transform: scale(1);
          }
          .content-container {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }

      .slides {
        height: calc(100vh - 64.3px);

        &::after {
          content: "";
          position: absolute;
          top: 0%;
          left: 0%;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
        }

        .content-slides {
          position: relative;
          z-index: 1;

          display: flex;
          flex-direction: row;
          justify-self: center;
          justify-content: space-around;
          align-items: center;

          .content-container {
            .title {
              width: 500px;
              h1 {
                color: white;
                font-family: Sans-serif;
                font-size: 50px;
                font-weigh: 900;
              }
            }
            .overview {
              color: white;
              font-family: Sans-serif;
              width: 1000px;
              font-weight: 900;
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .active {
            animation: fade-in 3s;
          }
          .poster {
            margin-top: 10%;
            border-radius: 30px;
            img {
              height: 500px;
              border-radius: 30px;
            }
          }
        }
      }
    }
  `;

  const WatchNow = styled.button`
    background-color: red;
    margin-top: 3%;
    margin-right: 7%;
    border-radius: 40px;
    color: white;
    font-size: 24px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 3px;
    padding-bottom: 5px;
    transition: all 1000ms ease-in-out;

    &:hover {
      box-shadow: 5px 10px white;
    }
  `;

  const WatchTrailer = styled.button`
    background-color: white;
    margin-top: 3%;
    margin-right: 7%;
    border-radius: 40px;
    color: red;
    font-size: 24px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 3px;
    padding-bottom: 5px;
    transition: all 1000ms ease-in-out;

    &:hover {
      box-shadow: 5px 10px red;
    }
  `;

  const Iframe = styled.div`
    position: absolute;
  `;

  const CloseButton = styled.div`
    button {
      background-color: transparent;
      color: white;
      position: absolute;
      right: 0%;
      bottom: 100%;
    }
  `;

  const [sliderImages, setSliderImages] = useState([]);
  const randomPage = Math.floor(Math.random() * 10) + 1;
  // const randomPage =  1

  useEffect(() => {
    // get popular movies list
    baseApi
      .get(`?api_key=${apiKey}&language=en-US&page=${randomPage}`)
      .then((res) => {
        setSliderImages(res.data.results);
      })
      .catch((err) => {
        console.log("can not fetch popular movie data", err);
        throw Error(err);
      });
  }, []);

  const renderSlider = () => (
    <SlideWrapper>
      <div className="containerHeader">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="cards"
          // autoplay={{ delay: 3000 }}
          loop
          slidesPerView={1}
        >
          {sliderImages.map((item) => (
            <SwiperSlide>
              <div
                className="h-screen w-screen slides"
                style={{
                  backgroundImage: `url(${movieImagesUrl}${item.backdrop_path})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  opacity: 0.75,
                }}
              >
                {renderContent(item)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SlideWrapper>
  );

  const renderContent = (item) => (
    <div className="content-slides">
      <div className="content-container">
        <div className="title">
          <h1>{item.original_title}</h1>
        </div>
        <div className="overview">{item.overview}</div>
        <div className="buttons-container">
          {renderButton(WatchNow, "Watch Now", () => {
            console.log("not trigger");
          })}
          {renderButton(WatchTrailer, "Watch Trailer", () => {
            console.log("not trigger");
          })}
        </div>
      </div>
      <div className="poster">
        <img src={`${movieImagew500}${item.poster_path}`} />
      </div>
      {renderIframe()}
    </div>
  );

  const renderButton = (
    WrapperCss: Component,
    text: String,
    callback: Function
  ) => (
    <WrapperCss>
      <Button text={text} handleCallback={callback} />
    </WrapperCss>
  );

  const renderIframe = () => (
    <Iframe>
      <div className="trailer">
        <iframe
          width="800"
          height="500"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
        />
        {renderButton(CloseButton, "x", () => {
          console.log("new");
        })}
      </div>
    </Iframe>
  );

  return (
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <div className="header">{renderSlider()}</div>

      <div className="body"></div>

      <div className="footer"></div>
    </div>
  );
};

export default Home;
