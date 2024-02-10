import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth";
import prismadb from '@/lib/prismadb'
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req,res, authOptions)
    console.log(session)
    if (!session?.user?.email) {
        throw new Error('Not Signed in1')
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if (!currentUser) {
        throw new Error('Not signed in2')
    }

    return { currentUser }
}

export default serverAuth