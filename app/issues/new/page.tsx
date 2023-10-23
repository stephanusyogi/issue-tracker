"use client"
import { Button, TextArea, TextFieldInput, TextFieldRoot } from '@radix-ui/themes'
import React from 'react'

export default function NewIssuePage() {
  return (
    <div className='max-w-xl space-y-3'>
      <TextFieldRoot>
        <TextFieldInput placeholder='Title'/>
      </TextFieldRoot>
      <TextArea placeholder='Description'></TextArea>
      <Button>Submit New Issue</Button>
    </div>
  ) 
}
