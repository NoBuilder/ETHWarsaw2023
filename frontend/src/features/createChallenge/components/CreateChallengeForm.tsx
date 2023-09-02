'use client'

import { useQuery } from '@tanstack/react-query'
import { format, fromUnixTime, getUnixTime } from 'date-fns'
import { Field, Form } from 'houseform'
import { CalendarIcon, CheckIcon } from 'lucide-react'
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
  SelectTrigger
} from '@/components/ui/select'
import { JuryMember } from '@/models'
import AvatarPlaceholder from '@/public/images/judge-avatar.webp'
import { Address } from '@/types'
import { cn } from '@/utils'
import { getRelatedAddressesByTokenTransfer } from '@/utils/airstack'
import { BENEFICIARIES } from '../constants'
import { useCreateChallenge } from '../hooks'
import {
  CreateChallengeFormSchema,
  createChallengeFormTitleSchema,
  createChallengeFormDescriptionSchema,
  createChallengeFormBountySchema,
  createChallengeFormEndDateSchema,
  createChallengeFormBeneficiarySchema,
  createChallengeFormJurySchema
} from '../schemas'

type CreateChallengeFormProps = {
  jury: Array<JuryMember>
}

export const CreateChallengeForm: React.FC<CreateChallengeFormProps> = ({
  jury
}) => {
  const {
    isConnected,
    isConnecting,
    connect,
    createChallenge,
    error,
    isLoading,
    address
  } = useCreateChallenge()
  const { data } = useQuery(
    ['jury'],
    () =>
      getRelatedAddressesByTokenTransfer(
        '0x6f73ea756bd57d3adcafb73a4f5fcd750ec1c387'
      ),
    {
      enabled: Boolean(address),
      select(data) {
        return data?.map(address => ({
          address: address.profileInfo.userAddress,
          name: address.name,
          avatar: address.avatar || undefined
        }))
      }
    }
  )

  const recommendedJury = [...jury, ...(data || [])]

  return (
    <Form<CreateChallengeFormSchema>
      onSubmit={data => {
        if (address) {
          createChallenge({
            title: data.title,
            address,
            beneficiary: data.beneficiary,
            endDate: data.endDate,
            value: data.bounty,
            juryAddress: data.jury as Array<Address>
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
          <Field<CreateChallengeFormSchema['endDate']>
            name="endDate"
            onBlurValidate={createChallengeFormEndDateSchema}
            onChangeValidate={
              isSubmitted ? createChallengeFormEndDateSchema : undefined
            }
          >
            {({ value, setValue }) => (
              <div className="mb-10 flex flex-col gap-1">
                <Label>Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
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
          <Field<CreateChallengeFormSchema['beneficiary']>
            name="beneficiary"
            onBlurValidate={createChallengeFormBeneficiarySchema}
            onChangeValidate={
              isSubmitted ? createChallengeFormBeneficiarySchema : undefined
            }
          >
            {({ value, setValue }) => (
              <div className="mt-10 flex flex-col gap-1">
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
          <Field<CreateChallengeFormSchema['jury']>
            name="jury"
            onBlurValidate={createChallengeFormJurySchema}
            onChangeValidate={
              isSubmitted ? createChallengeFormJurySchema : undefined
            }
            initialValue={[]}
          >
            {({ value, setValue }) => (
              <div className="flex flex-col gap-3">
                <Label>Jury</Label>
                <div className="flex flex-wrap gap-6">
                  {recommendedJury.map(member => (
                    <Button
                      key={member.name}
                      className="flex flex-col items-center gap-2 p-0"
                      variant="ghost"
                      onClick={() => {
                        if (value.includes(member.address)) {
                          setValue(
                            value.filter(address => address !== member.address)
                          )
                        } else {
                          setValue([...value, member.address])
                        }
                      }}
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={member.avatar || AvatarPlaceholder}
                          fill
                          alt={member.name}
                        />
                        {value.includes(member.address) && (
                          <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-primary/50">
                            <CheckIcon className="stroke-white" />
                          </div>
                        )}
                      </div>
                      <p
                        className={`text-xs text-gray-500 ${
                          address === member.address && 'text-primary'
                        }`}
                      >
                        {member.name}
                      </p>
                    </Button>
                  ))}
                </div>
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
