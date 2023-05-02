import baseURL from './constants';

const getIngredientsData = async () => {
  const response = await fetch(`${baseURL}ingredients`);

  if (!response.ok) {
    throw new Error(`Could not fetch the data, status: ${response.status}`);
  }

  return response.json();
};

export default getIngredientsData;
