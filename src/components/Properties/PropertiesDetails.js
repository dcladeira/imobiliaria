import { useNavigate } from "react-router-dom";
import { Button, Carousel, Badge, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import "./PropertiesDetails.css";
import EditProperties from "./EditProperties";
import axios from 'axios';

function PropertiesDetails({ apiURL, body, setBody }) {
  // const { id } = useParams();
  const [property] = useState(body);
  const navigate = useNavigate()

  // useEffect(() => {
  //   try {
  //     const fetchProperty = async () => {
  //       const response = await axios.get(`${apiURL}/${id}`);
  //       console.log(response.data);
  //       setProperty(response.data);
  //     };
  //     fetchProperty();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [apiURL, id, property]);

  const deleteProperty = async (id) => {
    await axios.delete(`${apiURL}/${id}`);
    navigate("/");
  }

  return (
    <Container key="property._id" className="propertyDescription">
      <h1>{property.title}</h1>
      <p>
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
        {property.photos.map((photo) => {
          return (
            <Carousel.Item>
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
          <Button variant="danger" onClick={()=>deleteProperty(property._id)}>
            Excluir imóvel
          </Button>
        </Col>
        <Col>
          <EditProperties apiURL={apiURL} body={body} setBody={setBody} property={property} />
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
