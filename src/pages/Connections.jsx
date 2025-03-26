import React, { useState } from "react";
import usersData from "../data/users.json";
import { FaTimes } from "react-icons/fa";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import Navigationbar from "../components/Navigationbar";
import SuggestedConnections from "../components/SuggestedConnections";
import styles from "../styles/Connections.module.css";
import { useSelector } from "react-redux";

const Connections = () => {
  const [connections, setConnections] = useState(() => {
    try {
      const storedConnections = JSON.parse(localStorage.getItem("connections"));
      return Array.isArray(storedConnections) &&
        storedConnections.every((conn) => typeof conn === "object")
        ? storedConnections
        : [];
    } catch {
      return [];
    }
  });

  const searchTerm = useSelector((state) => state.search.searchTerm);
  const filteredConnections = connections.filter(
    (user) =>
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.headline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConnect = (userId) => {
    const user = usersData.find((u) => u.id === userId);
    if (user) {
      const updatedConnections = [...connections, user];
      setConnections(updatedConnections);
      localStorage.setItem("connections", JSON.stringify(updatedConnections));
    }
  };

  const handleRemoveConnection = (userId) => {
    const storedConnections =
      JSON.parse(localStorage.getItem("connections")) || [];
    const updatedConnections = storedConnections.filter(
      (conn) => conn.id !== userId
    );

    localStorage.setItem("connections", JSON.stringify(updatedConnections));
    setConnections(updatedConnections);
  };

  return (
    <>
      <Navigationbar />

      <div className={styles.container}>
        <Container className="mt-4">
          <Row className="gy-3">
            {/* Left Panel - My Connections */}
            <Col lg={8} md={12}>
              <Card className="p-3 shadow-sm">
                <Card.Title>My Connections ({connections.length})</Card.Title>
                {Array.isArray(connections) && connections.length === 0 ? (
                  <Card.Text className="text-muted text-center p-3 border rounded">
                    You don't have any connections yet. Add connections from the
                    "People You May Know" section.
                  </Card.Text>
                ) : filteredConnections.length === 0 ? (
                  <p className="text-center text-muted">
                    No connections match your search.
                  </p>
                ) : (
                  filteredConnections.map((user) => (
                    <Card key={user.id} className="mb-3 p-2 border">
                      <div className="d-flex flex-column flex-sm-row align-items-center">
                        <Image
                          src={user.avatar}
                          roundedCircle
                          width="50"
                          height="50"
                          className="mb-2 mb-sm-0 me-sm-3"
                        />
                        <div className="text-center text-sm-start flex-grow-1">
                          <h6 className="mb-0">{user.name}</h6>
                          <small className="text-muted">{user.headline}</small>
                        </div>
                        <Button
                          variant="danger"
                          size="sm"
                          className={styles.removeButton}
                          onClick={() => handleRemoveConnection(user.id)}
                        >
                          <FaTimes className={styles.btnicon} /> Remove
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </Card>
            </Col>

            {/* Right Panel - Reusable Suggested Connections Component */}
            <Col lg={4} md={12}>
              <SuggestedConnections
                connections={connections}
                handleConnect={handleConnect}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Connections;
