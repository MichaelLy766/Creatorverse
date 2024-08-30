import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';
import { Creator } from '../types';

interface ShowCreatorsProps {
  creators: Creator[];
  loading: boolean;
  error: string | null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
  text-align: center;
  background: linear-gradient(90deg, #007bff, #0056b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ShowCreators: React.FC<ShowCreatorsProps> = ({ creators, loading, error }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/creator/new');
  };

  return (
    <Container>
      <Title>Creatorverse</Title>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {creators.length === 0 && !loading && !error && <p>No content creators found.</p>}

      <CardContainer>
        {creators.map((creator) => (
          <Card
            key={creator.id}
            id={creator.id}
            name={creator.name}
            url={creator.url}
            description={creator.description}
            imageURL={creator.imageURL}
          />
        ))}
      </CardContainer>

      <Button onClick={handleClick}>
        Add Creator
      </Button>
    </Container>
  );
};

export default ShowCreators;
