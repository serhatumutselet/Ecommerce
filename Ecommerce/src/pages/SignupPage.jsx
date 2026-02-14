import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import apiClient from '../api/axios'
import { fetchRolesIfNeeded } from '../store/thunks/clientThunks'

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
const turkeyPhonePattern = /^(?:\+90|0)?5\d{9}$/
const taxNoPattern = /^T\d{4}V\d{6}$/
const ibanPattern = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/

export default function SignupPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loadingRoles, setLoadingRoles] = useState(true)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()
  const roles = useSelector((state) => state.client.roles)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role_id: '',
      store_name: '',
      store_phone: '',
      store_tax_no: '',
      store_bank_account: '',
    },
  })

  const selectedRoleId = watch('role_id')
  const selectedRole = useMemo(
    () => roles.find((role) => String(role.id) === String(selectedRoleId)),
    [roles, selectedRoleId]
  )
  const isStoreRole = selectedRole?.code === 'store'

  useEffect(() => {
    let isMounted = true
    const loadRoles = async () => {
      if (roles.length > 0) {
        if (isMounted) {
          setLoadingRoles(false)
        }
        return
      }

      try {
        await dispatch(fetchRolesIfNeeded())
      } catch (error) {
        if (isMounted) {
          setSubmitError('Unable to load roles. Please try again.')
        }
      } finally {
        if (isMounted) {
          setLoadingRoles(false)
        }
      }
    }

    loadRoles()
    return () => {
      isMounted = false
    }
  }, [dispatch, roles.length])

  useEffect(() => {
    const defaultRole =
      roles.find((role) => role.code === 'customer') || roles[0]
    if (defaultRole) {
      setValue('role_id', defaultRole.id)
    }
  }, [roles, setValue])

  const onSubmit = async (data) => {
    setSubmitError('')
    setIsSubmitting(true)
    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
      role_id: Number(data.role_id),
    }

    if (isStoreRole) {
      payload.store = {
        name: data.store_name.trim(),
        phone: data.store_phone.trim(),
        tax_no: data.store_tax_no.trim(),
        bank_account: data.store_bank_account.replace(/\s+/g, '').toUpperCase(),
      }
    }

    try {
      await apiClient.post('/signup', payload)
      window.alert(
        'You need to click link in email to activate your account!'
      )
      if (location.key !== 'default') {
        navigate(-1)
      } else {
        navigate('/')
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        'Signup failed. Please check your details and try again.'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex w-full justify-center bg-white">
      <div className="flex w-full max-w-[1440px] justify-center px-4 py-16 md:px-0 md:py-[80px]">
        <div className="flex w-full max-w-[640px] flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-['Montserrat'] text-[32px] font-bold leading-[42px] text-[#252B42] md:text-[40px] md:leading-[50px]">
              Create your account
            </h1>
            <p className="font-['Montserrat'] text-[14px] leading-[20px] text-[#737373]">
              Fill in the details below to create your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 rounded-[10px] border border-[#E6E6E6] bg-white p-6 shadow-[0_13px_19px_0_rgba(0,0,0,0.07)]"
          >
            <label className="flex flex-col gap-2 text-sm font-medium text-[#252B42]">
              Name
              <input
                type="text"
                placeholder="Your name"
                className="h-[50px] rounded-[5px] border border-[#E6E6E6] px-4 text-sm text-[#252B42] focus:border-[#23A6F0] focus:outline-none"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters',
                  },
                })}
              />
              {errors.name && (
                <span className="text-xs text-[#E74040]">
                  {errors.name.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-[#252B42]">
              Email
              <input
                type="email"
                placeholder="name@example.com"
                className="h-[50px] rounded-[5px] border border-[#E6E6E6] px-4 text-sm text-[#252B42] focus:border-[#23A6F0] focus:outline-none"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              {errors.email && (
                <span className="text-xs text-[#E74040]">
                  {errors.email.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-[#252B42]">
              Password
              <input
                type="password"
                placeholder="********"
                className="h-[50px] rounded-[5px] border border-[#E6E6E6] px-4 text-sm text-[#252B42] focus:border-[#23A6F0] focus:outline-none"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: passwordPattern,
                    message:
                      'Password must include upper, lower, number, and special character',
                  },
                })}
              />
              {errors.password && (
                <span className="text-xs text-[#E74040]">
                  {errors.password.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-[#252B42]">
              Confirm Password
              <input
                type="password"
                placeholder="********"
                className="h-[50px] rounded-[5px] border border-[#E6E6E6] px-4 text-sm text-[#252B42] focus:border-[#23A6F0] focus:outline-none"
                {...register('passwordConfirm', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('password') ||
                    'Passwords do not match',
                })}
              />
              {errors.passwordConfirm && (
                <span className="text-xs text-[#E74040]">
                  {errors.passwordConfirm.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-[#252B42]">
              Role
              <select
                className="h-[50px] rounded-[5px] border border-[#E6E6E6] px-4 text-sm text-[#252B42] focus:border-[#23A6F0] focus:outline-none"
                disabled={loadingRoles}
                {...register('role_id', {
                  required: 'Role is required',
                })}
              >
                {loadingRoles && <option>Loading roles...</option>}
                {!loadingRoles &&
                  roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
              </select>
              {errors.role_id && (
                <span className="text-xs text-[#E74040]">
                  {errors.role_id.message}
                </span>
              )}
            </label>

            {isStoreRole && (
              <div className="rounded-[8px] border border-[#E6E6E6] p-4">
                <p className="mb-4 text-sm font-bold text-[#252B42]">
                  Store Information
                </p>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-2 text-sm font-medium text-[#252B42]">
                    Store Name
                    <input
                      type="text"
                      placeholder="Store name"
                      className="h-[50px] rounded-[5px] border border-[#E6E6E6] px-4 text-sm text-[#252B42] focus:border-[#23A6F0] focus:outline-none"
                      {...register('store_name', {
                        required: 'Store name is required',
                        minLength: {
                          value: 3,
                          message: 'Store name must be at least 3 characters',
                        },
                      })}
                    />
                    {errors.store_name && (
                      <span className="text-xs text-[#E74040]">
                        {errors.store_name.message}
                      </span>
                    )}
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-[#252B42]">
                    Store Phone
                    <input
                      type="tel"
                      placeholder="+90 5xx xxx xx xx"
                      className="h-[50px] rounded-[5px] border border-[#E6E6E6] px-4 text-sm text-[#252B42] focus:border-[#23A6F0] focus:outline-none"
                      {...register('store_phone', {
                        required: 'Store phone is required',
                        pattern: {
                          value: turkeyPhonePattern,
                          message: 'Enter a valid Türkiye phone number',
                        },
                      })}
                    />
                    {errors.store_phone && (
                      <span className="text-xs text-[#E74040]">
                        {errors.store_phone.message}
                      </span>
                    )}
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-[#252B42]">
                    Store Tax ID
                    <input
                      type="text"
                      placeholder="T0000V000000"
                      className="h-[50px] rounded-[5px] border border-[#E6E6E6] px-4 text-sm text-[#252B42] focus:border-[#23A6F0] focus:outline-none"
                      {...register('store_tax_no', {
                        required: 'Tax ID is required',
                        pattern: {
                          value: taxNoPattern,
                          message: 'Tax ID must match TXXXXVXXXXXX',
                        },
                      })}
                    />
                    {errors.store_tax_no && (
                      <span className="text-xs text-[#E74040]">
                        {errors.store_tax_no.message}
                      </span>
                    )}
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-[#252B42]">
                    Store Bank Account (IBAN)
                    <input
                      type="text"
                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                      className="h-[50px] rounded-[5px] border border-[#E6E6E6] px-4 text-sm text-[#252B42] focus:border-[#23A6F0] focus:outline-none"
                      {...register('store_bank_account', {
                        required: 'IBAN is required',
                        validate: (value) => {
                          const normalized = value
                            .replace(/\s+/g, '')
                            .toUpperCase()
                          return (
                            ibanPattern.test(normalized) ||
                            'Enter a valid IBAN'
                          )
                        },
                      })}
                    />
                    {errors.store_bank_account && (
                      <span className="text-xs text-[#E74040]">
                        {errors.store_bank_account.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
            )}

            {submitError && (
              <div className="rounded-[5px] border border-[#E74040] bg-[#FFF1F0] px-3 py-2 text-sm text-[#E74040]">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[5px] bg-[#23A6F0] font-['Montserrat'] text-[14px] font-bold leading-[22px] tracking-[0.2px] text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

