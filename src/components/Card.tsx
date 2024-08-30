import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2c2f33; 
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
`;

const Url = styled.div`
  color: lightblue;
  margin-top: 5px;
`;

const Description = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: 10px;
`;

const Image = styled.img`
  width: 100%;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 14px;
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

export default function Card({ id, name, url, description, imageURL }: { id: number; name: string; url: string; description: string; imageURL?: string }) {
  const navigate = useNavigate();
  
  const handleClickView = (id: number) => {
    navigate(`/creator/${id}`);
  };

  const handleClickEdit = (id: number) => {
    navigate(`/creator/${id}/edit`);
  };
  
  return (
    <CardContainer>
      <Name>{name}</Name>
      <Url>{url}</Url>
      <Description>{description}</Description>
      {imageURL && <Image src={imageURL} alt={name} />}
      <ButtonContainer>
        <Button onClick={() => handleClickView(id)}>View</Button>
        <Button onClick={() => handleClickEdit(id)}>Edit</Button>
      </ButtonContainer>
    </CardContainer>
  );
}
