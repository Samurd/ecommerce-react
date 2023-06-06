import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { useDispatch, useSelector } from "react-redux";

import { filterCategoryThunk } from "../store/slices/products.slice";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const allproducts = useSelector((state) => state.productsSlice);
  const productFiltered = allproducts.filter(
    (product) => product.id !== Number(id)
  );

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        dispatch(filterCategoryThunk(res.data.categoryId));
      });
  }, []);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="pt-5">
      <Row>
        <Col sm={6}>
          <h1>{product.title} </h1>
        </Col>
        <Col>
          <p className="lead">{product.description}</p>

          <Row style={{ justifyContent: "center", alignItems: "center" }}>
            <Col lg={6}>
              <p className="lead text-secondary mb-0">Price:</p>
              <h3 className="text-dark">{product.price}</h3>
            </Col>
            <Col>
              <div className="product-btns-quantity">
                <p className="lead mb-1">Quantity:</p>
                <Button variant="dark" onClick={() => decrementQuantity()}>
                  -
                </Button>
                <span className="p-2">{quantity}</span>
                <Button
                  variant="dark"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </Col>
          </Row>

          <Button className="my-3" variant="dark">
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
                  style={{ objectFit: "cover", width: "100%" }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Button
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