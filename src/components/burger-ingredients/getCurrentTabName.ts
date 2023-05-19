/* eslint-disable no-restricted-globals */
const getCurrentTabName = (containerClassName: string) => {
  const bunsTitleTopCoordinates = Math.round(
    (document.querySelector('#buns') as HTMLHtmlElement).getBoundingClientRect().top + scrollY
  );
  const saucesTitleTopCoordinates = Math.round(
    (document.querySelector('#sauces') as HTMLHtmlElement).getBoundingClientRect().top + scrollY
  );
  const toppingsTitleTopCoordinates = Math.round(
    (document.querySelector('#toppings') as HTMLHtmlElement).getBoundingClientRect().top + scrollY
  );
  const ingredientsContainerTopCoordinates = Math.round(
    // eslint-disable-next-line prettier/prettier
    (document.querySelector(`.${containerClassName}`) as HTMLDivElement).getBoundingClientRect().top + scrollY
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
  )?.tabName;

  return currentTabName;
};

export default getCurrentTabName;
