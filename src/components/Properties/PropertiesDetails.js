import { useNavigate } from "react-router-dom";
import { Button, Carousel, Badge, Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PropertiesDetails.css";
import EditProperties from "./EditProperties";
import axios from 'axios';

function PropertiesDetails({ isAdmin, apiUrl}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [body, setBody] = useState({
    code: "",
    title: "",
    description: "",
    type: "",
    transaction: "",
    state: "",
    city: "",
    neighborhood: "",
    address: "",
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    amenities: {
      swimming: false,
      concierge: false,
      gourmet: false,
      parking: false,
    },
    photos: [],
  });
  const [property, setProperty] = useState(body);

  useEffect(() => {
    try {
      const fetchProperty = async () => {
        const response = await axios.get(`${apiUrl}/${id}`);
        setProperty(response.data);
      };
      fetchProperty();
    } catch (error) {
      console.log(error);
    }
  }, [apiUrl, id]);

  const deleteProperty = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    navigate("/");
  }

  return (
    <Container key="property._id" className="propertyDescription">
      <h1>{property.title}</h1>
      <p>
        <Badge bg="info">{property.transaction}</Badge>{" "}
        <Badge bg="info">{property.type}</Badge>{" "}
        <Badge bg="info">{property.city}</Badge>{" "}
        <Badge bg="primary">Imóvel {property.code}</Badge>
      </p>
      <p className="features">
        <span>{property.area} m²</span>
        <span>{property.bedrooms} quartos</span>
        <span>{property.bathrooms} banheiros</span>
      </p>
      <p id="price">R${property.price}</p>
      <h2>Descrição:</h2>
      <p>{property.description}</p>
      <h2>Comodidades:</h2>
      <p>
        {property.amenities.swimming && (
          <Badge pill bg="secondary">
            Piscina
          </Badge>
        )}{" "}
        {property.amenities.concierge && (
          <Badge pill bg="secondary">
            Portaria
          </Badge>
        )}{" "}
        {property.amenities.gourmet && (
          <Badge pill bg="secondary">
            Área gourmet
          </Badge>
        )}{" "}
        {property.amenities.parking && (
          <Badge pill bg="secondary">
            Vaga de garagem
          </Badge>
        )}{" "}
      </p>
      <Carousel className="photos">
        {property.photos.map((photo, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 h-50"
                src={photo}
                alt="First slide"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>

      <Row className="footerButtons">
        <Col>
          {isAdmin && <Button variant="danger" onClick={()=>deleteProperty(property._id)}>
            Excluir imóvel
          </Button>}
        </Col>
        <Col>
          {isAdmin && <EditProperties id={id} apiUrl={apiUrl} body={body} setBody={setBody} property={property} />}
        </Col>
        <Col>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PropertiesDetails;
