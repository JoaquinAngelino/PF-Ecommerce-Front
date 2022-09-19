import React from 'react';
//, { useState } import {
//   Carousel,
//   Carouselitem,
//   CarouselControl,
//   CarouselIndicators,
//   CarouselCaption
// } from 'reactstrap';
import { Link } from 'react-router-dom';
//import './LandingPage.css';

// const items = [
//   {
//     src: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
//     altText: 'Slide 1',
//     caption: 'Slide 2',
//   },

//   {
//     src: 'https://cdn.memorykings.pe/files/2022/03/26/325854-MK026454-GRANDE.jpg',
//     altText: 'Slide 1',
//     caption: 'Slide 2',
//   },
//   {
//     id: 'https://images-eu.ssl-images-amazon.com/images/G/30/CE/Electronica/PC2018/murclara/amazon-banner-gaming-days_1.png',
//     altText: 'Slide 1',
//     caption: 'Slide 2',
//   },
//   {
//     src: 'https://mesajil.com/wp-content/uploads/elementor/thumbs/Banner-Desktop-Sorteo-Cougar-SillaCase-1-pfxuu8hr2ksftp8338ji2fjmenpws04vzfus93xsvk.jpg',
//     altText: 'Slide 1',
//     caption: 'Slide 2',
//   },
//   {
//     src: 'https://www.cm-soluciones.com.ar/static/media/banner-4.c5f21dec.jpeg',
//     altText: 'Slide 1',
//     caption: 'Slide 2',
//   },
//   {
//     src: 'https://www.lg.com/ar/images/plp-b2c/b2c-2/banner-webD.jpg',
//     altText: 'Slide 1',
//     caption: 'Slide 2',
//   },
// ];

const LandingPage = (props) => {
  return (
    <div className='contenedor'>
      <div className="tituloLanding">
        <h1 className="ejemplo">Tienda Online</h1>
      </div>
      <div className="tituloLanding">
        <Link to={'/home'}>
          <button className="CTA">Menu</button>
        </Link>
      </div>
      <img className="video" src="https://www.cronista.com/tools/image.php?id=355769&p=/files/image/355/355769/612f849082433.jpg&w=1256&h=664&s=0948515f21a61cd786f698539cfa02c2" alt="" />
    </div>
  )
  // const [activeIndex, setActiveIndex] = useState(0)
  // const [animating, setAnimating] = useState(false)

  // const next = () => {
  //   if (animating) return;
  //   const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
  //   setActiveIndex(nextIndex);
  // }

  // const previous = () => {
  //   if (animating) return;
  //   const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
  //   setActiveIndex(nextIndex);
  // }

  // const goToIndex = (newIndex) => {
  //   if (animating) return;
  //   setActiveIndex(newIndex);
  // }
  // const slides = items.map((item) => {
  //   return (
  //     <Carouselitem
  //       onExiting={() => setAnimating(true)}
  //       onExited={() => setAnimating(false)}
  //       key={item.src}
  //     >
  //       <img src={item.src} alt={item.altText} />
  //       <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
  //     </Carouselitem>
  //   )
  // })
  // return (
  //   <div>
  //     <Carousel
  //       activeIndex={activeIndex}
  //       next={next}
  //       previous={previous}
  //     >
  //       <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
  //       {slides}
  //       <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
  //       <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
  //     </Carousel>
  //   </div>
  // )

}
export default LandingPage;