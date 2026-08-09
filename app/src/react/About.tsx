import { useState } from "react";
import type { ReactNode } from "react";
import links from "../../../href.json";

type SectionName = "Bio" | "Education" | "Research" | "Experience";

type BioSection = {
    type: "bio";
    category: SectionName;
    summary: ReactNode;
    technologies: ReactNode;
};

type TimelineEntry = {
    title: string;
    organization: string;
    date: string;
    location: string;
    bullets: ReactNode[];
};

type TimelineSection = {
    type: "timeline";
    category: SectionName;
    entries: TimelineEntry[];
};

type ResearchEntry = {
    title: string;
    authors: ReactNode;
    venue: string;
    year: string;
    type: string;
    link: string;
};

type ResearchSection = {
    type: "research";
    category: SectionName;
    entries: ResearchEntry[];
};

type Section = BioSection | TimelineSection | ResearchSection;

const CategoryIcons: Record<SectionName, string> = {
    "Bio": "bi-person",
    "Education": "bi-mortarboard",
    "Research": "bi-journal-text",
    "Experience": "bi-code-slash",
};

const About = () => {
    const [openItem, setOpenItem] = useState<SectionName | null>(null);
    const sections: Section[] = [
        {
            type: "bio",
            category: "Bio",
            summary: <><strong className="font-medium text-[var(--white)]">Summary:</strong> AI Software Engineer experienced in designing, developing, and deploying real-world AI systems for aerospace and industrial applications. Experienced across the entire AI software lifecycle, transforming complex data into scalable AI software solutions.</>,
            technologies: <><strong className="font-medium text-[var(--white)]">Technologies:</strong> Java, Python, JavaScript, Spring Boot, FastAPI, SQL, Redis, MongoDB, Git, Docker, Kubernetes, Google Cloud Platform, BigQuery, Pandas, scikit-learn, TensorFlow, OpenCV, MLflow, Airflow</>,
        },
        {
            type: "timeline",
            category: "Education",
            entries: [
                {
                    title: "Master of Science in Computer Science",
                    organization: "University of Insubria",
                    date: "Oct 2024 – Dec 2026",
                    location: "Varese, Italy",
                    bullets: [
                        <><strong className="font-medium text-[var(--white)]">Thesis:</strong> Development of an Industrial AI-Based Software for Risk Estimation of PCBs in Space Manufacturing</>,
                    ],
                },
                {
                    title: "Bachelor of Science in Computer Science",
                    organization: "University of Insubria",
                    date: "Oct 2020 – Feb 2024",
                    location: "Varese, Italy",
                    bullets: [
                        <><strong className="font-medium text-[var(--white)]">Thesis:</strong> Apply Machine Learning for Stress Detection in Office Work Environments</>,
                    ],
                },
            ],
        },
        {
            type: "timeline",
            category: "Experience",
            entries: [
                {
                    title: "AI Software Engineer",
                    organization: "Motus ml",
                    date: "Oct 2024 – Mar 2026",
                    location: "Milan, Italy",
                    bullets: [
                        <>Developed <strong className="font-medium text-[var(--white)]">machine learning and data-driven software solutions</strong> for industrial applications in the <strong className="font-medium text-[var(--white)]">Space Economy</strong> and Advanced Manufacturing sectors.</>,
                        <>Contributed to <strong className="font-medium text-[var(--white)]">3 industrial projects</strong>, progressing from full-stack software development to data science and end-to-end AI engineering.</>,
                        <>Implemented <strong className="font-medium text-[var(--white)]">Python-based REST APIs (Flask)</strong> and <strong className="font-medium text-[var(--white)]">Dockerized microservices</strong> to build production-ready software systems integrating <strong className="font-medium text-[var(--white)]">ETL pipelines</strong> and <strong className="font-medium text-[var(--white)]">AI models</strong> for customer on-premise environments.</>,
                        <>Designed and developed an AI-driven defect prediction system for <strong className="font-medium text-[var(--white)]">ESA-regulated</strong> manufacturing environments, generating <strong className="font-medium text-[var(--white)]">thousands of component-level quality predictions</strong> across hundreds of PCB assemblies as part of my industrial <strong className="font-medium text-[var(--white)]">Master’s Thesis</strong> in collaboration with the R&D team.</>,
                        <>Deployed the solution in customer environments, enabling predictive quality assessment before production and reducing <strong className="font-medium text-[var(--white)]">defect analysis time from months to days</strong>.</>,
                    ],
                },
                {
                    title: "Data Scientist Intern",
                    organization: "University of Insubria, DiSTA Department",
                    date: "Oct 2023 – Jan 2024",
                    location: "Varese, Italy",
                    bullets: [
                        <>Conducted a machine learning research project in the <strong className="font-medium text-[var(--white)]">Biomedical</strong> domain by investigating unsupervised approaches for <strong className="font-medium text-[var(--white)]">stress detection</strong> using <strong className="font-medium text-[var(--white)]">HRV</strong> data.</>,
                        <>Gained experience in formulating <strong className="font-medium text-[var(--white)]">research questions</strong>, reviewing the state of the art and related <strong className="font-medium text-[var(--white)]">literature</strong>, and <strong className="font-medium text-[var(--white)]">reproducing</strong> published experiments.</>,
                        <>The project served as the foundation of my research <strong className="font-medium text-[var(--white)]">Bachelor’s Thesis</strong>, conducted under the supervision of a university researcher.</>,
                    ],
                },
            ],
        },
        {
            type: "research",
            category: "Research",
            entries: [
                {
                    title: "Development of an Industrial AI-Based Software for Risk Estimation of PCBs in Space Manufacturing",
                    authors: <>Roberto Vicario, <a href={links.identity.orcid.url} target="_blank" rel="noreferrer" className="text-[var(--primary)] hover:text-[var(--white)] transition-colors">ORCID: {links.identity.orcid.id}</a></>,
                    venue: "University of Insubria",
                    year: "2026-12-10",
                    type: "Master's Thesis",
                    link: "#"
                },
                {
                    title: "Apply Machine Learning for Stress Detection in Office Work Environments",
                    authors: <>Roberto Vicario, <a href={links.identity.orcid.url} target="_blank" rel="noreferrer" className="text-[var(--primary)] hover:text-[var(--white)] transition-colors">ORCID: {links.identity.orcid.id}</a></>,
                    venue: "University of Insubria",
                    year: "2024-02-21",
                    type: "Bachelor's Thesis",
                    link: links.documents.bachelorThesis
                },
            ],
        },
    ];

    const toggleItem = (item: SectionName) => {
        setOpenItem(openItem === item ? null : item);
    };

    const renderSectionContent = (section: Section) => {
        if (section.type === "bio") {
            return (
                <div className="space-y-4 text-[var(--white-icon)]">
                    <p className="text-sm leading-6 md:text-base md:leading-7">{section.summary}</p>
                    <p className="text-sm leading-6 md:text-base md:leading-7">{section.technologies}</p>
                </div>
            );
        }

        if (section.type === "research") {
            return (
                <div className="space-y-5">
                    {section.entries.map((entry) => (
                        <article key={entry.title} className="border-t border-[var(--white-icon-tr)] pt-5 first:border-t-0 first:pt-0">
                            <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                                <div>
                                    <a href={entry.link} className="text-base font-medium leading-snug text-[var(--white)] hover:text-[var(--primary)] transition-colors">
                                        {entry.title}
                                    </a>
                                    <p className="mt-2 text-sm leading-6 text-[var(--white-icon)]">{entry.authors}</p>
                                </div>
                                <div className="text-sm leading-6 text-[var(--white-icon)] md:text-right">
                                    <p>{entry.year}</p>
                                    <p>{entry.type}</p>
                                </div>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-[var(--white-icon)]">
                                <span className="text-[var(--white)]">Institution:</span> {entry.venue}
                            </p>
                        </article>
                    ))}
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {section.entries.map((entry) => (
                    <article key={`${entry.title}-${entry.date}`} className="relative border-t border-[var(--white-icon-tr)] pt-5 first:border-t-0 first:pt-0">
                        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                            <div>
                                <h4 className="text-base font-medium leading-snug text-[var(--white)]">{entry.title}</h4>
                                <p className="mt-1 text-sm text-[var(--primary)]">{entry.organization}</p>
                            </div>
                            <div className="text-sm leading-6 text-[var(--white-icon)] md:text-right">
                                <p>{entry.date}</p>
                                <p>{entry.location}</p>
                            </div>
                        </div>
                        <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--white-icon)]">
                            {entry.bullets.map((bullet, index) => (
                                <li key={index} className="grid grid-cols-[auto_1fr] gap-3">
                                    <span className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-[var(--white)] opacity-80" />
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        );
    };

    return (
        <div>
            <ul className="space-y-4 text-lg">
                {sections.map((section) => (
                    <li key={section.category} className="w-full">
                        <div className="md:w-[100] w-full bg-[#1414149c] rounded-2xl text-left transition-all border border-[var(--white-icon-tr)] overflow-hidden">
                            <button type="button" onClick={() => toggleItem(section.category)} className="flex w-full items-center gap-3 p-4 text-left hover:bg-[var(--white-icon-tr)] transition-colors">
                                <i className={`bi ${CategoryIcons[section.category]} text-2xl me-2 text-[var(--primary)] opacity-70`} aria-hidden="true"></i>
                                <div className="flex items-center gap-2 flex-grow justify-between">
                                    <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">
                                        <span className="block truncate text-[var(--white)] text-lg">{section.category}</span>
                                    </div>
                                    <i
                                        className={`bi bi-chevron-down text-2xl text-[var(--white)] transform transition-transform flex-shrink-0 ${openItem === section.category ? "rotate-180" : ""
                                            }`}
                                        aria-hidden="true"
                                    ></i>
                                </div>
                            </button>
                            <div
                                className={`transition-all duration-300 px-4 ${openItem === section.category
                                    ? "max-h-[1200px] py-8 px-8 opacity-100"
                                    : "max-h-0 opacity-0"
                                    }`}>
                                {renderSectionContent(section)}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default About;
