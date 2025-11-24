import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "David Kasemirovisz",
    role: "Co-Founder & CEO",
    description: "Passionate about using AI to solve everyday problems and reduce food waste.",
    imageUrl: `https://picsum.photos/seed/david/200`
  },
  {
    name: "Jorgo Qirjaj",
    role: "Co-Founder & CTO",
    description: "Tech visionary building scalable platforms that make cooking accessible to everyone.",
    imageUrl: `https://picsum.photos/seed/jorgo/200`
  },
  {
    name: "Minahil Samee",
    role: "Head of Product",
    description: "Designing intuitive experiences that empower home cooks to discover their potential.",
    imageUrl: `https://picsum.photos/seed/minahil/200`
  },
  {
    name: "Mrtunjay Gupta",
    role: "Lead AI Engineer",
    description: "Developing cutting-edge AI models to personalize every cooking experience.",
    imageUrl: `https://picsum.photos/seed/mrtunjay/200`
  }
];

const TeamMemberCard: React.FC<TeamMember> = ({ name, role, description, imageUrl }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center text-center md:text-left gap-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <img src={imageUrl} alt={name} className="w-24 h-24 rounded-full flex-shrink-0" />
        <div>
            <h3 className="text-xl font-bold text-brand-dark">{name}</h3>
            <p className="text-brand-green font-semibold">{role}</p>
            <p className="text-brand-gray mt-2">{description}</p>
        </div>
    </div>
);

const TeamPage: React.FC = () => {
    return (
        <div className="pt-24 md:pt-32 pb-20">
            <div className="container mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 bg-brand-surface text-brand-green text-sm font-semibold px-4 py-2 rounded-full border border-brand-stroke">
                    Meet the Team
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mt-4">
                    The People Behind FreshPal
                </h1>
                <p className="text-lg text-brand-gray max-w-3xl mx-auto mt-4">
                    We're a passionate team dedicated to transforming how people cook at home, one smart recipe at a time.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
                    {teamMembers.map(member => <TeamMemberCard key={member.name} {...member} />)}
                </div>

                <div className="mt-20 max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-3xl font-bold text-brand-dark">Rice University School Project</h2>
                    <p className="text-brand-gray mt-2">
                        This is an MVP created to support our final project for the Engineering Product Management class at Rice, as part of the Masters of Engineering Management program. We just had some fun and went a little extra, by creating this MVP.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;