import { Inter } from "next/font/google";
import "./globals.css";
import  VehicleContextProvider from "./context/DataContext";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Fordonsregister",
  description: "made by Gyundyuz",
};

export default function RootLayout({ children }) {
  // const ContextProvider = dynamic(() => import("./context/DataContext"), {
  //   ssr: false
  // });

  return (
    <html lang="en">
      <body className={inter.className}>
        <VehicleContextProvider>
          {children}
        </VehicleContextProvider>
        </body>
    </html>
  );
}
