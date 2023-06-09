import Offcanvas from 'react-bootstrap/Offcanvas';
import { getCartThunk } from '../store/slices/cart.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "react-bootstrap/Button";
import { updateProductThunk } from '../store/slices/cart.slice';
import { deleteProductThunk } from '../store/slices/cart.slice';
import { purchasesCartThunk } from '../store/slices/cart.slice';

export function CartSideBar({show, handleClose}) {
  const dispatch = useDispatch()
  const products = useSelector(state => state.cartSlice)

  const decrementProduct = (prod) => {
    if (prod.quantity > 1) {
      dispatch(updateProductThunk(prod.id, prod.quantity - 1))
    } else {
      dispatch(deleteProductThunk(prod.id))
    }
  }

  const incrementProduct = (prod) => {
    dispatch(updateProductThunk(prod.id, prod.quantity + 1))
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
                  <Button className='p-2 btn-dark' onClick={() => decrementProduct(prod)}>-</Button>
                  <span>{prod.quantity}</span>
                  <Button  className='p-2 btn-dark' onClick={() => incrementProduct(prod)}>+</Button>
                </li>
              ))
            }
          </ul>
        </Offcanvas.Body>
        <Button className='mb-2' style={{margin: "auto", width: "90%"}} onClick={() => dispatch(purchasesCartThunk())}>
          BUY
        </Button>
      </Offcanvas>
    </>
  );
}
