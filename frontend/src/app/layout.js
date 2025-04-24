'use client'
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthProvider from "@/components/AuthProvider";
import { usePathname } from "next/navigation";
import { Metadata } from 'next';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const outfitFont = Outfit({
  subsets: ["latin"], // You can specify other subsets if needed
});



export default function RootLayout({ children }) {

  const path = usePathname();

  const description = "Typinity is a typing practice application with personalised ai feedback";
  const keywords = "typing skills, online typing tests, practice typing, keyboard skills, touch typing";
  //    Changing title on the basis of different pages
  let title = "Typinity | Speed meets precision";
  switch (path) {
    case "/":
      title = "Typinity | Speed meets precision";
      break;
    case "/reset-password":
      title = "Typinity | Reset-Password";
      break;
    case "/sign-in":
      title = "Typinity | SignIn";
      break;
    case "/sign-up":
      title = "Typinity | SignUp";
      break;
    case "/account":
      title = "Typinity | My Account";
      break;
    default:
      title = "Typinity | Speed meets precision";
  }


  const showHeader = !(path === '/sign-in' || path === '/sign-up' || path === '/account' || path === '/reset-password')

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </head>
      <body className={`${outfitFont.className} `}
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
      >
        <Provider store={store}>
          <AuthProvider />
          {showHeader && <Header />}
          {children}
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
