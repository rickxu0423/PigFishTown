import { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import PftDraggableContainer from 'src/common/draggablecontainer/PftDraggableContainer'
import PftModal from 'src/common/modal/PftModal'
import PftButton from 'src/common/button/PftButton'
import './shopping.scss'
import initialData from './initial-data'

function Shopping () {

  const [items, setItems] = useState(initialData.items)
  const [shops, setShops] = useState(initialData.shops)
  const [shopOrder, setShopOrder] = useState(initialData.shopOrder)
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState(null)

  const onAddShop = () => {
    const modalCase = 'add-shop'
    const newId = new Date().getTime().toString() // To do: needs backend to create new shop id
    const newItem = { modalCase, id: newId, message: 'Add shop name', label: '', items: [] }
    setShowModal(true)
    setModalData(newItem)
  }

  const onEditShop = (shop) => {
    const modalCase = 'edit-shop'
    const message = 'Edit shop name'
    const newItem = { modalCase, id: shop.id, message, label: shop.label }
    setShowModal(true)
    setModalData(newItem)
  }

  const onDeleteShop = (shop) => {
    const modalCase = 'delete-shop'
    const message = `Confirm to delete ${shop.label}`
    const newItem = { modalCase, id: shop.id, message }
    setShowModal(true)
    setModalData(newItem)
  }

  const onAddItem = (shopId) => {
    const modalCase = 'add-item'
    const newId = new Date().getTime().toString() // To do: needs backend to create new item id
    const newItem = { modalCase, id: newId, label: '', number: 1, shopId }
    setShowModal(true)
    setModalData(newItem)
  }

  const onDeleteItem = (container, item) => {
    const newItems = { ...items }
    delete newItems[item.id]
    setItems(newItems)
    const newShops = { ...shops }
    newShops[container.id].items = newShops[container.id].items.filter(itemId => itemId !== item.id)
    setShops(newShops) // To do: add draggable for shops
  }

  const onItemClick = (item) => {
    setShowModal(true)
    setModalData({ ...item })
  }

  const onConfirm  = (item) => {
    const { modalCase, id, shopId } = item
    if (modalCase === 'add-shop') {
      delete item.modalCase
      const newShops = { ...shops }
      newShops[id] = item
      setShops(newShops)
      const newShopOrder = [...shopOrder]
      newShopOrder.push(id)
      setShopOrder(newShopOrder)
    } else if (modalCase === 'edit-shop') {
      const newShops = { ...shops }
      newShops[id].label = item.label
      setShops(newShops)
    } else if (modalCase === 'delete-shop') {
      const newShops = { ...shops }
      const newItems = { ...items }
      const itemsToDelete = newShops[item.id].items
      itemsToDelete.forEach(id => {
        delete newItems[id]
      })
      setItems(newItems)
      delete newShops[item.id]
      setShops(newShops)
      const newShopOrder = [...shopOrder].filter(id => id !== item.id)
      setShopOrder(newShopOrder)
    } else if (modalCase === 'add-item') {
      delete item.modalCase
      delete item.shopId
      const newShops = { ...shops }
      newShops[shopId].items.push(id)
      setShops(newShops)
      // Modify items in shop
      const newItems = { ...items }
      newItems[item.id] = item
      setItems(newItems)
    } else {
      // Modify items in shop
      const newItems = { ...items }
      newItems[item.id] = item
      setItems(newItems)
    }
    setShowModal(!showModal)
  }

  const onDragEnd = (event) => {
    const { draggableId: itemId, destination, source, type } = event
    const { droppableId: toShopId, index: toIndex } = destination
    const { droppableId: fromShopId, index: fromIndex } = source
    if (type === 'shop') {
      const newShopOrder = [...shopOrder]
      newShopOrder.splice(fromIndex, 1)
      newShopOrder.splice(toIndex, 0, itemId)
      setShopOrder(newShopOrder)
    } else if (type === 'item') {
      const newShops = { ...shops }
      // Remove draggable item from source shop
      newShops[fromShopId].items.splice(fromIndex, 1)
      // Add draggable item to destination shop
      newShops[toShopId].items.splice(toIndex, 0, itemId)
      setShops(newShops)
    }
    
  }

  const shopToRender = shopOrder.map((shopId, index) => {
    const shopData = shops[shopId]
    return (
      <PftDraggableContainer
        key={ shopId }
        index={ index }
        container={ shopData }
        items={ shopData.items.map(item => items[item]) }
        onEditContainer={ onEditShop }
        onDeleteContainer={ onDeleteShop }
        onItemClick={ onItemClick }
        onDeleteItem={ onDeleteItem }
        afterItemsSlot={ <PftButton label="+" field="addItem" handleClick={ () => onAddItem(shopId) } /> }
      />
    )
  })

  return (
    <div className="shopping-wrapper">
      <DragDropContext onDragEnd={ onDragEnd }>
        <Droppable droppableId='all-shops' direction='vertical' type="shop">
          { provided => (
            <div className="shop-list"
              { ...provided.droppableProps }
              ref={ provided.innerRef }
            >
              { shopToRender }
              { provided.placeholder }
              <PftButton className="add-shop-button" label="Add Shop" field="addShop" handleClick={ onAddShop } />
            </div>
          ) }
        </Droppable>
      </DragDropContext>
      {
        showModal &&
        <PftModal
          modalData={ modalData }
          onConfirm={ onConfirm }
          onCancel={ onConfirm }
        />
      }
    </div>
  )
}

export default Shopping