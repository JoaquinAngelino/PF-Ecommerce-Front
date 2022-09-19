import React, { useState } from 'react';
// import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
// import { Link } from 'react-router-dom';


const gamesSlider = [
  {
    id: 3498,
    name: 'Grand Theft Auto V',
    img: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
  },

  {
    id: 60,
    name: 'ads 01',
    img: 'https://cdn.memorykings.pe/files/2022/03/26/325854-MK026454-GRANDE.jpg',
  },
  {
    id: 61,
    name: 'ads 02',
    img: 'https://images-eu.ssl-images-amazon.com/images/G/30/CE/Electronica/PC2018/murclara/amazon-banner-gaming-days_1.png',
  },
  {
    id: 62,
    name: 'ads 03',
    img: 'https://mesajil.com/wp-content/uploads/elementor/thumbs/Banner-Desktop-Sorteo-Cougar-SillaCase-1-pfxuu8hr2ksftp8338ji2fjmenpws04vzfus93xsvk.jpg',
  },
  {
    id: 63,
    name: 'ads 04',
    img: 'https://www.cm-soluciones.com.ar/static/media/banner-4.c5f21dec.jpeg',
  },
  {
    id: 64,
    name: 'ads 05',
    img: 'https://www.lg.com/ar/images/plp-b2c/b2c-2/banner-webD.jpg',
  },
];



export default function LandingPage() {

  const [currentPage, setCurrentPage] = useState(0);

  gamesSlider = gamesSlider?.flat(Infinity);

  const paginatedGames = () => {
    return gamesSlider?.slice(currentPage, currentPage + 1);
  };

  const nextPage = () => {
    if (gamesSlider?.length > currentPage + 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
//no se por que no puedo rederizar hoy lo veo 

//   return (
//     <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">

//       <div>
//         <ol className="carousel-indicators">
//           <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
//           <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//           <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//         </ol>
//       </div>
//         {paginatedGames().map((e) => {
//           return (
//             <div className="carousel-inner">
//               <div className="carousel-item active">
//                 <img className="d-block" src={e.img} alt="First slide" />
//               </div>
//             </div>
//           )
//         }
//       }
//       <div>
//         <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="sr-only">Previous</span>
//         </a>
//         <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="sr-only">Next</span>
//         </a>
//       </div>
//     </div>
//   )
}