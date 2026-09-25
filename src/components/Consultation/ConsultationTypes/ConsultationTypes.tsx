import ConsultationTypeItem from "@/components/Consultation/ConsultationTypeItem/ConsultationTypeItem";
import { consultationTypes } from "@/components/Consultation/data/consultation.data";

const ConsultationTypes = () => {
  return (
    <div className="mt-8 space-y-3">
      {consultationTypes.map((item) => (
        <ConsultationTypeItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default ConsultationTypes;
