import JWT from 'jsonwebtoken'
export const generateJwtToken = (payload: any) => {
    const token = JWT.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET!, { expiresIn: '1d' });
    return token
}

export const verifyJwtToken = (token: string) => {
    try {
        const decoded = JWT.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);
        return decoded
    } catch (error) {
        return null
    }
}

export const getTokenFromBearer = (token: string) => {
    if(!token.startsWith('Bearer ')){
        return null
    }
    return token.split('Bearer ')[1]? token.split('Bearer ')[1] : null
}