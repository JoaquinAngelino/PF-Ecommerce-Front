// React utilities
import React, { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Styles
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Slider from '@mui/material/Slider';
import './Filters.css';

export default function Filters() {

    // Hooks
    const location = useLocation();
    const navigate = useNavigate();
    const products = useSelector(state => state.instruments);
    const [searchParams, setSearchParams] = useSearchParams();
    //-------------------- params
    const marca = searchParams.get('marca');
    const precio = searchParams.get('precio');
    const stock = searchParams.get('stock');
    const linea = searchParams.get('linea');
    // Cellphone's propierties
    let marcaAll = [];
    let preciosAll = [];
    let lineaAll = [];
    products.forEach(product => {
        marcaAll.push(product.marca);
        preciosAll.push(product.precio);
        lineaAll.push(product.linea);
    });
    // Repeated results are eliminated from the arrays then sorted
    marcaAll = marcaAll.filter((item, index) => {
        return marcaAll.indexOf(item) === index;
    });
    lineaAll = lineaAll.filter((item, index) => {
        return lineaAll.indexOf(item) === index;
    });
    marcaAll.sort();
    lineaAll.sort();
    // Local state
    const [precioSlide, setPrecioSlide] = useState([Math.floor(Math.min(...preciosAll)), Math.ceil(Math.max(...preciosAll))]);
    // Send selected filters
    function handlerSubmit(e) {
        e.target.value ? e.target.name === 'precio' ?
            setSearchParams(searchParams.set(e.target.name, `${e.target.value[0]}/${e.target.value[1]}`)) :
            setSearchParams(searchParams.set(e.target.name, e.target.value)) :
            searchParams.delete(e.target.name);
        location.search = `?${searchParams.toString()}`;
        navigate(location);
    }
    // Save changes in the precio slider
    function handlerChangeprecio(e) {
        e.preventDefault();
        setPrecioSlide(e.target.value);
    }
    // Send precio filter data
    function handlerRangeSubmit() {
        const precios = {
            target: {}
        };
        precios.target.name = 'precio';
        precios.target.value = precioSlide;
        handlerSubmit(precios)
    }

    return (
        marca && precio && stock && linea ? null :
            <div className='filtersContainer'>
                {
                    !marca ? <>
                        <b>marca: </b>
                        <FormControl className='brandFilter'>
                            <Select name="marca" variant="filled" fullWidth size='small' onChange={(e) => handlerSubmit(e)}>
                                {
                                    marcaAll.map((marca, i) => { return (<MenuItem key={i} value={marca}>{marca}</MenuItem>) })
                                }
                            </Select>
                        </FormControl>
                    </> : null
                }
                {
                    !precio ? <>
                        <b>precio: </b>
                        <FormControl className='filterPrice'>
                            <Slider
                                min={Math.floor(Math.min(...preciosAll))}
                                max={Math.ceil(Math.max(...preciosAll))}
                                valueLabelDisplay="auto"
                                value={precioSlide}
                                marks={[{ value: Math.floor(Math.min(...preciosAll)), label: `$${precioSlide[0]}` },
                                { value: Math.ceil(Math.max(...preciosAll)), label: `$${precioSlide[1]}` }]}
                                onChange={(e) => handlerChangeprecio(e)}
                            />
                            <IconButton onClick={() => handlerRangeSubmit()} aria-label="send">
                                <SendIcon />
                            </IconButton>
                        </FormControl>
                    </> : null
                }
                {
                    !stock ? <>
                        <b>stock: </b>
                        <FormControl className='stockFilter'>
                            <Select name="stock" variant="filled" fullWidth size='small' onChange={(e) => handlerSubmit(e)}>
                                <MenuItem value="yes">Aviable</MenuItem>
                                <MenuItem value="no">Not aviable</MenuItem>
                            </Select>
                        </FormControl>
                    </> : null
                }
                {
                    !linea ? <>
                        <b>linea: </b>
                        <FormControl className='categoryFilter'>
                            <Select name="linea" variant="filled" fullWidth size='small' onChange={(e) => handlerSubmit(e)}>
                                {
                                    lineaAll.map((linea, i) => { return (<MenuItem key={i} value={linea}>{linea}</MenuItem>) })
                                }
                            </Select>
                        </FormControl>
                    </> : null
                }
            </div>
    )
}