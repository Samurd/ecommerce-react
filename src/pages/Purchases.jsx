import { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { getConfig } from "../utils/getConfig";

export function Purchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://e-commerce-api-v2.academlo.tech/api/v1/purchases",
        getConfig()
      )
      .then((res) => {
        console.log(res.data);
        setPurchases(res.data);
      });
  }, []);

  return (
    <div className="my-5">
      <h1>Purchases</h1>
      <ListGroup className="mx-auto" style={{width: "100%"}}>
        {purchases?.map((prod) => (
          <ListGroup.Item style={{display: "flex", alignItems: "center", flexWrap: "wrap"}} key={prod.id}>
            <img
              src={prod.product.images && prod.product.images[0].url}
              alt=""
              style={{
                width: "100px",
                objectFit: "contain",
                height: "100px",
                marginRight: "1rem",
              }}
            />
            <p className="m-0 p-0">{prod.product.title}</p>
            <Badge className="m-2 p-2" bg="primary" pill>
            Quantity: {prod.quantity}
            </Badge>
            <Badge className="m-2 p-2" bg="primary" pill>
            Price: {prod.product.price}
            </Badge>
            <Badge className="m-2 p-2" bg="primary" pill>
            Total: {prod.product.price * prod.quantity}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
