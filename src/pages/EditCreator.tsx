import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import { useState, useEffect } from "react";
import { Creator } from '../types';
import Title from "../components/Title";
import Container from "../components/Container";

interface EditCreatorPageProps {
  editCreator: (updatedCreator: Creator) => void;
  deleteCreator: (id: number) => void;
}

const EditCreatorPage: React.FC<EditCreatorPageProps> = ({ editCreator, deleteCreator }) => {
  const { id } = useParams<{ id: string }>();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreator = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', Number(id))
          .single();

        if (error) {
          console.error('Error fetching creator', error);
        } else {
          setCreator(data);
          setName(data.name);
          setUrl(data.url);
          setDescription(data.description);
          setImageURL(data.imageURL);
        }
      }
    };

    fetchCreator();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (id) {
      const { error } = await supabase
        .from('creators')
        .update({ name, url, description, imageURL })
        .eq('id', Number(id));

      if (error) {
        console.error('Error updating creator:', error.message, error.details);
      } else {
        // Assuming the update was successful, update the local state
        editCreator({ id: Number(id), name, url, description, imageURL });
        navigate('/');  // Redirect back to ShowCreatorsPage
      }
    }
  };

  const handleDelete = async () => {
    if (id) {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', Number(id));

      if (error) {
        console.error('Error deleting creator:', error.message, error.details);
      } else {
        // Update local state and redirect
        deleteCreator(Number(id));
        navigate('/');  // Redirect back to ShowCreatorsPage after deletion
      }
    }
  };

  if (!creator) return <p>Loading...</p>;

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Title>Edit Creator</Title>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} placeholder="Image URL" />
        <button type="submit">SUBMIT</button>
        <button type="button" onClick={handleDelete} style={{width: '100%', backgroundColor: 'red'}}>DELETE</button>
      </form>
    </Container>
  );
}

export default EditCreatorPage;
