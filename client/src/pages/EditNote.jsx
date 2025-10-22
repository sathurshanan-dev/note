import { useNoteQuery, useEditNoteMutation } from '../slices/note_api';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

const EditNote = () => {
  const [title, set_title] = useState('');
  const [content, set_content] = useState('');
  const [message, set_message] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const { user_info } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useNoteQuery({
    token: user_info?.token,
    id,
  });

  const [editPost, { isLoading: is_edit_loading }] = useEditNoteMutation();

  const submit_handler = async (event) => {
    event.preventDefault();
    try {
      await editPost({ token: user_info.token, id, title, content }).unwrap();
    } catch (err) {
      set_message(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (!user_info) {
      navigate('/login');
    } else if (data) {
      set_title(data.title);
      set_content(data.content);
    }
  }, [user_info, data, navigate, data?.title, data?.content]);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <Form onSubmit={submit_handler}>
            {message && <Message variant="danger">{message}</Message>}
            <Form.Group controlId="bio" className="my-2">
              <Form.Label className="text-center my-3">Edit Post</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                rows={12}
                value={title}
                onChange={(event) => set_title(event.target.value)}
                className="mb-1"
              ></Form.Control>
              <Form.Control
                as="textarea"
                placeholder="Content"
                rows={12}
                value={content}
                onChange={(event) => set_content(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button disabled={is_edit_loading} type="submit">
              Save
            </Button>
          </Form>
        </FormContainer>
      )}
    </Container>
  );
};

export default EditNote;
