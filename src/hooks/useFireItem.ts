import { useState, useEffect } from 'react'
import { database } from '../utils/api'

import type { ItemType } from '../types'

const useFireItem = (id: number) => {
  const [item, setItem] = useState<ItemType | null>(null)

  useEffect(() => {
    const ref = database.ref(`/v0/item/${id}`)
    const onValueChange = ref.on(
      'value',
      (snapshot) => setItem(snapshot.val() as ItemType),
      (error: string | null | undefined) => console.error(error)
    )
    return () => ref.off('value', onValueChange)
  }, [id])

  return item
}

export default useFireItem
