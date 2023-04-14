import { CustomPagination } from "components/custom-pagination";
import Head from "next/head";
import { useState } from "react";
import { Alert, Button, Card, Form, Modal, ProgressBar, Spinner, Stack, Table } from "react-bootstrap";

export default function UIComponents() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalRecords: 30,
        rowsPerPage: 10,
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleChangePage = (newPage: number) => {
        setPagination((preVal) => ({
            ...preVal,
            currentPage: newPage,
        }));
    };

    return (
        <>
            <Head>
                <title>UI Components</title>
            </Head>
            <main className="container-xxl">
                <Stack className="my-3" gap={3}>
                    <Stack direction="horizontal" gap={2}>
                        <div className="d-flex align-items-center">
                            <Spinner animation="border" variant="primary" />
                        </div>
                        <div className="d-flex align-items-center">
                            <Spinner animation="border" variant="secondary" />
                        </div>
                        <div className="d-flex align-items-center">
                            <Spinner animation="border" variant="success" />
                        </div>
                        <div className="d-flex align-items-center">
                            <Spinner animation="border" variant="warning" />
                        </div>
                        <div className="d-flex align-items-center">
                            <Spinner animation="border" variant="danger" />
                        </div>
                        <div className="d-flex align-items-center">
                            <Spinner animation="border" variant="info" />
                        </div>
                        <div className="d-flex align-items-center">
                            <Spinner animation="border" variant="dark" />
                        </div>
                    </Stack>

                    <hr />

                    <div>
                        <Form.Label htmlFor="inputText">Input</Form.Label>
                        <Form.Control
                            id="inputText"
                            aria-describedby="inputHelperBlock"
                            placeholder="Enter text in here"
                        />
                        <Form.Text id="inputHelperBlock" muted>
                            Your text must be 8-20 characters long, contain letters and numbers, and must not contain
                            spaces, special characters, or emoji.
                        </Form.Text>
                    </div>

                    <hr />

                    <div>
                        <Card style={{ width: "18rem" }}>
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the
                                    card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>

                    <hr />

                    <div>
                        <Stack gap={3}>
                            <ProgressBar animated variant="warning" now={60} />
                            <ProgressBar animated variant="primary" now={40} />
                            <ProgressBar animated variant="danger" now={80} />
                        </Stack>
                    </div>

                    <hr />

                    <Stack direction="horizontal" gap={2}>
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="success">Success</Button>
                        <Button variant="warning">Warning</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="info">Info</Button>
                        <Button variant="dark">Dark</Button>
                        <Button variant="link">Link</Button>
                    </Stack>

                    <hr />

                    <div>
                        <Button variant="primary" onClick={handleOpenModal}>
                            Open Modal
                        </Button>
                    </div>

                    <hr />

                    <div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {Array.from({ length: 12 }).map((_, index) => (
                                        <th key={index}>Table heading</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    {Array.from({ length: 12 }).map((_, index) => (
                                        <td key={index}>Table cell {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>2</td>
                                    {Array.from({ length: 12 }).map((_, index) => (
                                        <td key={index}>Table cell {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>3</td>
                                    {Array.from({ length: 12 }).map((_, index) => (
                                        <td key={index}>Table cell {index}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-center align-items center mt-3">
                            <CustomPagination {...pagination} pageChange={handleChangePage} />
                        </div>
                    </div>

                    <hr />

                    <div>
                        {["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(
                            (variant) => (
                                <Alert key={variant} variant={variant}>
                                    This is a {variant} alert—check it out!
                                </Alert>
                            )
                        )}
                    </div>

                    <hr />

                    {/* <MultipleChoiceForm /> */}
                </Stack>
            </main>
            <Modal show={isModalOpen} centered onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
