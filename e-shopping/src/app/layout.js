"use client"
import { Inter } from "next/font/google";
import "./globals.css";


import { Provider } from "react-redux";
import store from "@/Redux/store";
import Navbar from "./navbar/page";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar/>
          {children}</Provider>
        
      </body>
    </html>
  );
}
