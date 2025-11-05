import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import ToolsOverview from '../components/ToolsOverview';
import UseCases from '../components/UseCases';
import RecentUpdates from '../components/RecentUpdates';
import Trust from '../components/Trust';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ProductShowcase />
      <ToolsOverview />
      <UseCases />
      <RecentUpdates />
      <Trust />
      <Pricing />
      <FAQ />
      <ContactForm />
      <CTA />
      <Footer />
    </div>
  );
}
