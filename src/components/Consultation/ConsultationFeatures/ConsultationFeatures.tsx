import FeatureCard from "@/components/Consultation/FeatureCard/FeatureCard";
import { consultationFeatures } from "@/components/Consultation/data/consultation.data";

const ConsultationFeatures = () => {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {consultationFeatures.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default ConsultationFeatures;
