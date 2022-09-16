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
    const stock = searchParams.get('stock');
    const line = searchParams.get('line');
    // Cellphone's propierties
    let brandAll = [];
    let pricesAll = [];
    let lineAll = [];
    products.forEach(product => {
        brandAll.push(product.brand);
        pricesAll.push(product.price);
        lineAll.push(product.line);
    });
    // Repeated results are eliminated from the arrays then sorted
    brandAll = brandAll.filter((item, index) => {
        return brandAll.indexOf(item) === index;
    });
    lineAll = lineAll.filter((item, index) => {
        return lineAll.indexOf(item) === index;
    });
    brandAll.sort();
    lineAll.sort();
    // Local state
    const [priceSlide, setPriceSlide] = useState([Math.floor(Math.min(...pricesAll)), Math.ceil(Math.max(...pricesAll))]);
    // Send selected filters
    function handlerSubmit(e) {
        e.target.value ? e.target.name === 'price' ?
            setSearchParams(searchParams.set(e.target.name, `${e.target.value[0]}/${e.target.value[1]}`)) : // "100/300"
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
    // Send price filter data
    function handlerRangeSubmit() {
        const prices = {
            target: {}
        };
        prices.target.name = 'price';
        prices.target.value = priceSlide;
        handlerSubmit(prices)
    }

    return (
        brand && price && stock && line ? null :
            <div className='filtersContainer'>
                {
                    !brand ? <>
                        <b>brand: </b>
                        <FormControl className='brandFilter'>
                            <Select name="brand" variant="filled" fullWidth size='small' onChange={(e) => handlerSubmit(e)}>
                                {
                                    brandAll.map((brand, i) => { return (<MenuItem key={i} value={brand}>{brand}</MenuItem>) })
                                }
                            </Select>
                        </FormControl>
                    </> : null
                }
                {
                    !price ? <>
                        <b>price: </b>
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
                    !line ? <>
                        <b>line: </b>
                        <FormControl className='categoryFilter'>
                            <Select name="line" variant="filled" fullWidth size='small' onChange={(e) => handlerSubmit(e)}>
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