import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { Col, Card, Stack, Button } from 'react-bootstrap';
import { useDeleteNoteMutation } from '../slices/note_api';
import Message from './Message';

const NoteCard = ({ note }) => {
  const [error, set_error] = useState('');

  const { user_info } = useSelector((state) => state.auth);

  const [deletePost, { isLoading: is_delete_loading }] =
    useDeleteNoteMutation();

  const delete_post = async () => {
    try {
      await deletePost({ token: user_info.token, id: note._id }).unwrap();
    } catch (err) {
      set_error(err?.data?.message || err.error);
    }
  };

  return (
    <Col>
      <Card>
        <Card.Body>
          {error && <Message variant="danger">{error}</Message>}
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.content}</Card.Text>
          <Stack direction="horizontal" gap={2}>
            <Button as={Link} to={`/note/${note._id}/edit`}>
              Edit
            </Button>
            <Button onClick={() => delete_post()} disabled={is_delete_loading}>
              Delete
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NoteCard;
