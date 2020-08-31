import { useState, useLayoutEffect } from 'react'
import { database } from '../utils/api'

const useFireStories = ({ type = 'new' }) => {
  const [itemIds, setItemIds] = useState([])

  useLayoutEffect(() => {
    const ref = database.ref(`/v0/${type}stories`).limitToFirst(25)
    const onValueChange = ref.on(
      'value',
      (snapshot) => setItemIds(snapshot.val()),
      (error) => console.error(error)
    )
    return () => ref.off('value', onValueChange)
  }, [type])

  return itemIds
}

export default useFireStories
