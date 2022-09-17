
export const addToFav = (id, brand, line, model, price, stock, capacity, image, memoryRAM, handleAdded) => {
  let favs = JSON.parse(localStorage.getItem('favList'))
  if (favs) {
    if (!favs.some(item => item.id === id)) {
      favs.push({ id, brand, line, model, price, stock, capacity, image, memoryRAM})
    }
  } else {
    favs = [{ id, brand, line, model, price, stock, capacity, image, memoryRAM}]
  }
  localStorage.setItem('favList', JSON.stringify(favs))
  // handleAdded()
}

export const addToCart = (id, brand, line, model, price, stock, capacity, image, memoryRAM, handleAdded) => {
  let cart = JSON.parse(localStorage.getItem('cartList'))
  if (cart) {
    if (!cart.some(item => item.id === id)) {
      cart.push({ id, brand, line, model, price, stock, capacity, image, memoryRAM, quantity: 1 })
    }
  } else {
    cart = [{ id, brand, line, model, price, stock, capacity, image, memoryRAM, quantity: 1 }]
  }
  localStorage.setItem('cartList', JSON.stringify(cart))
  // handleAdded()
}

export const getPrice = () => {
  let total = 0
  JSON.parse(localStorage.getItem('cartList')).forEach(e => {
    total += e.price * e.quantity
  })
  return total.toFixed(2)
}
