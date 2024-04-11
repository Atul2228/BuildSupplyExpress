
import axios from "axios";
import {  server } from "../../server";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product"; // Adjust according to your actual import
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { AiOutlineCamera } from "react-icons/ai";
import { loadSeller } from "../../redux/actions/user";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(seller.avatar?.url);
  const [name, setName] = useState(seller.name);
  const [description, setDescription] = useState(seller.description || "");
  const [address, setAddress] = useState(seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller.zipCode);

  useEffect(() => {
    // Handling potential notifications from previous operations
    // This is just a placeholder, adjust according to your logic
  }, [seller]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    // // Perform your update operation here
    // // Example:
    // // dispatch(updateSellerInfo({ name, description, address, phoneNumber, zipCode, avatar }));
    // toast.success("Shop updated successfully!");
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h3 className="text-center mb-4">Shop Settings</h3>
          <Form onSubmit={updateHandler}>
            <div className="text-center mb-3">
              <img src={avatar} alt="Shop Avatar" className="rounded-circle mb-3" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              <InputGroup className="mb-3">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  aria-label="Upload"
                />
                <InputGroup.Text>
                  <AiOutlineCamera />
                </InputGroup.Text>
              </InputGroup>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Shop name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip code"
                value={zipCode}
                onChange={(e) => setZipcode(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Update Shop
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShopSettings;

