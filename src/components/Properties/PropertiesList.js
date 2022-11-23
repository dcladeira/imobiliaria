import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function PropertiesList({ apiUrl }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    try {
      const fetchProperties = async () => {
        const response = await axios.get(apiUrl);
        setProperties(response.data);
      };
      fetchProperties();
    } catch (error) {
      console.log(error);
    }
  }, [apiUrl]);

  return (
    <Container>
      {properties.map((property) => {
        return (
          <Row key={property._id}>
            <Col>{property._id}</Col>
            <Col>
              <Button variant="primary" size="sm">
                <Link className="nav-link" to={`/properties/${property._id}`}>
                  Detalhes
                </Link>
              </Button>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
}

export default PropertiesList;
