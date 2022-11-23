import axios from "axios";
import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import './PropertiesList.css'

function PropertiesList({ apiUrl, filter }) {
  const [properties, setProperties] = useState([]);

  const propertiesFiltered = properties.filter(property =>{
  

    
    if((property.city === filter.city || filter.city === '' ) &&
    (property.state===filter.state || filter.state === '') &&
    (property.type.toLowerCase()===filter.type.toLowerCase() || filter.type === '') &&
    (property.transaction.toLowerCase() === filter.transaction.toLowerCase() || filter.transaction === '') &&
    (+property.bathrooms=== +filter.bathrooms || (property.bathrooms>= 4 && +filter.bathrooms === 4) || filter.bathrooms === '') &&
    (+property.bedrooms=== +filter.bedrooms || (property.bedrooms>= 4 && +filter.bedrooms === 4) || filter.bedrooms === '') &&
    ((+property.price >= +filter.minValue && +property.price <= +filter.maxValue) || filter.maxValue === '') &&
    (property.amenities.swimming === filter.amenities.swimming === true || filter.amenities.swimming === false) &&
    (property.amenities.concierge === filter.amenities.concierge === true || filter.amenities.concierge === false) &&
    (property.amenities.gourmet === filter.amenities.gourmet === true || filter.amenities.gourmet === false) &&
    (property.amenities.parking === filter.amenities.parking === true || filter.amenities.parking === false)
    ) {
        return true
    } else {
    return false}
  })


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
           <Link key={property._id} className="nav-link" to={`/properties/${property._id}`}>
          <Card className="shadow p-3 mb-5 bg-body rounded" style={{ width: "22rem" }}>
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
          </Link> 
        );
      })}
      </div>
  );
}

export default PropertiesList;
