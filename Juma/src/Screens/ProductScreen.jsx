import { useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
// import products from "../products"; // Remove this since you're using an API call
import { useGetProductDetailsQuery } from "../slices/productsApiSplice.js";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const { id: productId } = useParams(); // Get the productId from the URL

  const [qty, setQty] = useState(1); // Initialize quantity state

  // Fetch product details using the API query hook
  const {
    data: productData, // Renamed the fetched data to avoid conflicts
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  // If loading, show loading message
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // If there is an error fetching the product details, show the error
  if (error) {
    return <div>{error?.data?.message || error.error}</div>;
  }

  const product = productData || {}; // Fallback to empty object if data is not available

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          {/* Product Image */}
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          {/* Product Details */}
          <Col md={4}>
            <ListGroup variant="flush">
              <h3>{product.name}</h3>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Product Action Section (Add to Cart) */}
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                {/* Price */}
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* Description */}
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>

                {/* Status (In Stock/Out of Stock) */}
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* Quantity Selector (only if product is in stock) */}
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))} // Update quantity
                        >
                          {Array.from(
                            { length: product.countInStock },
                            (_, x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                {/* Add to Cart Button */}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
