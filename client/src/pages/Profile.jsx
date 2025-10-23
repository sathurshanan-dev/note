import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useUpdateProfileMutation } from '../slices/user_api';
import { useNotesQuery } from '../slices/note_api';
import { set_login } from '../slices/auth';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Note from '../components/Note';

const Profile = () => {
  const [name, set_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [err, set_err] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user_info } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useNotesQuery({ token: user_info?.token });

  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateProfileMutation();

  const submit_handler = async (event) => {
    event.preventDefault();
    try {
      const res = await updateProfile({
        token: user_info.token,
        data: {
          name,
          email,
          password,
        },
      }).unwrap();
      dispatch(set_login({ ...res }));
    } catch (error) {
      set_err(error?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (!user_info) {
      navigate('/login');
    } else {
      set_name(user_info.name);
      set_email(user_info.email);
    }
  }, [user_info, navigate, user_info.name, user_info.email]);

  return (
    <Container>
      <Row>
        <Col md={3} className="ml-10">
          <h1 className="text-center">Profile</h1>
          <Form onSubmit={submit_handler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(event) => set_name(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => set_email(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="my-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => set_password(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={isUpdateLoading}
            >
              Save
            </Button>
          </Form>
        </Col>
        <Col md={9} className="mt-5">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
              {data.map((note) => (
                <Note note={note} key={note._id} />
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
