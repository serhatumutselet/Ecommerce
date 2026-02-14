import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../store/thunks/clientThunks'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const result = await dispatch(
        loginUser({
          email: data.email.trim(),
          password: data.password,
        })
      )
      if (data.rememberMe && result?.token) {
        localStorage.setItem('token', result.token)
      } else {
        localStorage.removeItem('token')
      }

      if (location.key !== 'default') {
        navigate(-1)
      } else {
        navigate('/')
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        'Login failed. Please check your credentials.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex w-full justify-center bg-white">
      <div className="flex w-full max-w-[1440px] justify-center px-4 py-16 md:px-0 md:py-[80px]">
        <div className="flex w-full max-w-[520px] flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-['Montserrat'] text-[32px] font-bold leading-[42px] text-[#252B42] md:text-[40px] md:leading-[50px]">
              Welcome back
            </h1>
            <p className="font-['Montserrat'] text-[14px] leading-[20px] text-[#737373]">
              Sign in to continue to your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 rounded-[10px] border border-[#E6E6E6] bg-white p-6 shadow-[0_13px_19px_0_rgba(0,0,0,0.07)]"
          >
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
                })}
              />
              {errors.password && (
                <span className="text-xs text-[#E74040]">
                  {errors.password.message}
                </span>
              )}
            </label>

            <label className="flex items-center gap-2 text-sm text-[#252B42]">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#23A6F0]"
                {...register('rememberMe')}
              />
              Remember me
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[5px] bg-[#23A6F0] font-['Montserrat'] text-[14px] font-bold leading-[22px] tracking-[0.2px] text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-[#737373]">
              Don&apos;t have an account?{' '}
              <Link className="font-semibold text-[#23A6F0]" to="/signup">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

