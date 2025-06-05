import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Search, User } from "lucide-react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import bgImage from '../../img/lostfound.png';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backdropFilter: "blur(2px)",
        position: "relative",
        padding: "2rem",
      }}
    >
      <Container
        className="py-5"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          padding: "2rem",
          borderRadius: "1rem",
          zIndex: 2,
        }}
      >
        <div className="text-center mb-5">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
            alt="Lost and Found Icon"
            width={100}
            height={100}
            className="mb-3"
            roundedCircle
          />
          <h1 className="display-4 fw-bold text-primary">Lost & Found System</h1>
        </div>

        <Card className="shadow-sm mb-4 bg-dark text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Card.Body>
            <Card.Text className="text-white">
              A comprehensive Lost and Found web application for educational institutes, enabling students and staff to securely report, track, and claim lost items.
            </Card.Text>
          </Card.Body>
        </Card>

        <Row className="text-center mb-4">
          <Col md={4}>
            <Card className="shadow-sm mb-3 h-100 bg-dark text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Card.Body>
                <Card.Title className="text-primary">Project Overview</Card.Title>
                <Card.Text className="text-white">
                  This application allows users to register and sign in securely, submit lost item reports, browse found items, and manage claims—all within a secure and role-based environment. Admins and staff can moderate listings and requests.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm mb-3 h-100 bg-dark text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Card.Body>
                <Card.Title className="text-primary">Technology Stack</Card.Title>
                <Card.Text className="text-white">
                  <strong>Frontend:</strong> React (TypeScript), React Router, Bootstrap<br />
                  <strong>Backend:</strong> Spring Boot, Spring Security, JPA<br />
                  <strong>Database:</strong> MySQL<br />
                  <strong>Auth:</strong> JWT-based Role Authentication
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm mb-3 h-100 bg-dark text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Card.Body>
                <Card.Title className="text-primary d-flex align-items-center justify-content-center gap-2">
                  <User size={20} /> Creator
                </Card.Title>
                <Card.Text className="text-white">
                  <strong>Name:</strong> Nesandu Hesitha | FUTURETECH SOLUTIONS<br />
                  <strong>Email:</strong> <a href="mailto:nesanduhm@gmail.com" className="text-white">nesanduhm@gmail.com</a><br />
                  <strong>Phone:</strong> 0777940340<br />
                  <strong>Institute:</strong> University of Moratuwa<br />
                  <strong>Field:</strong> BSc (Hons) in IT
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-5">
          <h2 className="mb-4 fw-semibold">Get Started</h2>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Button
              onClick={() => navigate("/SIGNUP")}
              variant="primary"
              size="lg"
              className="d-flex align-items-center justify-content-center gap-2 px-4"
            >
              <PlusCircle size={20} />
              NEW USER? SIGN UP.
            </Button>

            <Button
              onClick={() => navigate("/SIGNIN")}
              variant="outline-primary"
              size="lg"
              className="d-flex align-items-center justify-content-center gap-2 px-4"
            >
              <Search size={20} />
              ALREADY A USER? SIGN IN.
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;