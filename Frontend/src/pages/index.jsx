import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="my-4">Welcome to Website API</h1>
      <Row className="w-full text-center">
        {["Register", "Validate"].map((button) => (
          <Link href={"auth/" + button.toLowerCase()} key={button}>
            <Col>
              <Button className="w-[10em] my-2" variant="light">
                {button}
              </Button>
            </Col>
          </Link>
        ))}
      </Row>
    </>
  );
}
