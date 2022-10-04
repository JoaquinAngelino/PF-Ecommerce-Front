import './CardPayment.css'


export default function CardHover ({name, image, price}) {
    return (
        <div className="wrapper">
	        <div className="cards">
		        <figure className="card">
					<div className='imgCard'>
					<img src={`${image}`} alt='imagen' 	/>
					</div>
					<div className='capCard01'>
						<figcaption>{name}</figcaption>
					</div>
					<div className='capCard02'>
						<figcaption>{price ? `$ ${price}` : null}</figcaption>
					</div>
		        </figure>
	        </div>
        </div>
    )
}