import Offcanvas from 'react-bootstrap/Offcanvas';
import { getCartThunk } from '../store/slices/cart.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "react-bootstrap/Button";

export function CartSideBar({show, handleClose}) {
  const dispatch = useDispatch()
  const products = useSelector(state => state.cartSlice)

  const updateProductInCart = (id, quantity) => {
    const prod = {
      productId: id,
      quantity: quantity,
      
    }
  }

  useEffect(() => {
    dispatch(getCartThunk())
  }, [])

  return (
    <>

      <Offcanvas placement='end' show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>YOUR CART</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{overflowY: "scroll"}}>
          <ul className='cart-list'>
            { products.length === 0 ? <li>There aren't products</li> : products?.map(prod => (
                <li className='p-2' key={prod.id}>
                  <img src={prod.product.images && prod.product.images[0].url} alt="" />
                  <small>{prod.product.title}</small>
                  <Button className='p-2 btn-dark'>-</Button>
                  <span>{prod.quantity}</span>
                  <Button  className='p-2 btn-dark'>+</Button>
                </li>
              ))
            }
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
