import { ConnectDb } from "@/config/ConnectDb";
import User from "@/model/user";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";


export const authOption = {
providers: [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {},
    async authorize(credentials) {
        const { email, password } = credentials;
        try {
            await ConnectDb();
            const user= await User.findOne({email});
            if (!user) {
                return null
            }
            const PassMatch = await bcrypt.compare(password, user.password)
            if (!PassMatch) {
                return null
            }
            return user
        } catch (error) {
console.log("Error" + error);
        }
 } }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
],
session :{
    startegy :"jwt"
},
callbacks :{
    async signIn({user,account}){
        if (account.provider === "google") {
            try {
                const {name, email} =user;
                await ConnectDb()
                const userExist = await User.findOne({email})
                if (userExist) {
                    return user
                }
                const newUser = new User({
                    name :name,
                    email : email,
                })
               await newUser.save()
            } catch (error) {
                console.log(error);
            }
        }
        return user
    },
    async jwt ({token, user}){
        if(user){
            token.email= user.email
            token.name = user.name
        }
        return token
    },
    async session ({session, token}){
        if(session.user){
           session.user.email= token.email
           session.user.name=  token.name 
        }
        return session
    },
},
secret : process.env.NEXTAUTH_SECRET,
pages:{
    signIn:"/login"
}
}

const handler = NextAuth(authOption)
export {handler as GET, handler as POST};