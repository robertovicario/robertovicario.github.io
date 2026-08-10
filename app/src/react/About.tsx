import { useState } from "react";
import type { ReactNode } from "react";
import main_data from "../../../main.json";

type DefaultSection = {
    type: "default";
    key: string;
    category: string;
    icon: string;
    entries: Array<{
        label: string;
        content: ReactNode;
    }>;
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
    key: string;
    category: string;
    icon: string;
    entries: TimelineEntry[];
};

type PublicationEntry = {
    title: string;
    authors: ReactNode;
    institution: string;
    date: string;
    location: string;
    link: string;
};

type PublicationSection = {
    type: "publication";
    key: string;
    category: string;
    icon: string;
    entries: PublicationEntry[];
};

type Section = DefaultSection | TimelineSection | PublicationSection;

type TimelineContent = {
    title: string;
    institution: string;
    period: string;
    location: string;
    bullets: string[];
};

type PublicationContent = {
    publication: {
        title: string;
        source: string;
    };
    authors: Array<{
        name: string;
        orcid?: string;
    }>;
    date: string;
    location: string;
    institution: string;
};

type DefaultSectionData = {
    type: "default";
    label: string;
    icon: string;
    content: string[];
};

type TimelineSectionData = {
    type: "timeline";
    label: string;
    icon: string;
    content: TimelineContent[];
};

type PublicationSectionData = {
    type: "publication";
    label: string;
    icon: string;
    content: PublicationContent[];
};

type AboutSectionData =
    | DefaultSectionData
    | TimelineSectionData
    | PublicationSectionData;

const info = main_data.main;
const aboutEntries = info.about.content as AboutSectionData[];

const StrongText = ({ html }: { html: string }) => {
    const parts = html.split(/(<strong>.*?<\/strong>)/g);

    return (
        <>
            {parts.map((part, index) => {
                const match = part.match(/^<strong>(.*?)<\/strong>$/);

                if (match) {
                    return (
                        <strong
                            key={index}
                            className="font-medium text-[var(--white)]"
                        >
                            {match[1]}
                        </strong>
                    );
                }

                return part;
            })}
        </>
    );
};

const timelineEntries = (
    entries: TimelineContent[],
): TimelineEntry[] =>
    entries.map((entry) => ({
        title: entry.title,
        organization: entry.institution,
        date: entry.period,
        location: entry.location,
        bullets: entry.bullets.map((bullet, index) => (
            <StrongText
                key={`${entry.title}-bullet-${index}`}
                html={bullet}
            />
        )),
    }));

const publicationEntries = (
    entries: PublicationContent[],
): PublicationEntry[] =>
    entries.map((entry) => ({
        title: entry.publication.title,
        authors: (
            <>
                {entry.authors.map((author, index) => (
                    <span key={author.orcid ?? author.name}>
                        {index > 0 ? ", " : ""}
                        {author.orcid ? (
                            <a
                                href={author.orcid}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[var(--primary)] transition-colors hover:text-[var(--white)]"
                            >
                                {author.name}
                            </a>
                        ) : (
                            author.name
                        )}
                    </span>
                ))}
            </>
        ),
        institution: entry.institution,
        date: entry.date,
        location: entry.location,
        link: entry.publication.source,
    }));

const buildSection = (section: AboutSectionData): Section => {
    const key = section.label.toLowerCase();

    switch (section.type) {
        case "default": {
            const labels = ["Summary", "Technologies"];

            return {
                type: "default",
                key,
                category: section.label,
                icon: section.icon,
                entries: section.content.map((content, index) => ({
                    label: labels[index] ?? `Item ${index + 1}`,
                    content,
                })),
            };
        }

        case "timeline":
            return {
                type: "timeline",
                key,
                category: section.label,
                icon: section.icon,
                entries: timelineEntries(section.content),
            };

        case "publication":
            return {
                type: "publication",
                key,
                category: section.label,
                icon: section.icon,
                entries: publicationEntries(section.content),
            };
    }
};

