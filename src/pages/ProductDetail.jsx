import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { useDispatch, useSelector } from "react-redux";

import { filterCategoryThunk } from "../store/slices/products.slice";
import { addProductThunk } from "../store/slices/cart.slice";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const allproducts = useSelector((state) => state.productsSlice);
  const productFiltered = allproducts.filter(
    (product) => product.id !== Number(id)
  );

  const addToCart = () => {
    const prod = {
      productId: product.id,
      quantity: quantity,

    }

    dispatch(addProductThunk(prod))
  }

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        dispatch(filterCategoryThunk(res.data.categoryId));
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        dispatch(filterCategoryThunk(res.data.categoryId));
      });
  }, [id]);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="pt-5 container-detail-product">
      <Row className="wx-50">
        <Col sm={5}>
          {product.images && <img className="img-detail ms-auto" src={product.images[0].url} alt="" />}
        </Col>
        <Col className="mt-3">
        <h1>{product.title} </h1>
          <p className="lead">{product.description}</p>

          <Row style={{ justifyContent: "center", alignItems: "center" }}>
            <Col lg={6}>
              <p className="lead text-secondary mb-0">Price:</p>
              <h3 className="text-dark">{product.price}</h3>
            </Col>
            <Col>
              <div className="product-btns-quantity">
                <p className="lead mb-1">Quantity:</p>
                <Button variant="primary" onClick={() => decrementQuantity()}>
                  -
                </Button>
                <span className="p-2">{quantity}</span>
                <Button
                  variant="primary"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </Col>
          </Row>

          <Button style={{width: "40%", fontSize: "16px"}} onClick={addToCart} className="my-3" variant="primary">
            Add to cart
          </Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <h2>Discover similar items</h2>
        <Row md={2} lg={3}>
          {productFiltered?.map((product) => (
            <Col className="mb-3" key={product.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={product.images[0].url}
                  style={{width: "100%", height: "200px", objectFit: "contain"}}
                />
                <Card.Body>
                  <Card.Title style={{overflowX: "hidden", height: "50px", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{product.title}</Card.Title>
                  <Button
                  style={{fontSize: "17px"}} className="w-100"
                    as={Link}
                    to={`/product/${product.id}`}
                    variant="primary"
                  >
                    See more
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Row>
    </div>
  );
}
