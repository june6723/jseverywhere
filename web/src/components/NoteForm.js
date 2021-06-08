import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Button from './Button'

const Wrapper = styled.div`
  height: 100%;
`
const Form = styled.form`
  height: 100%;
`
const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
`

const NoteForm = props => {
  const [value, setValue] = useState({ content: props.content || '' })

  const onChange = useCallback((e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  })

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    props.action({
      variables: {
        ...value
      }
    })
  })

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <TextArea
          required
          type="text"
          name="content"
          placeholder="Note content"
          value={value.content}
          onChange={onChange}
        />
        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  )
}

export default NoteForm
