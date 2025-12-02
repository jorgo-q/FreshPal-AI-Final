
import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  emoji: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "David Kasemirovisz",
    role: "Co-Founder",
    emoji: "👱🏻‍♂️"
  },
  {
    name: "Jorgo Qirjaj",
    role: "Co-Founder",
    emoji: "🧔🏻‍♂️"
  },
  {
    name: "Minahil Samee",
    role: "Co-Founder",
    emoji: "🧕🏽"
  },
  {
    name: "Mrtunjay Gupta",
    role: "Co-Founder",
    emoji: "👨🏽"
  }
];

const TeamMemberCard: React.FC<TeamMember> = ({ name, role, emoji }) => (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
        <div className="w-32 h-32 rounded-full bg-brand-surface flex items-center justify-center text-6xl shadow-inner mb-2 select-none">
            {emoji}
        </div>
        <div>
            <h3 className="text-xl font-bold text-brand-dark">{name}</h3>
            <p className="text-brand-green font-bold text-sm uppercase tracking-wide mt-1">{role}</p>
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

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-7xl mx-auto">
                    {teamMembers.map(member => <TeamMemberCard key={member.name} {...member} />)}
                </div>

                <div className="mt-20 max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-3xl font-bold text-brand-dark">Rice University School Project</h2>
                    <p className="text-brand-gray mt-4 leading-relaxed">
                        FreshPal was developed as a capstone project for the Engineering Product Management class within the Master of Engineering Management program at Rice University. Developed under the expert guidance of <strong>Dr. Uyiosa Abusomwan</strong>, this represents our team's dedication to innovating and turning a classroom concept into a functional AI-powered MVP.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
