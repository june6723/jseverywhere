import React, { useEffect } from 'react'
import NoteForm from '../components/NoteForm'
import { useMutation } from '@apollo/client'
import { GET_MY_NOTES, GET_NOTES, NEW_NOTE } from '../gql/query'

const NewNote = props => {
  useEffect(() => {
    document.title = 'New Note - Notedly'
  })

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      props.history.push(`note/${data.newNote.id}`)
    }
  })

  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data} />
    </React.Fragment>
  )
}

export default NewNote
