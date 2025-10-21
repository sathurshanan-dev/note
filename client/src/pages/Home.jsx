import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useNotesQuery } from '../slices/note_api';
import { Container, Row } from 'react-bootstrap';
import NoteCard from '../components/NoteCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Landing = () => {
  const { user_info } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const { data, isLoading, error } = useNotesQuery({ token: user_info?.token });

  useEffect(() => {
    if (!user_info) {
      navigate('/login');
    }
  }, [user_info, navigate]);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
          {data.map((note) => (
            <NoteCard note={note} />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Landing;
