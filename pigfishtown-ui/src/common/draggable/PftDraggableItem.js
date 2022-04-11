import { Draggable  } from 'react-beautiful-dnd'
import { BiTrash } from 'react-icons/bi'

import PropTypes from 'prop-types'
import './pftdraggableitem.scss'

function PftDraggableItem (props) {
  const label = props.item.label
  const number = props.item.number
  const onItemClick = props.onItemClick

  const onDelete = (e, item) => {
    e.stopPropagation()
    props.onDelete(item)
  }

  return (
    <Draggable draggableId={ props.item.id } index={ props.index }>
      { provided => (
        <div className="pft-draggable-item-wrapper"
          ref={ provided.innerRef }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
          onClick={ () => { onItemClick(props.item) } }
        >
          <label className="item-label">{ label }</label>
          { number > 1 && <label className="number-label">{ 'x' + number }</label> }
          { onDelete && <BiTrash className="delete-icon" onClick={ (e) => { onDelete(e, props.item) } } /> }
        </div>
      ) }
    </Draggable>
  )
}

PftDraggableItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onItemClick: PropTypes.func,
  onDelete: PropTypes.func
}

PftDraggableItem.defaultProps = {
  item: {},
  index: 0
}

export default PftDraggableItem