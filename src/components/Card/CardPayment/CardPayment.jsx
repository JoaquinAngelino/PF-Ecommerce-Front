import './CardPayment.css'


export default function CardHover ({name, image, price}) {
    return (
        <div class="wrapper">
	        <div class="cards">
		        <figure class="card">
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