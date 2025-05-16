
import MainMenu from "@/components/MainMenu";

const Index = () => {
  return (
    <div className="w-full h-full">
      <MainMenu />
      {/* Scanline effect overlay for sci-fi aesthetic */}
      <div className="scanline"></div>
    </div>
  );
};

export default Index;
