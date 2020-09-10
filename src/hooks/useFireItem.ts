import { useState, useEffect } from 'react'
import { database } from '../utils/api'

import { Item } from '../types/api'

const useFireItem = (id: number) => {
  const [item, setItem] = useState<Item | null>(null)

  useEffect(() => {
    const ref = database.ref(`/v0/item/${id}`)
    const onValueChange = ref.on(
      'value',
      (snapshot) => setItem(snapshot.val() as Item),
      (error: string | null | undefined) => console.error(error)
    )
    return () => ref.off('value', onValueChange)
  }, [id])

  return item
}

export default useFireItem
