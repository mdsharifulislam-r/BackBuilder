'use client'
import pic from "@/assets/images/Login.gif"
import { signInUser } from "@/lib/Store/features/UserSclice"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import LoadingButton from "../common/button/Button"
import { useCookies } from "next-client-cookies"
import GoogleSignInButton from "./GoogleSignInButton"
import GitHubSignInButton from "@/components/Register/GitHubSignInButton"

export default function LoginContainer() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const cookie = useCookies()
  const token = cookie.get('token')
  const router = useRouter()
  useEffect(() => {
    if (token) {
      router.push('/')
    }
  }, [])
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    social_login: false
  })
  function addValue(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const [isLoading, setLoading] = useState(false)
  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(formData)
    })

    const data = await res.json()

    if (data?.success) {
      dispatch(signInUser(data?.data))
      setFormData({
        email: "",
        password: "",
        social_login: false
      })
      toast.success(data.message)
      setLoading(false)
      formRef.current?.reset()
      router.push("/console")
    } else {
      toast.error(data.message)
      setLoading(false)
    }
  }
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 bg-slate-50">
      <form ref={formRef} onSubmit={handlesubmit} className="max-w-screen-xl w-full bg-white border border-line shadow-card rounded-2xl flex justify-center flex-1 overflow-hidden">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold text-ink">
              Log in to BackBuilder
            </h1>
            <p className="text-muted text-sm mt-2">Welcome back — access your projects and endpoints.</p>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center gap-3">
                <GoogleSignInButton />
                <GitHubSignInButton />
              </div>
              <div className="my-8 border-b border-line text-center relative">
                <div className="leading-none px-3 inline-block text-sm text-muted tracking-wide font-medium bg-white absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                  Or sign in with e-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-4 mb-3 py-3.5 rounded-lg font-medium bg-slate-50 border border-line placeholder-slate-400 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={addValue}
                />
                <input
                  className="w-full px-4 mb-3 py-3.5 rounded-lg font-medium bg-slate-50 border border-line placeholder-slate-400 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={addValue}
                />

                <LoadingButton isLoading={isLoading} className="mt-3 tracking-wide font-semibold bg-primary text-white w-full py-3.5 rounded-lg hover:bg-primary-dark transition-colors duration-300 ease-in-out flex items-center justify-center">
                  <span>Log in</span>
                </LoadingButton>
                <p className="mt-6 text-xs text-muted text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary font-medium hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-primary-light text-center hidden lg:flex">
          <Image src={pic} alt="login image" width={1000} height={1000} loading="lazy" className="w-full object-cover" />
        </div>
      </form>
    </div>
  )
}
