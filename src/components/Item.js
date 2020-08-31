import React from 'react'
import { useParams } from 'react-router-dom'
import useFireItem from '../hooks/useFireItem'

const Item = () => {
  const { id } = useParams()
  const item = useFireItem(id)
  console.log(id, item)

  return (
    <pre>
      {id}: {JSON.stringify(item, null, 2)}
    </pre>
  )
}

export default Item
