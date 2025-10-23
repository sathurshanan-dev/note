import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useCreatePostMutation } from '../slices/note_api';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

const CreatePost = () => {
  const [title, set_title] = useState('');
  const [content, set_content] = useState('');
  const [error, set_error] = useState('');

  const navigate = useNavigate();

  const { user_info } = useSelector((state) => state.auth);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const submit_handler = async (event) => {
    event.preventDefault();
    try {
      await createPost({
        token: user_info.token,
        title,
        content,
      }).unwrap();
      navigate('/');
    } catch (err) {
      set_error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={submit_handler}>
        {error && <Message variant="danger">{error}</Message>}
        <Form.Group controlId="bio" className="my-2">
          <Form.Label className="text-center my-3">Create Note</Form.Label>
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
            alue={content}
            onChange={(event) => set_content(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreatePost;
