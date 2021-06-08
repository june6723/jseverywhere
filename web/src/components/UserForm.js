import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`
const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`

const UserForm = props => {
  const [values, setValues] = useState()

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  return (
    <Wrapper>
      {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
      <Form onSubmit={e => {
          e.preventDefault()
          props.action({
            variables: {
              ...values
            }
          })
        }}
      >
        {props.formType === 'signup' && (
          <React.Fragment>
            <label htmlFor="username">Username:</label>
            <input 
              onChange={handleChange}
              required
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
          </React.Fragment>
        )}
        <label htmlFor="email">Email:</label>
        <input 
          onChange={handleChange}
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />
        <label htmlFor="password">Password:</label>
        <input 
          onChange={handleChange}
          required
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  )
}

export default UserForm
