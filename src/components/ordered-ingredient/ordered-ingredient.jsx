import { useRef } from 'react';
import clsx from 'clsx';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ordered-ingredient.module.css';

import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { DELETE_INGREDIENT } from '../../services/actions/index';
import { itemPropTypes } from '../../utils/types';

export default function OrderedIngredient({ item, index, moveCard }) {
  const dispatch = useDispatch();
  const ingredient = item.payload;

  const [{ handlerId }, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const ref = useRef(null);
  const blockRef = drag(drop(ref));

  const opacity = isDragging ? 0.5 : 1;
  const preventDefault = (e) => e.preventDefault();

  const deleteItem = () => {
    const id = ingredient._id;
    dispatch({
      type: DELETE_INGREDIENT,
      index,
      id,
    });
  };

  return (
    <div className={clsx(styles.ingredient, styles.wrapper)}
      key={ingredient._id}
      ref={blockRef}
      style={{ opacity }}
      onDrop={preventDefault}
      data-handler-id={handlerId}
    >
      <div className={styles.dragIcon}>
        <DragIcon type="primary" />
      </div>
      <div className={styles.ingredientDetails}>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          handleClose={e => deleteItem(e.target)}
        />
      </div>
    </div>
  )
}

OrderedIngredient.propTypes = {
  item: itemPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
};
