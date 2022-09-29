import { addToFav, addToCart } from '../Card/favAndCart';
import {toast} from 'react-hot-toast'

export const fav = (id, brand, line, model, price, stock, capacity, image, memoryRAM) =>{
        
    addToFav(id, brand, line, model, price, stock, capacity, image, memoryRAM)
    
    toast('Added to favorites',
    {
        icon: '⭐',
        duration: 1700,
        style: {
        borderRadius: '10px',
        background: '#FFCA33',
        color: '#fff',
        minWidth: '210px'
        },
    }
    );     
}
  
export  const cart = (id, brand, line, model, price, stock, capacity, image, memoryRAM) =>{
        
    addToCart(id, brand, line, model, price, stock, capacity, image, memoryRAM)
    
    toast('Added to cart',
    {
        icon: '🛒',
        duration: 1700,
        style: {
        borderRadius: '10px',
        background: '#2C89EC ',
        color: '#fff',
        minWidth: '210px',
        },
    }
    );     
}

export  const remove = () =>{
    
    toast('Removed',
    {
        icon: '❌',
        duration: 1700,
        style: {
        borderRadius: '10px',
        background: '#F4574A',
        color: '#fff',
        minWidth: '210px',
        },
    }
    );     
}

export  const success = (msg) =>{
    
    toast(msg,
    {
        icon: '✔',
        duration: 1700,
        style: {
        borderRadius: '10px',
        background: '#2ACA32  ',
        color: '#fff',
        minWidth: '210px',
        },
    }
    );     
}

export const error = (msg) =>{
    toast.error(msg,
        {
            duration: 2100,
            style: {
            borderRadius: '10px',
            background: '#F4574A',
            color: '#fff',
            minWidth: '210px',
            },

        })
}