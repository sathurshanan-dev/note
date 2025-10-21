import { Col, Card, Stack, Button } from 'react-bootstrap';

const NoteCard = ({ note }) => {
  return (
    <Col key={note._id}>
      <Card>
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.content}</Card.Text>
          <Stack direction="horizontal" gap={2}>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </Stack>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NoteCard;
