import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client.js';
import { Creator } from '../types';
import Title from '../components/Title.js';
import Container from '../components/Container.js';
import styled from 'styled-components';

const CreatorDetails = styled.div`
  color: white;
`;

const CreatorImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 20px;
  display: block;
`;

const UrlLink = styled.a`
  color: #1e90ff;
  font-size: 1.1rem;
  text-decoration: none;
  display: block;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DescriptionContainer = styled.div`
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 20px;
`;

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        setCreator(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  const handleClickEdit = (id: number) => {
    navigate(`/creator/${id}/edit`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!creator) return <div>Creator not found</div>;

  return (
    <Container>
      <CreatorDetails>
        <Title>View Creator</Title>
        <h1>{creator.name}</h1>
        <DescriptionContainer>
          <p>{creator.description}</p>
        </DescriptionContainer>
        <UrlLink href={creator.url} target="_blank">{creator.url}</UrlLink>
        {creator.imageURL && (
          <div>
            <CreatorImage src={creator.imageURL} alt={creator.name} />
          </div>
        )}
        <div>
          <EditButton onClick={() => handleClickEdit(Number(id))}>Edit</EditButton>
        </div>
      </CreatorDetails>
    </Container>
  );
};

export default ViewCreator;
