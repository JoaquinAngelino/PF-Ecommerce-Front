
import React, { useState } from 'react'; 
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';


const items = [
  {
    src: 'https://apple2fan.com/wp-content/uploads/2020/10/Captura-de-pantalla-2020-10-13-a-las-19.46.59.png',
    // altText: 'Slide 1',
    // caption: 'Slide 1',
  },
  {
    src: 'https://depor.com/resizer/O77xSXFS32q6W_y3F147RtBfp1Q=/1200x675/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/ECBYORMINFGF3HOTNUQCQ7QCXI.webp',

  },
  {
    src: 'https://i0.wp.com/apperlas.com/wp-content/uploads/2016/09/iPhone-7-agua.jpg?ssl=1',

  },
  {
    src: 'https://hd2.tudocdn.net/893603?w=1920',

  },
  {
    src: 'https://clongeek.com/wp-content/uploads/2021/03/iPhone-13-1.jpg',

  },
  {
    src: 'https://www.cined.com/content/uploads/2020/02/galaxy_s20_ultra_2-1300x750.jpg',

  },
];


const LandingPage = () => {

  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} width="100%" height="460px" alt='landing_image' />
        <CarouselCaption />
      </CarouselItem>
    )
  })
  return (
    <div className='container'>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  )
}

export default LandingPage
