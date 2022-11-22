import axios from "axios";
import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import './PropertiesList.css'

function Properties({ apiUrl, filter, setFilter }) {
  const [properties, setProperties] = useState([]);
  const [propertiesFiltered, setPropertiesFiltered] = useState([]);


  
  setPropertiesFiltered([...properties].filter(property =>{
    console.log()
    
    if(property.city == filter.city ||
    property.state==filter.state ||
    property.transactionValue== filter.transactionValue ||
    property.numberOfRooms==filter.numberOfRooms ||
    property.numberOfBathrooms==filter.numberOfBathrooms ||
    property.minValue== filter.minValue ||
    property.maxValue==filter.maxValue ||
    property.amenities.swimming == filter.amenities.swimming ||
    property.amenities.concierge == filter.amenities.concierge ||
    property.amenities.gourmet == filter.amenities.gourmet ||
    property.amenities.parking == filter.amenities.parking) {
        return true
    } else {
    return false}
    

  }))

  useEffect(() => {
    try {
      const fetchProperties = async () => {
        const response = await axios.get(apiUrl);
        setProperties(response.data);
      };
      fetchProperties();
    } catch (e) {
      console.log(e);
    }
  }, [properties, apiUrl]);

  return (
    <div className="d-flex justify-content-center flex-wrap">
      {propertiesFiltered.map((property) => {
        return (
            
          <Card className="shadow p-3 mb-5 bg-body rounded" key={property._id} style={{ width: "22rem" }}>
          <Card.Body className="d-flex justify-content-between">
              <Card.Title>{property.transaction}</Card.Title>
              <Card.Text>{property.price}</Card.Text>
            </Card.Body>
            <Card.Img variant="top" src={property.photos[0]} />
            <Card.Body>
              <Card.Title>{property.title}</Card.Title>
              <Card.Text>{property.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Área: {property.area} m²</ListGroup.Item>
              <ListGroup.Item>Quartos: {property.bedrooms}</ListGroup.Item>
              <ListGroup.Item>Banheiros: {property.bathrooms}</ListGroup.Item>
              <ListGroup.Item>
                Localização: {property.city} - {property.state}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        );
      })}
      </div>
  );
}

export default Properties;
