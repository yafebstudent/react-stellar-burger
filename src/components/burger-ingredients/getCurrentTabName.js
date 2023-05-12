/* eslint-disable no-restricted-globals */
const getCurrentTabName = (containerClassName) => {
  const bunsTitleTopCoordinates = Math.round(
    document.querySelector('#buns').getBoundingClientRect().top + scrollY
  );
  const saucesTitleTopCoordinates = Math.round(
    document.querySelector('#sauces').getBoundingClientRect().top + scrollY
  );
  const toppingsTitleTopCoordinates = Math.round(
    document.querySelector('#toppings').getBoundingClientRect().top + scrollY
  );
  const ingredientsContainerTopCoordinates = Math.round(
    document.querySelector(`.${containerClassName}`).getBoundingClientRect().top + scrollY
  );
  const absoluteCoordinates = [
    {
      tabName: 'buns',
      value: Math.abs(ingredientsContainerTopCoordinates - bunsTitleTopCoordinates),
    },
    {
      tabName: 'sauces',
      value: Math.abs(ingredientsContainerTopCoordinates - saucesTitleTopCoordinates),
    },
    {
      tabName: 'toppings',
      value: Math.abs(ingredientsContainerTopCoordinates - toppingsTitleTopCoordinates),
    },
  ];
  const coordinatesValues = absoluteCoordinates.map((coordinates) => coordinates.value);
  const minValue = Math.min(...coordinatesValues);
  const currentTabName = absoluteCoordinates.find(
    (coordinates) => coordinates.value === minValue
  ).tabName;

  return currentTabName;
};

export default getCurrentTabName;
