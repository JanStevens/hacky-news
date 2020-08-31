import { useState, useEffect } from 'react'
import { database } from '../utils/api'

const useFireItem = (id) => {
  const [item, setItem] = useState(null)

  useEffect(() => {
    const ref = database.ref(`/v0/item/${id}`)
    const onValueChange = ref.on(
      'value',
      (snapshot) => setItem(snapshot.val()),
      (error) => console.error(error)
    )
    return () => ref.off('value', onValueChange)
  }, [id])

  return item
}

export default useFireItem
