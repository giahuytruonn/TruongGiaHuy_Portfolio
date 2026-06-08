import React, { useState } from 'react';
import { Calendar, Users, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  teamSize: number;
  period: string;
  description: string;
  techStack: string[];
  github?: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
}

export const Studio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'experience'>('projects');

  const projects: Project[] = [
    {
      id: 'divenha',
      title: 'DiVeNha',
      subtitle: 'Microservices Ticket Booking System',
      role: 'Project Leader',
      teamSize: 3,
      period: 'May 2026 - Present',
      description: 'A robust microservices-based platform designed to handle real-time ticket bookings, seat allocation, and high-concurrency seat-locks. Implemented a distributed structure ensuring high scalability and fault tolerance.',
      techStack: [
        'Spring Boot', 'Spring Cloud', 'Spring Security', 'React JS', 
        'Redis/Redisson', 'Kafka', 'PostgreSQL', 'Resilience4j', 'AWS EC2', 'Docker'
      ],
      github: 'https://github.com/giahuytruonn',
      highlights: [
        'Built microservices-level authentication/authorization with JWT, OAuth2, and RBAC via Spring Cloud Gateway.',
        'Designed & implemented RESTful APIs (120+ route mappings) across 10+ independent services.',
        'Maintained distributed PostgreSQL databases (38+ core entities) with transactional integrity.',
        'Solved concurrency bottlenecks using Redis/Redisson for distributed seat-lock validation.',
        'Established reliable event-driven messaging with Kafka using the Transactional Outbox pattern.',
        'Implemented Resilience4j for gateway rate-limiting, circuit breakers, and fallback mechanisms.'
      ],
      metrics: [
        { label: 'Services Orchestrated', value: '10+' },
        { label: 'Route Mappings', value: '120+' },
        { label: 'Database Entities', value: '38+' },
        { label: 'Concurrency Engine', value: 'Redisson' }
      ]
    },
    {
      id: 'vietvivu',
      title: 'VietVivu',
      subtitle: 'End-to-End Tour Booking Platform',
      role: 'Project Leader',
      teamSize: 4,
      period: 'Oct 2025 - Dec 2025',
      description: 'A comprehensive web application enabling tour exploration, secure online bookings, automated invoicing, and role-based administration.',
      techStack: [
        'Spring Boot', 'Spring Security', 'React JS', 'Redis', 'RabbitMQ', 
        'PostgreSQL', 'Cloudinary', 'PayOS Integration', 'Java Mail'
      ],
      github: 'https://github.com/giahuytruonn/Vietvivu-Tour-Booking',
      highlights: [
        'Created secure authentication using JWT, OAuth2, and role-based access control via Spring Security.',
        'Implemented 90+ route mappings using a multi-layer Controller-Service-Repository architecture.',
        'Integrated PayOS for automated end-to-end online payments and digital invoice workflows.',
        'Integrated Cloudinary for media asset management and Redis for email rate limiting.',
        'Managed booking workflow asynchronously with RabbitMQ producer/consumer architecture.'
      ],
      metrics: [
        { label: 'Team Members', value: '4' },
        { label: 'API Endpoints', value: '90+' },
        { label: 'Entities Modeled', value: '16+' },
        { label: 'Queue Broker', value: 'RabbitMQ' }
      ]
    }
  ];

  const experiences = [
    {
      company: 'TMA Solutions',
      role: 'Software Engineer Intern',
      period: 'January 2026 – April 2026',
      description: 'Worked inside the engineering team to develop and scale internal enterprise web applications. Gained practical experience in Agile development, full-stack workflows, and database optimizations.',
      techStack: ['ReactJS', 'ExpressJS', 'MongoDB', 'AWS S3', 'Git', 'GitLab'],
      highlights: [
        'Developed and integrated 15+ highly responsive UI components in ReactJS, optimizing loading times.',
        'Built, maintained, and optimized 10+ RESTful APIs using ExpressJS, improving response rates.',
        'Participated actively in sprint planning, code reviews, and debugging to maintain production standards.',
        'Utilized Git/GitLab workflows, successfully managing 50+ feature branches and merging 50+ pull requests.'
      ]
    }
  ];

  return (
    <section id="studio" className="relative bg-white py-32 px-8 z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <span className="text-[#6F6F6F] font-body text-sm tracking-widest uppercase block mb-3">// THE WORKSHOP</span>
            <h2 className="font-display text-5xl md:text-7xl text-black font-normal tracking-tight">
              Engineering <span className="italic text-[#6F6F6F]">digital architecture.</span>
            </h2>
          </div>
          
          {/* Tabs Selector */}
          <div className="flex space-x-2 mt-8 md:mt-0 p-1 bg-gray-50 border border-gray-100 rounded-full">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-2 rounded-full text-xs font-body uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'projects' 
                  ? 'bg-black text-white shadow-sm' 
                  : 'text-[#6F6F6F] hover:text-black'
              }`}
            >
              Core Systems
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-2 rounded-full text-xs font-body uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'experience' 
                  ? 'bg-black text-white shadow-sm' 
                  : 'text-[#6F6F6F] hover:text-black'
              }`}
            >
              Professional
            </button>
          </div>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-20">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                {/* Left Side: Project details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-4 text-[#6F6F6F] text-xs font-body uppercase tracking-widest">
                    <span>Project 0{index + 1}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {project.period}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Size: {project.teamSize}</span>
                  </div>

                  <h3 className="font-display text-4xl sm:text-5xl text-black tracking-tight leading-none">
                    {project.title} <span className="text-xl sm:text-2xl text-[#6F6F6F] font-sans font-light align-middle ml-2">{project.subtitle}</span>
                  </h3>

                  <p className="font-body text-[#6F6F6F] text-base leading-relaxed max-w-3xl">
                    {project.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-3 pt-2">
                    <span className="font-body text-xs text-black font-semibold tracking-wider uppercase block">// KEY CONTRIBUTIONS:</span>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="font-body text-sm text-[#6F6F6F] flex items-start">
                          <span className="text-black mr-2 font-bold select-none">›</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech badging */}
                  <div className="pt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span 
                        key={tech} 
                        className="font-body text-[11px] font-medium tracking-wide bg-gray-50 border border-gray-100 text-[#6F6F6F] px-3 py-1 rounded-full uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="pt-4 flex gap-4">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-2.5 text-xs font-body uppercase tracking-wider text-black bg-transparent transition-all duration-300 hover:bg-black hover:text-white"
                      >
                        <GithubIcon className="w-4 h-4" /> Source Repository
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Side: Performance stats */}
                <div className="lg:col-span-5 lg:sticky lg:top-24">
                  <div className="glass-card rounded-2xl p-8 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-10" />
                    <span className="font-body text-xs text-black font-semibold tracking-wider uppercase block mb-6">// SYSTEM METRICS</span>
                    <div className="grid grid-cols-2 gap-6">
                      {project.metrics.map((metric, mIndex) => (
                        <div key={mIndex} className="border-b border-gray-100 pb-4">
                          <span className="text-3xl font-display font-medium text-black block leading-none mb-1">
                            {metric.value}
                          </span>
                          <span className="text-xs font-body text-[#6F6F6F] uppercase tracking-wider">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3 text-xs text-[#6F6F6F] font-body">
                      <Cpu className="w-4 h-4 text-black" />
                      <span>Optimized multi-layer JVM execution stack.</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="max-w-4xl mx-auto space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="relative pl-8 border-l border-black/10 py-2 space-y-4"
              >
                {/* Timeline node */}
                <div className="absolute -left-[5px] top-4 w-[10px] h-[10px] rounded-full bg-black" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-body text-[#6F6F6F] uppercase tracking-widest">
                  <span className="font-semibold text-black text-sm">{exp.company}</span>
                  <span>{exp.period}</span>
                </div>

                <h3 className="font-display text-3xl text-black font-normal">
                  {exp.role}
                </h3>

                <p className="font-body text-sm text-[#6F6F6F] leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="font-body text-xs text-black font-semibold tracking-wider uppercase block">// KEY HIGHLIGHTS:</span>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="font-body text-sm text-[#6F6F6F] flex items-start">
                        <span className="text-black mr-2 font-bold select-none">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="font-body text-[10px] font-semibold tracking-wide bg-gray-50 border border-gray-100 text-[#6F6F6F] px-2.5 py-0.5 rounded-full uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
