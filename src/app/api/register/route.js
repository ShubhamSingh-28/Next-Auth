import { ConnectDb } from "@/config/ConnectDb";
import { NextResponse , NextRequest} from "next/server";
import User from "@/model/user";
import bcryptjs from 'bcryptjs'

export async function POST (req){
    try {
        await ConnectDb()
        const {name, email, password} = await req.json();
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({error :"User already Login"},{status: 400})
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await User.create({name, email, password : hashedPassword})

        return NextResponse.json({message :"User Created", success : true, newUser})
    } catch (error) {
        return NextResponse.json({error :error.message},{status:500})
    }
}

