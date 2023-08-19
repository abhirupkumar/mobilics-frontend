import Loader from '@/components/Loader';
import { removeToken } from '@/features/tokenSlice';
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const jwt = require('jsonwebtoken');

const AuthContext = createContext({
    email: null,
    error: null,
    token: null,
    userData: null,
    allData: null,
    loading: false,
    fetchDetails: () => { },
    logout: () => { },
})

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
    const [email, setEmail] = useState(null)
    const [userData, setUserData] = useState(null)
    const [allData, setAllData] = useState(null)
    const [error, setError] = useState(null)
    const router = useRouter()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.authToken.token)
    const pathname = usePathname()

    useEffect(() => {
        setInitialLoading(true);
        if (token) {
            fetchDetails()
            if (pathname == '/login' || pathname == '/signup')
                router.push('/');
        }
        else {
            if (pathname != '/login' && pathname != '/signup')
                router.push('/login');
        }
        setInitialLoading(false);
    }, [token])

    async function getTokenExpiration(token) {
        try {
            const decoded = jwt.decode(token);
            return decoded.exp ? decoded.exp * 1000 : null; // convert to milliseconds
        } catch (err) {
            console.error('Error decoding JWT token:', err);
            return null;
        }
    }

    const fetchDetails = async () => {
        setLoading(true);
        const expirationTime = await getTokenExpiration(token);
        if (expirationTime < Date.now()) {
            dispatch(removeToken());
            setEmail(null);
            setUserData(null);
        }
        else {
            setEmail(jwt.decode(token).email);
            const data = { email: jwt.decode(token).email }
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/data`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            let response = await res.json()
            if (response.success) {
                setUserData(response.data)
                setAllData(response.allData);
            }
        }
        setLoading(false)
        setInitialLoading(false);
    }

    const logout = () => {
        setInitialLoading(true);
        dispatch(removeToken())
        setEmail(null);
        setUserData(null);
        router.push('/login')
    }

    useEffect(() => {
        if (error != null) {
            setLoading(false);
            setError(null);
        }
    }, [error])

    const memoedValue = useMemo(
        () => ({
            email,
            loading,
            token,
            userData,
            allData,
            error,
            fetchDetails,
            logout
        }),
        [email, loading]
    )

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading ? children : <Loader />}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}