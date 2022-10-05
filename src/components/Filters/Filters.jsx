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
    const products = useSelector(state => state.products);
    const [searchParams, setSearchParams] = useSearchParams();
    //-------------------- params
    const brand = searchParams.get('brand');
    const price = searchParams.get('price');
    const capacity = searchParams.get('capacity');
    const memory = searchParams.get('memoryRAM')
    const line = searchParams.get('line');
    // Cellphone's propierties
    let brandAll = [];
    let pricesAll = [];
    let lineAll = [];
    let capacityAll = []
    let memoryAll = []
    products.forEach(product => {
        brandAll.push(product.brand);
        pricesAll.push(product.price);
        lineAll.push(product.line);
        capacityAll.push(product.capacity);
        memoryAll.push(product.memoryRAM);
    });
    // Repeated results are eliminated from the arrays then sorted
    brandAll = brandAll.filter((item, index) => {
        return brandAll.indexOf(item) === index;
    });
    lineAll = lineAll.filter((item, index) => {
        return lineAll.indexOf(item) === index;
    });
    memoryAll = memoryAll.filter((item, index) => {
        return memoryAll.indexOf(item) === index;
    });
    memoryAll.sort()
    brandAll.sort();
    lineAll.sort();
    // Local state
    const [priceSlide, setPriceSlide] = useState([Math.floor(Math.min(...pricesAll)), Math.ceil(Math.max(...pricesAll))]);
    const [capacitySlide, setCapacitySlide] = useState([Math.floor(Math.min(...capacityAll)), Math.ceil(Math.max(...capacityAll))]);
    // Send selected filters
    function handlerSubmit(e) {
        e.target.value ? (e.target.name === 'price' || e.target.name === 'capacity' ) ?
            setSearchParams(searchParams.set(e.target.name, `${e.target.value[0]}/${e.target.value[1]}`)) :
            setSearchParams(searchParams.set(e.target.name, e.target.value)) :
            searchParams.delete(e.target.name);
        location.search = `?${searchParams.toString()}`;
        console.log(location)
        navigate(location);
    }
    // Save changes in the price slider
    function handlerChangePrice(e) {
        e.preventDefault();
        setPriceSlide(e.target.value);
    }
    function handlerChangeCapacity(e) {
        e.preventDefault();
        setCapacitySlide(e.target.value);
    }
    // Send price filter data
    function handlerPriceSubmit() {
        const prices = {
            target: {}
        };
        prices.target.name = 'price';
        prices.target.value = priceSlide;
        handlerSubmit(prices)
    }
    function handlercapacitySubmit() {
        const prices = {
            target: {}
        };
        prices.target.name = 'capacity';
        prices.target.value = capacitySlide;
        handlerSubmit(prices)
    }

    return (
        brand && price && capacity && line ? null :
            <div className='filtersContainer'>
                {
                    !brand ? <>
                        <b>Brand: </b>
                        <FormControl className='brandFilter'>
                            <Select className="selectStyle" name="brand" variant="filled" fullWidth size='small' onChange={(e) => handlerSubmit(e)}>
                                {
                                    brandAll.map((brand, i) => { return (<MenuItem key={i} value={brand}>{brand}</MenuItem>) })
                                }
                            </Select>
                        </FormControl>
                    </> : null
                }
                {
                    !memory ? <>
                        <b>RAM: </b>
                        <FormControl className='brandFilter'>
                            <Select className="selectStyle" name="memoryRAM" variant="filled" fullWidth size='small' onChange={(e) => handlerSubmit(e)}>
                                {
                                    memoryAll.map((brand, i) => { return (<MenuItem key={i} value={brand}>{brand}</MenuItem>) })
                                }
                            </Select>
                        </FormControl>
                    </> : null
                }
                {
                    !price ? <>
                        <b>Price: </b>
                        <FormControl className='filterPrice'>
                            <Slider
                                min={Math.floor(Math.min(...pricesAll))}
                                max={Math.ceil(Math.max(...pricesAll))}
                                valueLabelDisplay="auto"
                                value={priceSlide}
                                marks={[{ value: Math.floor(Math.min(...pricesAll)), label: `$${priceSlide[0]}` },
                                { value: Math.ceil(Math.max(...pricesAll)), label: `$${priceSlide[1]}` }]}
                                onChange={(e) => handlerChangePrice(e)}
                            />
                            <IconButton onClick={() => handlerPriceSubmit()} aria-label="send">
                                <SendIcon />
                            </IconButton>
                        </FormControl>
                    </> : null
                }
                {
                    !capacity ? <>
                        <b>Capacity: </b>
                        <FormControl className='filterPrice'>
                            <Slider
                                min={Math.floor(Math.min(...capacityAll))}
                                max={Math.ceil(Math.max(...capacityAll))}
                                valueLabelDisplay="auto"
                                value={capacitySlide}
                                marks={[{ value: Math.floor(Math.min(...capacityAll)), label: `${capacitySlide[0]}GB` },
                                { value: Math.ceil(Math.max(...capacityAll)), label: `${capacitySlide[1]}GB` }]}
                                onChange={(e) => handlerChangeCapacity(e)}
                            />
                            <IconButton onClick={() => handlercapacitySubmit()} aria-label="send">
                                <SendIcon />
                            </IconButton>
                        </FormControl>
                    </> : null
                }
                {
                    !line ? <>
                        <b>Line: </b>
                        <FormControl className='categoryFilter'>
                            <Select className="selectStyle" name="line" variant="filled" fullWidth size='small' onChange={(e) => handlerSubmit(e)}>
                                {
                                    lineAll.map((line, i) => { return (<MenuItem key={i} value={line}>{line}</MenuItem>) })
                                }
                            </Select>
                        </FormControl>
                    </> : null
                }
            </div>
    )
}