import Hero from "../components/Hero";
import Ebook from "../components/Ebook";
import Blog from "../components/Blog";
import TravelPhotography from "../components/TravelPhotography";
import Wellness from "../components/Wellness";
import About from "../components/About";
import ComingSoon from "../components/ComingSoon";
import LetsChat from "../components/LetsChat";
import NewsletterInline from "../components/NewsletterInline";

export default function Home() {
  return (
    <>
      <Hero />
      <NewsletterInline />
      <Ebook />
      <Blog />
      <TravelPhotography />
      <Wellness />
      <About />
      <LetsChat />
      <ComingSoon />
    </>
  );
}