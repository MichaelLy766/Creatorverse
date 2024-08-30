import { useState } from 'react';
import { supabase } from '../client';
import { Creator } from '../types';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Container from '../components/Container';

interface AddCreatorPageProps {
  addCreator: (newCreator: Creator) => void;
}

const AddCreatorPage: React.FC<AddCreatorPageProps> = ({ addCreator }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('creators')
      .insert([{ name, url, description, imageURL }])
      .select('*');
    
    if (data) {
      const newCreator = data[0];
      addCreator(newCreator);  // Update local state
      navigate('/');  // Redirect back to ShowCreatorsPage
    } else {
      console.error('Error adding creator', error);
    }
  };

  return (
    <Container>
      <Title>Add Creator</Title>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} placeholder="Image URL" />
        <button type="submit">Add Creator</button>
      </form>
    </Container>
    
  );
};

export default AddCreatorPage;