const About = () => {
    const [openItem, setOpenItem] = useState<string | null>(null);
    const sections = aboutEntries.map(buildSection);

    const toggleItem = (item: string) => {
        setOpenItem((current) => (current === item ? null : item));
    };

    const renderSectionContent = (section: Section) => {
        if (section.type === "default") {
            return (
                <div className="space-y-4 text-[var(--white-icon)]">
                    {section.entries.map((entry) => (
                        <p
                            key={entry.label}
                            className="text-sm leading-6 md:text-base md:leading-7"
                        >
                            <strong className="font-medium text-[var(--white)]">
                                {entry.label}:
                            </strong>{" "}
                            {entry.content}
                        </p>
                    ))}
                </div>
            );
        }

        if (section.type === "publication") {
            return (
                <div className="space-y-5">
                    {section.entries.map((entry) => (
                        <article
                            key={`${entry.title}-${entry.date}`}
                            className="border-t border-[var(--white-icon-tr)] pt-5 first:border-t-0 first:pt-0"
                        >
                            <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                                <div>
                                    <a
                                        href={entry.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-base font-medium leading-snug text-[var(--white)] transition-colors hover:text-[var(--primary)]"
                                    >
                                        {entry.title}
                                    </a>

                                    <p className="mt-2 text-sm leading-6 text-[var(--white-icon)]">
                                        {entry.authors}
                                    </p>
                                </div>

                                <div className="text-sm leading-6 text-[var(--white-icon)] md:text-right">
                                    <p>{entry.date}</p>
                                    <p>{entry.location}</p>
                                </div>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-[var(--white-icon)]">
                                <span className="font-medium text-[var(--white)]">
                                    Institution:
                                </span>{" "}
                                {entry.institution}
                            </p>
                        </article>
                    ))}
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {section.entries.map((entry) => (
                    <article
                        key={`${entry.title}-${entry.date}`}
                        className="relative border-t border-[var(--white-icon-tr)] pt-5 first:border-t-0 first:pt-0"
                    >
                        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                            <div>
                                <h4 className="text-base font-medium leading-snug text-[var(--white)]">
                                    {entry.title}
                                </h4>

                                <p className="mt-1 text-sm text-[var(--primary)]">
                                    {entry.organization}
                                </p>
                            </div>

                            <div className="text-sm leading-6 text-[var(--white-icon)] md:text-right">
                                <p>{entry.date}</p>
                                <p>{entry.location}</p>
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--white-icon)]">
                            {entry.bullets.map((bullet, index) => (
                                <li
                                    key={index}
                                    className="grid grid-cols-[auto_1fr] gap-3"
                                >
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
                {sections.map((section) => {
                    const isOpen = openItem === section.key;

                    return (
                        <li key={section.key} className="w-full">
                            <div className="w-full overflow-hidden rounded-2xl border border-[var(--white-icon-tr)] bg-[#1414149c] text-left transition-all">
                                <button
                                    type="button"
                                    onClick={() => toggleItem(section.key)}
                                    className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[var(--white-icon-tr)]"
                                    aria-expanded={isOpen}
                                >
                                    <i
                                        className={`bi ${section.icon} me-2 text-2xl text-[var(--primary)] opacity-70`}
                                        aria-hidden="true"
                                    />

                                    <div className="flex flex-grow items-center justify-between gap-2">
                                        <div className="min-w-0 max-w-[200px] overflow-hidden md:max-w-none">
                                            <span className="block truncate text-lg text-[var(--white)]">
                                                {section.category}
                                            </span>
                                        </div>

                                        <i
                                            className={`bi bi-chevron-down flex-shrink-0 text-2xl text-[var(--white)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                                            aria-hidden="true"
                                        />
                                    </div>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-8 pt-5 pb-8">
                                            {renderSectionContent(section)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default About;
