import { useEffect, useState } from 'react'
import { database } from '../utils/api'

const useOnlineIndicator = (): boolean => {
  const [online, setOnline] = useState<boolean>(true)

  useEffect(() => {
    // Special endpoint provided by firebase
    const ref = database.ref('/.info/connected')
    const onValueChange = ref.on('value', (snap) =>
      setOnline(snap.val() as boolean)
    )
    return () => ref.off('value', onValueChange)
  }, [])

  return online
}

export default useOnlineIndicator
