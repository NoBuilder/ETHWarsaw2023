'use client'

import { Field, Form } from 'houseform'
import {
  Button,
  Input,
  Label,
  LoaderCircle,
  StatusMessage,
  Textarea
} from '@/components'
import { useCreateChallenge } from '../hooks'
import {
  CreateChallengeFormSchema,
  createChallengeFormTitleSchema,
  createChallengeFormDescriptionSchema,
  createChallengeFormBountySchema
} from '../schemas'

export const CreateChallengeForm = () => {
  const { isConnected, isConnecting, connect } = useCreateChallenge()

  return (
    <Form<CreateChallengeFormSchema>
      onSubmit={data => alert(JSON.stringify(data))}
    >
      {({ submit, isSubmitted }) => (
        <form
          onSubmit={e => {
            e.preventDefault()
            submit()
          }}
          className="flex w-full max-w-md flex-col gap-4"
        >
          <Field<CreateChallengeFormSchema['title']>
            name="title"
            onBlurValidate={createChallengeFormTitleSchema}
            onChangeValidate={
              isSubmitted ? createChallengeFormTitleSchema : undefined
            }
          >
            {({ value, setValue, onBlur, errors }) => (
              <Input
                id="title"
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={onBlur}
                placeholder="Title"
                // disabled={isLoading}
                label="Title"
                errorMessage={errors}
              />
            )}
          </Field>
          <Field<CreateChallengeFormSchema['description']>
            name="description"
            onBlurValidate={createChallengeFormDescriptionSchema}
            onChangeValidate={
              isSubmitted ? createChallengeFormDescriptionSchema : undefined
            }
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="flex flex-col gap-1">
                <Label htmlFor="description">Your message</Label>
                <Textarea
                  id="description"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  onBlur={onBlur}
                  placeholder="description"
                  // disabled={isLoading}
                />
                <StatusMessage variant="error">{errors[0]}</StatusMessage>
              </div>
            )}
          </Field>
          <Field<CreateChallengeFormSchema['bounty']>
            name="bounty"
            onBlurValidate={createChallengeFormBountySchema}
            onChangeValidate={
              isSubmitted ? createChallengeFormBountySchema : undefined
            }
          >
            {({ value, setValue, onBlur, errors }) => (
              <Input
                id="bounty"
                type="number"
                value={value}
                onChange={e => setValue(Number(e.target.value))}
                onBlur={onBlur}
                placeholder="48000"
                // disabled={isLoading}
                label="Stake"
                errorMessage={errors}
              />
            )}
          </Field>
          {isConnected ? (
            <Button
              type="submit"
              disabled={false}
            >
              {false && <LoaderCircle />}
              Create challenge
            </Button>
          ) : (
            <Button
              disabled={isConnecting}
              onClick={connect}
            >
              {isConnecting && <LoaderCircle />}
              Connect wallet
            </Button>
          )}
        </form>
      )}
    </Form>
  )
}
