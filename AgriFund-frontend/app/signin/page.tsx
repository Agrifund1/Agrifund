'use client'
import React, { useState } from "react";
import signIn, { signInWithGoogle } from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'
import getData from "@/firebase/firestore/getData";
import Loader from "@/components/ui/loader/loader";
import Link from "next/link";

function SignInPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    const handleSignIn = async () => {
        const { user, error } = await signInWithGoogle();
        if (error) {
            console.error(error)
            return router.push("/")
        }

        let userDocument = (await getData('users', `${user?.uid}`)).result
        let data = userDocument?.data()
        if (data?.role.length < 1) {
            console.log(data?.role);
            
            return router.push("/get-started") // if role has not been saved to database, choose role
        }

        // else go straight to dashboard
        return router.push(`/dashboard/${data?.role}`)
    }

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);

        const { user, error } = await signIn(email, password);

        if (error) {
            console.error(error)
            return router.push("/")
        }

        setLoading(false);

        // else successful
        // console.log(user)
        let userDocument = (await getData('users', `${user?.uid}`)).result
        let data = userDocument?.data()
        if (data?.role.length == 0) {
            return router.push("/get-started") // if role has not been saved to database, choose role
        }

        // else go straight to dashboard
        return router.push(`/dashboard/${data?.role}`)

    }
    return (
        <div className="gap-5 w-full h-[100vh] grid grid-cols-1">
            <div className="wrapper m-auto my-auto content-center w-1/2">
                <div className="form-wrapper flex flex-col justify-center items-center h-fit bg-white rounded-3xl p-8 ">
                    <h1 className="mt-5 text-center font-bold text-4xl text-black pb-3">Login</h1>
                    <form onSubmit={handleForm} className="form flex flex-col gap-4 text-black py-6 w-full">
                        <label htmlFor="email" className="w-full flex flex-col gap-2">
                            <p className="text-lg text-left">Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" className="bg-white p-2 border rounded-lg" />
                        </label>
                        <label htmlFor="password" className="w-full flex flex-col gap-2">
                            <p className="text-lg text-left">Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} required type={showPassword ? "text" : "password"} name="password" id="password" placeholder="password" className="bg-white p-2 border rounded-lg" />
                        </label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className="mr-1 bg-white text-white"
                            />
                            <label htmlFor="showPassword" className="text-sm">
                                Show Password
                            </label>
                        </div>
                        <button type="submit" className="flex flex-row justify-center gap-3 w-full bg-primary rounded-lg p-3 text-white font-bold text-xl">
                            <p className="text-white text-center">Login</p>
                            <div className={`${loading ? 'block' : 'hidden'}`}>
                                <Loader />
                            </div>
                        </button>
                    </form>

                    <div className="text-sm text-center font-bold text-black mb-4">OR</div>
                    <div className="text-center w-full">
                        <button onClick={handleSignIn} className=" bg-secondary text-white p-2 border rounded-lg w-full">Sign In with Google</button>
                    </div>

                    <div className="flex justify-center mt-4 text-black">
                        <p className="text-sm flex flex-row gap-2">
                            Don't have an account?{' '}

                            <Link href="/signup">
                                <button className="flex flex-row gap-2 underline font-bold text-primary ">
                                    Register Now
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;