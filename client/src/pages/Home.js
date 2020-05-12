import React, { useState } from "react";
import {Button, Form, Alert} from 'react-bootstrap';
import axios from 'axios';

import "./Home.css"

const Home = () => {
  const [image, setImage] = useState('')
  const [error, setError] = useState(false)
  const [successfull, setSuccessfull] = useState(false)

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
        if(!image) {
          setError(true)
          setSuccessfull(false)
        } else {
          formData.append('myImage', image);
          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          };
          axios.post("/api/upload",formData,config)
              .then((response) => {
                  alert("The file is successfully uploaded");
                  setError(false)
                  setSuccessfull(true)
              }).catch((error) => {
          });
        }

  }
  return (
    <div className="home-container">
    {error && <Alert variant="danger">Wählen Sie ein Bild aus</Alert>}
    {successfull && <Alert variant="success">Bild wurde erfolgreich hochgeladen</Alert>}
      <Form onSubmit={onFormSubmit}>
        <Form.Group>
        <Form.Label>Bild hinzufügen</Form.Label>
          <Form.Control type="file" placeholder="Bitte Bild hinzufügen" onChange={(e) => setImage(e.target.files[0])}/>
        </Form.Group>
        <Button type="submit">Upload</Button>
      </Form>
    </div>
  );
};

export default Home;
