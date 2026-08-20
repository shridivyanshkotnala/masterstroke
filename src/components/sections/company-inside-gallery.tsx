"use client";

import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";

import styles from "./company-inside-gallery.module.css";

type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: "/images/company/inside/inside-strategy.jpeg",
    alt: "Kotnala team in a client strategy and architecture planning session.",
    title: "Strategy Workshops",
    description: "Business discovery, architecture reviews, and roadmap planning with client stakeholders.",
  },
  {
    src: "/images/company/inside/inside-workspace.jpeg",
    alt: "Kotnala consultants collaborating in an engineering workspace.",
    title: "Engineering Collaboration",
    description: "Cross-functional planning, technical alignment, and architecture decision making.",
  },
  {
    src: "/images/company/inside/inside-culture.jpeg",
    alt: "Kotnala team knowledge-sharing during delivery planning.",
    title: "Execution & Delivery",
    description: "Turning strategy into production-ready systems with disciplined implementation.",
  },
];

const workflowSteps = ["Discover", "Design", "Deliver"];

function GalleryCard({
  image,
  className,
  sizes,
  priority = false,
  delay = 0,
}: {
  image: GalleryImage;
  className?: string;
  sizes: string;
  priority?: boolean;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <figure tabIndex={0} className={styles.card}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={styles.cardImage}
        />
        <figcaption className={styles.cardOverlay}>
          <p className={styles.cardTitle}>{image.title}</p>
          <p className={styles.cardDescription}>{image.description}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function CompanyInsideGallerySection() {
  const [heroImage, sideTopImage, sideBottomImage] = galleryImages;

  return (
    <section id="office" className="border-t border-border/70 py-14 sm:py-16">
      <div className="layout-container">
        <header className={styles.header}>
          <p className={styles.kicker}>Inside Kotnala</p>
          <h2 className={styles.title}>Engineering in Action</h2>
          <p className={styles.intro}>
            A glimpse into how Kotnala Consultancy collaborates with clients, from strategy workshops and architecture reviews to
            engineering execution and long-term technology partnerships.
          </p>
        </header>

        <Reveal delay={80} className={styles.workflowReveal}>
          <ol className={styles.workflow} aria-label="Kotnala engagement workflow">
            {workflowSteps.map((step, index) => (
              <li key={step} className={styles.workflowStep}>
                <span className={styles.workflowLabel}>{step}</span>
                {index < workflowSteps.length - 1 ? <span aria-hidden="true" className={styles.workflowConnector} /> : null}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className={styles.galleryGrid}>
          <GalleryCard
            image={heroImage}
            className={styles.heroCard}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 52vw"
            priority
            delay={120}
          />

          <div className={styles.sideStack}>
            <GalleryCard
              image={sideTopImage}
              className={styles.sideCard}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 34vw"
              delay={200}
            />
            <GalleryCard
              image={sideBottomImage}
              className={styles.sideCard}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 34vw"
              delay={280}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
