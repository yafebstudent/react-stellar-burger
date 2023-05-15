import React, { useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { deleteIngredientData } from '../../services/burgerConstructorIngredientsDataSlice';
import styles from './BurgerConstructorToppingElement.module.css';
import { BurgerConstructorToppingElementPropType } from '../../utils/prop-types';

const BurgerConstructorToppingElement = (props) => {
  const { ingredientData, index, swapIngredients } = props;
  const dispatch = useDispatch();
  const handleConstructorElementDelete = () => {
    dispatch(deleteIngredientData(index));
  };
  const ingredientContainerRef = useRef(null);
  const [, drop] = useDrop({
    accept: 'toppingElement',
    hover(item, monitor) {
      if (!ingredientContainerRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ingredientContainerRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      swapIngredients(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'toppingElement',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const toppingElementOpacity = isDragging ? 0 : 1;
  drag(drop(ingredientContainerRef));

  return (
    <li
      className={`${styles.burgerIngredient} mr-2`}
      ref={ingredientContainerRef}
      style={{ opacity: toppingElementOpacity }}
    >
      <DragIcon type={ingredientData.type} />
      <ConstructorElement
        text={ingredientData.name}
        price={ingredientData.price}
        thumbnail={ingredientData.image_mobile}
        handleClose={handleConstructorElementDelete}
      />
    </li>
  );
};

BurgerConstructorToppingElement.propTypes = BurgerConstructorToppingElementPropType;

export default BurgerConstructorToppingElement;
