import Input from "@/components/Input"
import { signIn } from "next-auth/react"
import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import axios from 'axios'
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [variant, setVariant] = useState('login')

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])


    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/profiles'
            })
            router.push('/profiles')
        }
        catch (error) {
            console.log(error)
        }

    }, [email, password])


    const register = useCallback(async () => {
        try {

            await axios.post('/api/register', {
                email,
                name,
                password
            })
            login()
        }
        catch (error) {
            console.log(error)
        }
    }, [email, name, password])

    return (


        <div className="
            relative 
            h-full
            w-full
            bg-[url('/images/hero.jpg')]
            bg-no-repeat
            bg-center
            bg-fixed
            bg-cover">
            <div className="
              bg-black 
                w-full 
                h-full 
                lg:bg-opacity-50">
                <nav>
                    <img className="h-12" src="/images/logo.png" alt="Logo" />
                </nav>
                <div className="
                    flex 
                    justify-center">
                    <div className="
                        bg-black 
                        bg-opacity-70 
                        px-16 
                        py-16 
                        self-center 
                        mt-2 
                        lg:w-2/5 
                        lg:max-w-md 
                        w-full">
                        <h2 className="
                            text-white 
                            text-4xl 
                            mb-4 
                            font-semibold" >
                            {variant === 'login' ? 'Sign in' : 'Create an account'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {
                                variant === 'register' && (

                                    <Input
                                        id="username"
                                        label="Username"
                                        onChange={(event: any) => setName(event.target.value)}
                                        type="name"
                                        value={name}
                                    />
                                )}
                            <Input
                                id="email"
                                label="Email"
                                onChange={(event: any) => setEmail(event.target.value)}
                                type="email"
                                value={email}
                            />
                            <Input
                                id="password"
                                label="Password"
                                onChange={(event: any) => setPassword(event.target.value)}
                                type="password"
                                value={password}
                            />

                        </div>
                        <button
                            onClick={variant === 'login' ? login : register}
                            className="
                            bg-red-600
                            text-white
                            py-3
                            rounded-md
                            w-full
                            mt-10
                            hover:bg-red-700
                            transition
                            "
                        >

                            {variant === 'login' ? 'Login' : 'Sign up'}
                        </button>

                        <div className="
                            flex 
                            flex-row 
                            items-center 
                            gap-4 
                            mt-8 
                            justify-content">
                            <div
                                onClick={() => signIn('google', { callbackUrl: '/' })}
                                className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                               ">
                                <FaGoogle size={30} />
                            </div>

                            <div
                                onClick={() => signIn('github', { callbackUrl: '/' })}
                                className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                               ">
                                <FaGithub size={30} />
                            </div>
                        </div>

                        <p className="
                        text-neutral-500
                        mt-12
                        ">{variant === 'login' ? 'First time using Netflix ?' : 'Already have account ? '}</p>
                        <span
                            onClick={toggleVariant}
                            className="
                            text-white
                            ml-1
                            hover:underline
                            cursor-pointer
                        ">
                            {variant === 'login' ? 'Create an account' : 'Login'}
                        </span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth