import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />

      <main className="w-full flex flex-col">
        {/* Main Website Content */}
        <div className="w-full min-h-screen pt-20">
          {/* Add your Hero, About, Productions and other sections here */}
        </div>

        {/* Footer Section */}
        <Footer />
      </main>
    </div>
  );
}
