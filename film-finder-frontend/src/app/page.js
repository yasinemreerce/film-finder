import Image from "next/image";
import FilmSearchForm from "@/components/FilmSearchForm";
import FilmList from "@/components/FilmList";
import Chat from "@/components/Chat";
import Random from "@/components/Random";
import "../app/globals.css";



export default function Home() {
  return (
    <>
      <div className="container">
        <FilmSearchForm />
        <FilmList />
        <Random />
        <Chat />
      </div>
      
    </>
  );
}
