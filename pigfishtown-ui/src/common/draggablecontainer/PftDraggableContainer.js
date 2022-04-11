import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BiTrash } from 'react-icons/bi'

import PropTypes from 'prop-types'
import PftDraggableItem from 'src/common/draggable/PftDraggableItem'
import './pftdraggablecontainer.scss'

function PftDraggableContainer (props) {

  const onEditContainer = () => {
    return props.onEditContainer(props.container)
  }

  const onDeleteContainer = () => {
    return props.onDeleteContainer(props.container)
  }

  const itemToRender = props.items.map((item, index) => {
    const onItemClick = item => {
      return props.onItemClick(item)
    }

    const onDeleteItem = item => {
      return props.onDeleteItem(props.container, item)
    }

    return (
      <PftDraggableItem
        key={ item.id }
        item={ item }
        index={ index }
        onItemClick={ onItemClick }
        onDelete={ onDeleteItem }
      />
    )
  })

  return (
    <Draggable draggableId={ props.container.id } index={ props.index }>
      { provided => (
        <div className="pft-draggable-container-wrapper"
          { ...provided.draggableProps }
          ref={ provided.innerRef }
        >
          <div className="header-row" { ...provided.dragHandleProps }>
            <label className="header-label" onClick={ onEditContainer }>{ props.container.label }</label>
            <div className="headerAfterLabelSlot">{ props.headerAfterLabelSlot }</div>
            { onDeleteContainer && <BiTrash className="delete-icon" onClick={ onDeleteContainer } /> }
          </div>
          <Droppable droppableId={ props.container.id } direction="horizontal" type="item">
            { provided => (
              <div className="item-list"
                ref={ provided.innerRef }
                { ...provided.droppableProps }
              >
                { itemToRender }
                { provided.placeholder }
                <div className="afterItemsSlot">{ props.afterItemsSlot }</div>
              </div>
            ) }
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

PftDraggableContainer.propTypes = {
  index: PropTypes.number.isRequired,
  container: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
  onEditContainer: PropTypes.func,
  onDeleteContainer: PropTypes.func,
  onItemClick: PropTypes.func,
  onDeleteItem: PropTypes.func,
  headerAfterLabelSlot: PropTypes.element,
  afterItemsSlot: PropTypes.element
}

PftDraggableContainer.defaultProps = {
  container: {},
  items: []
}

export default PftDraggableContainer