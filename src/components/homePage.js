import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import React from "react";

function HomePage() {
  return (
    <div className="container text-center d-flex justify-content-center">
      <Card style={{ width: "75%" }} className="mt-3  mb-3">
        <Card.Body>
          <h1>תיאוריה אונליין</h1>

          <Link to="/quiz">
            <Button variant="secondary">התחל מבחן!</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default HomePage;
