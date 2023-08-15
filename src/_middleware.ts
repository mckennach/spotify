import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
    const token = await getToken({ 
        req,
        secret: process.env.JWT_SECRET
    });

    const { pathname } = req.nextUrl;

    if(pathname.includes('/api/auth' ) || token) {
        return NextResponse.next();
    } 

    if(!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }

    
}