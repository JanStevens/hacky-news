import { useState, useEffect } from 'react'
import { database } from '../utils/api'
import { StoryType } from '../types/api'

interface IFireStories {
  type: StoryType
}

const useFireStories = ({ type = 'new' }: IFireStories): Array<number> => {
  const [itemIds, setItemIds] = useState<Array<number>>([])

  useEffect(() => {
    const ref = database.ref(`/v0/${type}stories`).limitToFirst(30)
    const onValueChange = ref.on(
      'value',
      (snapshot) => setItemIds(snapshot.val() as Array<number>),
      (error: string | null | undefined) => console.error(error)
    )
    return () => ref.off('value', onValueChange)
  }, [type])

  return itemIds
}

export default useFireStories
