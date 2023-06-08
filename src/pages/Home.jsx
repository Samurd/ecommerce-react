import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getProductThunk,
  filterCategoryThunk,
  filterCategoryNameThunk
} from "../store/slices/products.slice";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Link } from "react-router-dom";

export function Home() {
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productsSlice);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    dispatch(getProductThunk());
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="">
      <Row className="pt-5">
        <Col md={4} lg={3}>
          <h3>Category</h3>
          <Form.Select className="w-100" onChange={e => dispatch(filterCategoryThunk(e.target.value))}>
            <option value="">All products</option>
            {categories.map((cate) => (
              <option
              value={cate.id}
                key={cate.id}
              >
                {cate.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={8} lg={9} className='pt-5' >
          <h1>Productos</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search for name"
              aria-label="Search for name"
              aria-describedby="basic-addon2"
              value={searchValue}
              onChange={ e => setSearchValue(e.target.value)}
            />
            <Button variant="outline-primary" id="button-addon2" onClick={() => dispatch(filterCategoryNameThunk(searchValue))}>
              Search
            </Button>
          </InputGroup>
          <Row xs={1} md={1} lg={3}>
            {productsList.map((product) => (
              <Col className="mb-3" key={product.id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                  className="p-1"
                    variant="top"
                    src={product.images[0].url}
                    style={{width: "100%", height: "200px", objectFit: "contain"}}
                  />
                  <Card.Body>
                    <Card.Title style={{overflowX: "hidden", height: "50px", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{product.title}</Card.Title>
                    <Button style={{fontSize: "17px"}} className="w-100" as={Link} to={`/product/${product.id}`} variant="primary">See more</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
