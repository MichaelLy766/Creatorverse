import { useRoutes } from 'react-router-dom';
import ShowCreatorsPage from './pages/ShowCreators';
import ViewCreatorPage from './pages/ViewCreator';
import EditCreatorPage from './pages/EditCreator';
import AddCreatorPage from './pages/AddCreator';
import { supabase } from './client';
import { useEffect, useState } from 'react';
import { Creator } from './types'; 

export default function App() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try { 
        const { data, error } = await supabase.from('creators').select('*');
        if (error) throw error;

        // Set the data into state
        setCreators(data || []);
      } catch (error) {
        // Handle error
        setError((error as Error).message);
      } finally {
        // Turn off loading state
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  // Function to add new creator
  const addCreator = (newCreator: Creator) => {
    setCreators(prevCreators => [...prevCreators, newCreator]);
  };

  // Function to edit creator
  const editCreator = (updatedCreator: Creator) => {
    setCreators(prevCreators => 
      prevCreators.map(creator =>
        creator.id === updatedCreator.id ? updatedCreator : creator
      )
    );
  };

  // Function to delete a creator
  const deleteCreator = (id: number) => {
    setCreators(prevCreators => 
      prevCreators.filter(creator => creator.id !== id)
    );
  };

  const routes = useRoutes([
    { path: '/', element: <ShowCreatorsPage creators={creators} loading={loading} error={error} /> },
    { path: '/creator/:id', element: <ViewCreatorPage /> },
    { path: '/creator/:id/edit', element: <EditCreatorPage editCreator={editCreator} deleteCreator={deleteCreator} /> },
    { path: '/creator/new', element: <AddCreatorPage addCreator={addCreator} /> },
  ]);

  return (
    <div className="App">
      {routes}
    </div>
  );
}
