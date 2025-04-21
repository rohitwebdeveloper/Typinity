'use client'
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthProvider from "@/components/AuthProvider";
import { usePathname } from "next/navigation";

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

// export const metadata = {
//   title: "Typinity-Where speed meets precision",
//   description: "Typinity is a typing practice application with personalised ai feedback",
// };

export default function RootLayout({ children }) {

  const path = usePathname();
  const showHeader = !(path === '/sign-in' || path === '/sign-up' || path === '/account' || path === '/reset-password')

  return (
    <html lang="en">
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
