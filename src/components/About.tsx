import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle, Database, Server, Settings, Cpu, Layers } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export const About: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Core Backend & Java',
      icon: <Server className="w-5 h-5 text-black" />,
      skills: ['Java (JDK 17/21)', 'Spring Boot', 'Spring Cloud', 'Spring Security', 'JWT & OAuth 2.0', 'Express JS', 'MapStruct', 'DTO Patterns']
    },
    {
      title: 'Databases & Caching',
      icon: <Database className="w-5 h-5 text-black" />,
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server', 'Redis & Redisson', 'Database Indexing', 'Distributed Locks']
    },
    {
      title: 'Event Streaming & Brokers',
      icon: <Cpu className="w-5 h-5 text-black" />,
      skills: ['Apache Kafka', 'RabbitMQ', 'Event-Driven Architecture', 'Transactional Outbox', 'Asynchronous Queues']
    },
    {
      title: 'Infrastructure & Cloud',
      icon: <Layers className="w-5 h-5 text-black" />,
      skills: ['AWS EC2', 'AWS S3', 'AWS RDS', 'AWS DynamoDB', 'AWS Lambda', 'AWS API Gateway', 'Docker', 'Vercel', 'Render']
    },
    {
      title: 'Workflows & Engineering Tools',
      icon: <Settings className="w-5 h-5 text-black" />,
      skills: ['Git & GitHub', 'GitLab CI/CD', 'GitHub Actions', 'Dbeaver', 'Postman', 'Cursor & Claude Code', 'IntelliJ IDEA']
    }
  ];

  return (
    <section id="about" className="relative bg-white py-32 px-8 z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-20">
          <span className="text-[#6F6F6F] font-body text-sm tracking-widest uppercase block mb-3">// ARCHITECT PROFILE</span>
          <h2 className="font-display text-5xl md:text-7xl text-black font-normal tracking-tight">
            Building robust <span className="italic text-[#6F6F6F]">foundations.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Summary & Biography */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-body text-xs font-semibold text-black tracking-wider uppercase block">// PROFESSIONAL MISSION</span>
              <p className="font-body text-xl text-black leading-relaxed font-light">
                “Backend-focused Software Engineering student with hands-on experience building Java/Spring Boot web applications and RESTful APIs.”
              </p>
              <p className="font-body text-base text-[#6F6F6F] leading-relaxed">
                Dedicated to designing and implementing scalable backend systems, microservices architectures, and event-driven pipelines. Continuously learning the intricacies of cloud services, cache strategies, and secure transactional systems.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4 border border-gray-100">
              <span className="font-body text-xs font-semibold text-black tracking-wider uppercase block">// CORE COMPETENCIES</span>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-black shrink-0" />
                  <span className="text-sm font-body text-black">Microservices Orchestration & Gateway Security</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-black shrink-0" />
                  <span className="text-sm font-body text-black">High-Concurrency Caching & Distributed Locking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-black shrink-0" />
                  <span className="text-sm font-body text-black">Event-Driven Asynchronous Processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-black shrink-0" />
                  <span className="text-sm font-body text-black">Cloud Deployments & Infrastructure-as-Code</span>
                </div>
              </div>
            </div>
            
            {/* Education Block */}
            <div className="space-y-4 pt-4">
              <span className="font-body text-xs font-semibold text-black tracking-wider uppercase block">// EDUCATION & CERTIFICATION</span>
              <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/50 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3 items-start">
                    <BookOpen className="w-5 h-5 text-black mt-1" />
                    <div>
                      <h4 className="font-body text-sm font-bold text-black">Industrial University of HCM City</h4>
                      <p className="font-body text-xs text-[#6F6F6F]">Bachelor of Engineering in Software Engineering</p>
                      <p className="font-body text-xs text-[#6F6F6F] mt-1">GPA: 3.44 / 4.0</p>
                    </div>
                  </div>
                  <span className="text-xs font-body text-black bg-white border border-gray-100 px-3 py-1 rounded-full whitespace-nowrap">2022 - 2027 (Expected)</span>
                </div>
                
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex gap-2 items-center text-xs font-body text-[#6F6F6F]">
                    <Award className="w-4 h-4 text-black" />
                    <span>Received 50% tuition scholarships twice for outstanding academic performance</span>
                  </div>
                  <div className="flex gap-2 items-center text-xs font-body text-[#6F6F6F]">
                    <Award className="w-4 h-4 text-black" />
                    <span>Top 28 InnoGreen Life – IETECH 2025-2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Technology Skillboard */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-body text-xs font-semibold text-black tracking-wider uppercase block">// TECHNICAL SPECTRUM</span>
            
            <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              {/* Category tabs list */}
              <div className="md:col-span-5 bg-gray-50 border-r border-gray-100 flex flex-col">
                {skillCategories.map((category, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(idx)}
                    className={`px-6 py-5 flex items-center gap-3 font-body text-xs font-medium uppercase tracking-wider text-left transition-all focus:outline-none border-b border-gray-100 last:border-0 ${
                      activeCategory === idx 
                        ? 'bg-white text-black border-l-4 border-l-black border-r-transparent' 
                        : 'text-[#6F6F6F] hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    {category.icon}
                    <span>{category.title}</span>
                  </button>
                ))}
              </div>

              {/* Skill details content */}
              <div className="md:col-span-7 bg-white p-8 flex flex-col justify-between min-h-[300px]">
                <div className="space-y-4">
                  <span className="font-body text-xs text-[#6F6F6F] uppercase tracking-wider">
                    Category: {skillCategories[activeCategory].title}
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {skillCategories[activeCategory].skills.map((skill) => (
                      <div 
                        key={skill}
                        className="flex items-center gap-2.5 p-3 rounded-lg border border-gray-50 bg-gray-50/20 hover:border-gray-200 transition-colors duration-200"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        <span className="font-body text-sm text-black font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 text-xs font-body text-[#6F6F6F]">
                  <span>English proficiency equivalent to <strong>TOEIC 750+</strong>. Skilled in technical reading and collaborative communication.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
