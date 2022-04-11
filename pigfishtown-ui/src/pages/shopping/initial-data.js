const initialData = {
  items: {
    'item-1': { id: 'item-1', label: 'fish', number: 1 },
    'item-2': { id: 'item-2', label: 'beef', number: 1 },
    'item-3': { id: 'item-3', label: 'lettice', number: 2 },
    'item-5': { id: 'item-5', label: 'potato', number: 5 },
    'item-6': { id: 'item-6', label: 'chicken', number: 3 }
  },
  shops: {
    'shop-1': { id: 'shop-1', label: 'Costco', items: ['item-1', 'item-2', 'item-3'] },
    'shop-2': { id: 'shop-2', label: 'Osaka', items: ['item-5', 'item-6'] }
  },
  shopOrder: ['shop-1', 'shop-2']
}

export default initialData