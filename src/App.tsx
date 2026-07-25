import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import StatsGrid from "./components/StatsGrid";
import ArchitectureDiagram from "./components/ArchitectureDiagram";
import LossChart from "./components/LossChart";
import GPUPanel from "./components/GPUPanel";
import ComparisonTable from "./components/ComparisonTable";
import InsightsSection from "./components/InsightsSection";
import FooterSection from "./components/FooterSection";

export default function App() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <NavBar />

      {/* Hero */}
      <div id="hero">
        <HeroSection />
      </div>

      {/* Stats */}
      <div id="stats">
        <StatsGrid />
      </div>

      {/* Architecture */}
      <div id="architecture">
        <ArchitectureDiagram />
      </div>

      {/* Loss Charts */}
      <div id="loss">
        <LossChart />
      </div>

      {/* GPU Panel */}
      <div id="gpu">
        <GPUPanel />
      </div>


      {/* Comparison */}
      <div id="comparison">
        <ComparisonTable />
      </div>


      {/* Insights */}
      <div id="insights">
        <InsightsSection />
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
