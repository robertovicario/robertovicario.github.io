import { useState } from "react";
import type { ReactNode } from "react";
import main_data from "../../../main.json";

type BioSection = {
  type: "bio";
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
  key: string;
  category: string;
  icon: string;
  entries: ResearchEntry[];
};

type Section = BioSection | TimelineSection | ResearchSection;

type TimelineContent = {
  title: string;
  institution: string;
  period: string;
  location: string;
  bullets: string[];
};

type ResearchContent = {
  title: string;
  authors: Array<{
    name: string;
    orcid?: string;
  }>;
  institution: string;
  date: string;
  source: string;
};

type AboutSectionData = {
  icon: string;
  content: string[] | TimelineContent[] | ResearchContent[];
};

const info = main_data.information;
const aboutEntries = (Object.entries(info.about) as [string, unknown][]).filter(
  (entry): entry is [string, AboutSectionData] =>
    typeof entry[1] === "object" &&
    entry[1] !== null &&
    "icon" in entry[1] &&
    "content" in entry[1],
);

const StrongText = ({ html }: { html: string }) => {
  const parts = html.split(/(<strong>.*?<\/strong>)/g);

  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^<strong>(.*?)<\/strong>$/);

        if (match) {
          return (
            <strong key={index} className="font-medium text-[var(--white)]">
              {match[1]}
            </strong>
          );
        }

        return part;
      })}
    </>
  );
};

const timelineEntries = (entries: TimelineContent[]): TimelineEntry[] =>
  entries.map((entry) => ({
    title: entry.title,
    organization: entry.institution,
    date: entry.period,
    location: entry.location,
    bullets: entry.bullets.map((bullet) => <StrongText html={bullet} />),
  }));

const researchEntries = (entries: ResearchContent[]): ResearchEntry[] =>
  entries.map((entry) => ({
    title: entry.title,
    authors: (
      <>
        {entry.authors.map((author, index) => (
          <span key={author.orcid}>
            {index > 0 ? ", " : ""}
            {author.name}
            {author.orcid ? (
              <>
                ,{" "}
                <a
                  href={author.orcid}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--primary)] hover:text-[var(--white)] transition-colors"
                >
                  ORCID: {author.orcid.replace("https://orcid.org/", "")}
                </a>
              </>
            ) : null}
          </span>
        ))}
      </>
    ),
    venue: entry.institution,
    year: entry.date,
    type: entry.title.includes("Industrial AI-Based")
      ? "Master's Thesis"
      : "Bachelor's Thesis",
    link: entry.source,
  }));

const formatCategory = (key: string) =>
  key.charAt(0).toUpperCase() + key.slice(1);

const buildSection = ([key, section]: [string, AboutSectionData]): Section => {
  const category = formatCategory(key);

  if (key === "bio") {
    const labels = ["Summary", "Technologies"];

    return {
      type: "bio",
      key,
      category,
      icon: section.icon,
      entries: (section.content as string[]).map((content, index) => ({
        label: labels[index] ?? `Item ${index + 1}`,
        content,
      })),
    };
  }

  if (key === "research") {
    return {
      type: "research",
      key,
      category,
      icon: section.icon,
      entries: researchEntries(section.content as ResearchContent[]),
    };
  }

  return {
    type: "timeline",
    key,
    category,
    icon: section.icon,
    entries: timelineEntries(section.content as TimelineContent[]),
  };
};

const About = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const sections = aboutEntries.map(buildSection);

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  const renderSectionContent = (section: Section) => {
    if (section.type === "bio") {
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

    if (section.type === "research") {
      return (
        <div className="space-y-5">
          {section.entries.map((entry) => (
            <article
              key={entry.title}
              className="border-t border-[var(--white-icon-tr)] pt-5 first:border-t-0 first:pt-0"
            >
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <a
                    href={entry.link}
                    className="text-base font-medium leading-snug text-[var(--white)] hover:text-[var(--primary)] transition-colors"
                  >
                    {entry.title}
                  </a>
                  <p className="mt-2 text-sm leading-6 text-[var(--white-icon)]">
                    {entry.authors}
                  </p>
                </div>
                <div className="text-sm leading-6 text-[var(--white-icon)] md:text-right">
                  <p>{entry.year}</p>
                  <p>{entry.type}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--white-icon)]">
                <span className="text-[var(--white)]">Institution:</span>{" "}
                {entry.venue}
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
          <li key={section.key} className="w-full">
            <div className="md:w-[100] w-full bg-[#1414149c] rounded-2xl text-left transition-all border border-[var(--white-icon-tr)] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleItem(section.key)}
                className="flex w-full items-center gap-3 p-4 text-left hover:bg-[var(--white-icon-tr)] transition-colors"
              >
                <i
                  className={`bi ${section.icon} text-2xl me-2 text-[var(--primary)] opacity-70`}
                  aria-hidden="true"
                ></i>
                <div className="flex items-center gap-2 flex-grow justify-between">
                  <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">
                    <span className="block truncate text-[var(--white)] text-lg">
                      {section.category}
                    </span>
                  </div>
                  <i
                    className={`bi bi-chevron-down text-2xl text-[var(--white)] transform transition-transform flex-shrink-0 ${openItem === section.key ? "rotate-180" : ""
                      }`}
                    aria-hidden="true"
                  ></i>
                </div>
              </button>
              <div
                className={`transition-all duration-300 px-4 ${openItem === section.key
                    ? "max-h-[1200px] py-8 px-8 opacity-100"
                    : "max-h-0 opacity-0"
                  }`}
              >
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
