'use client'

import { format, fromUnixTime, getUnixTime } from 'date-fns'
import { Field, Form } from 'houseform'
import { CalendarIcon } from 'lucide-react'
import {
  Button,
  Input,
  Label,
  LoaderCircle,
  StatusMessage,
  Textarea,
  Image
} from '@/components'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/utils'
import { BENEFICIARIES } from '../constants'
import { useCreateChallenge } from '../hooks'
import {
  CreateChallengeFormSchema,
  createChallengeFormTitleSchema,
  createChallengeFormDescriptionSchema,
  createChallengeFormBountySchema,
  createChallengeFormEndDateSchema,
  createChallengeFormBeneficiarySchema
} from '../schemas'

export const CreateChallengeForm = () => {
  const {
    isConnected,
    isConnecting,
    connect,
    createChallenge,
    error,
    isLoading,
    address
  } = useCreateChallenge()

  return (
    <Form<CreateChallengeFormSchema>
      onSubmit={data => {
        // TODO get proper juryAddress
        if (address) {
          createChallenge({
            title: data.title,
            address,
            beneficiary: data.beneficiary,
            endDate: data.endDate,
            value: data.bounty,
            juryAddress: [
              '0xb67efa83b4f7e5bbe367e2a410ad3899d019d847',
              '0xeA22ADf19f20D618D8EF66E4704C540A10708F1F',
              '0x16D6dF27993D0aEcE005F0a94107229f3843Bcf6'
            ]
          })
        }
      }}
    >
      {({ submit, isSubmitted }) => (
        <form
          onSubmit={e => {
            e.preventDefault()
            submit()
          }}
          className="flex w-full max-w-md flex-col gap-12"
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
                disabled={isLoading}
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  onBlur={onBlur}
                  placeholder="Description"
                  disabled={isLoading}
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
                disabled={isLoading}
                label="Stake"
                errorMessage={errors}
              />
            )}
          </Field>
          <Field<CreateChallengeFormSchema['endDate']>
            name="endDate"
            onBlurValidate={createChallengeFormEndDateSchema}
            onChangeValidate={
              isSubmitted ? createChallengeFormEndDateSchema : undefined
            }
          >
            {({ value, setValue }) => (
              <div className="flex flex-col gap-1">
                <Label>Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start border-input text-left font-secondary font-normal capitalize',
                        !value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {value ? (
                        format(fromUnixTime(value), 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={fromUnixTime(value)}
                      onSelect={date => setValue(getUnixTime(date as Date))}
                      fromDate={new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </Field>
          <Field<CreateChallengeFormSchema['beneficiary']>
            name="beneficiary"
            onBlurValidate={createChallengeFormBeneficiarySchema}
            onChangeValidate={
              isSubmitted ? createChallengeFormBeneficiarySchema : undefined
            }
          >
            {({ value, setValue }) => (
              <div className="flex flex-col gap-1">
                <Label>Beneficiary</Label>
                <Select
                  defaultValue={value}
                  onValueChange={setValue}
                >
                  <SelectTrigger>
                    {value
                      ? BENEFICIARIES.find(({ address }) => value === address)
                          ?.title
                      : 'Select beneficiary'}
                  </SelectTrigger>
                  <SelectContent>
                    {BENEFICIARIES.map(beneficiary => (
                      <SelectItem
                        key={beneficiary.title}
                        value={beneficiary.address}
                      >
                        <div className="flex max-w-sm items-center gap-4 py-2 text-left">
                          <div className="relative h-7 min-h-[28px] w-7 min-w-[28px] overflow-hidden rounded-full">
                            <Image
                              src={beneficiary.logoUrl}
                              alt={beneficiary.title}
                              fill
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {beneficiary.title}
                            </span>
                            <p className="text-sm text-muted-foreground">
                              {beneficiary.description}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </Field>
          {isConnected ? (
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <LoaderCircle />}
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
          {error && (
            <StatusMessage variant="error">{error.shortMessage}</StatusMessage>
          )}
        </form>
      )}
    </Form>
  )
}
