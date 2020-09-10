import { useState, useEffect } from 'react'
import { database } from '../utils/api'
import { StoryEnum } from '../types'

interface IFireStories {
  type: StoryEnum
}

const useFireStories = ({
  type = StoryEnum.Top,
}: IFireStories): Array<number> => {
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
