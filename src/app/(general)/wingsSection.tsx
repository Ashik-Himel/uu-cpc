import acmIcon from "@/assets/images/icons/acm.png";
import careerIcon from "@/assets/images/icons/career.png";
import developmentIcon from "@/assets/images/icons/development.png";
import researchIcon from "@/assets/images/icons/research.png";
import { Card } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

export default function WingsSection() {
  return (
    <section>
      <div className="container">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-center mb-4">
          Club <span className="text-primary">Wings</span>
        </h2>
        <p className="text-center max-w-[600px] mx-auto">
          Here is the list of our club wings that can helps you to level up your
          skills in a specific field by joining the wings where you are
          interested.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <WingsCard
            icon={acmIcon}
            title="ACM TF Wings"
            description="Join the ACM Task Force Wings to level up your skills in many ways."
          />
          <WingsCard
            icon={developmentIcon}
            title="Development Wings"
            description="Join the Development Wings to level up your coding skills."
          />
          <WingsCard
            icon={researchIcon}
            title="Research Wings"
            description="Join the Research Wings to level up your research skills."
          />
          <WingsCard
            icon={careerIcon}
            title="Career Wings"
            description="Join the Career Wings to gain knowledge about career development."
          />
        </div>
      </div>
    </section>
  );
}

function WingsCard({
  icon,
  title,
  description,
}: {
  icon: StaticImageData;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6">
      <Image src={icon} alt={title} className="w-[80px]" />
      <h3 className="mt-6 text-2xl font-medium">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
    </Card>
  );
}
