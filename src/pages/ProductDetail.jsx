import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Alert from "react-bootstrap/Alert";

import { useDispatch, useSelector } from "react-redux";
import { setAlertSuccess } from "../store/slices/alertSuccess.slice";

import { filterCategoryThunk } from "../store/slices/products.slice";
import { addProductThunk } from "../store/slices/cart.slice";
import { setAlertError } from "../store/slices/alertError.slice";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const alertSuccessState = useSelector((state) => state.alertSuccessSlice)
  const alertErrorState = useSelector((state) => state.alertErrorSlice)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allproducts = useSelector((state) => state.productsSlice);
  const productFiltered = allproducts.filter(
    (product) => product.id !== Number(id)
  );

  const addToCart = () => {
    const prod = {
      productId: product.id,
      quantity: quantity,
    };

    const token = localStorage.getItem("tokenUser");
    if (token) {
      dispatch(addProductThunk(prod));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        console.log(res.data);
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

  useEffect(() => {
    if(alertSuccessState === "flex") {
      setTimeout(() => {
        dispatch(setAlertSuccess("none"))
      }, 2000)
    }
  }, [alertSuccessState])

  useEffect(() => {
    if (alertErrorState === "flex") {
      setTimeout(() => {
        dispatch(setAlertError("none"))
      }, 5000)
    }
  }, [alertErrorState])

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="pt-5 container-detail-product">
      <Alert
        style={{ position: "fixed", bottom: "10px", display: `${alertSuccessState}`, zIndex: "90"}}
        className="alert-success "
        variant="success"
      >
        Product successfully added.
      </Alert>
      <Alert
        style={{ position: "fixed", bottom: "10px", display: `${alertErrorState}`, zIndex: "90"}}
        className="alert-error w-50 "
        variant="danger"
      >
        this product is already, delete the product and choose the correct quantity you want to buy.
      </Alert>
      <Row className="wx-50">
        <Col sm={5}>
          <Carousel
            variant="dark"
            style={{ width: "100%", height: "550px" }}
            slide={false}
          >
            <Carousel.Item>
              <img
                style={{ objectFit: "contain", width: "100%", height: "550px" }}
                className="d-block w-100"
                src={product.images && product.images[0].url}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ objectFit: "contain", width: "100%", height: "550px" }}
                className="d-block w-100"
                src={product.images && product.images[1].url}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ objectFit: "contain", width: "100%", height: "550px" }}
                className="d-block w-100"
                src={product.images && product.images[2].url}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
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

          <Button
            style={{ width: "40%", fontSize: "16px" }}
            onClick={() => {
              addToCart()
            }}
            className="my-3"
            variant="primary"
          >
            ADD TO CART
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
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      overflowX: "hidden",
                      height: "50px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                    title={product.title}
                  >
                    {product.title}
                  </Card.Title>
                  <Button
                    style={{ fontSize: "17px" }}
                    className="w-100"
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
