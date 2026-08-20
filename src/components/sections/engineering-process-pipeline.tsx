"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";

type WorkflowStep = {
  id: number;
  title: string;
};

type Point = {
  x: number;
  y: number;
};

type EngineeringProcessPipelineProps = {
  steps: readonly WorkflowStep[];
};

const STAGE_ADVANCE_MS = 1000;

function createSmoothRoute(points: Point[]) {
  if (points.length < 2) {
    return "";
  }

  const tension = 0.22;
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[index - 1] ?? points[index];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[index + 2] ?? p2;

    const c1x = p1.x + (p2.x - p0.x) * tension;
    const c1y = p1.y + (p2.y - p0.y) * tension;
    const c2x = p2.x - (p3.x - p1.x) * tension;
    const c2y = p2.y - (p3.y - p1.y) * tension;

    path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }

  return path;
}

function createSegmentPath(from: Point, to: Point) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;

  const midX = from.x + dx * 0.5;
  const midY = from.y + dy * 0.5;
  const normalX = -dy / length;
  const normalY = dx / length;
  const curve = Math.min(30, Math.max(10, length * 0.14));

  const controlX = midX + normalX * curve;
  const controlY = midY + normalY * curve;

  return `M ${from.x} ${from.y} Q ${controlX} ${controlY}, ${to.x} ${to.y}`;
}

export function EngineeringProcessPipeline({ steps }: EngineeringProcessPipelineProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLLIElement | null>>([]);

  const [points, setPoints] = useState<Point[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isPaused = hoveredIndex !== null;
  const focusIndex = hoveredIndex ?? activeIndex;

  useEffect(() => {
    if (isPaused || steps.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % steps.length);
    }, STAGE_ADVANCE_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused, steps.length]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = window.requestAnimationFrame(() => {
        const shellRect = shell.getBoundingClientRect();
        const measuredPoints: Point[] = [];

        for (let index = 0; index < steps.length; index += 1) {
          const node = nodeRefs.current[index];
          if (!node) {
            return;
          }

          const rect = node.getBoundingClientRect();
          measuredPoints.push({
            x: rect.left - shellRect.left + rect.width / 2,
            y: rect.top - shellRect.top + rect.height / 2,
          });
        }

        setPoints(measuredPoints);
      });
    };

    measure();

    const observer = new ResizeObserver(() => measure());
    observer.observe(shell);

    nodeRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [steps.length]);

  const routePath = useMemo(() => createSmoothRoute(points), [points]);

  const nextIndex = steps.length ? (focusIndex + 1) % steps.length : 0;
  const previousIndex = steps.length ? (focusIndex - 1 + steps.length) % steps.length : 0;

  const liveSegmentPath =
    points[focusIndex] && points[nextIndex] ? createSegmentPath(points[focusIndex], points[nextIndex]) : "";

  const previousSegmentPath =
    points[previousIndex] && points[focusIndex] && hoveredIndex !== null
      ? createSegmentPath(points[previousIndex], points[focusIndex])
      : "";

  const routeStyle =
    routePath.length > 0
      ? ({
          "--delivery-route": `path(\"${routePath}\")`,
          "--delivery-duration": `${Math.max(steps.length, 2)}s`,
        } as CSSProperties)
      : undefined;

  return (
    <div
      ref={shellRef}
      className="delivery-stream-shell"
      data-paused={isPaused ? "true" : "false"}
      aria-label="Live software engineering delivery pipeline"
    >
      <div className="delivery-stream-blueprint" aria-hidden="true" />

      <svg className="delivery-stream-svg" aria-hidden="true">
        <defs>
          <linearGradient id="deliveryRouteBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(148,163,184,0.14)" />
            <stop offset="50%" stopColor="rgba(148,163,184,0.1)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0.14)" />
          </linearGradient>
          <linearGradient id="deliveryRouteFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.05)" />
            <stop offset="45%" stopColor="rgba(59,130,246,0.76)" />
            <stop offset="70%" stopColor="rgba(125,211,252,0.62)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.05)" />
          </linearGradient>
        </defs>

        {routePath ? (
          <>
            <path className="delivery-stream-route-base" d={routePath} fill="none" stroke="url(#deliveryRouteBase)" />
            <path className="delivery-stream-route-flow" d={routePath} fill="none" stroke="url(#deliveryRouteFlow)" />
            <path className="delivery-stream-route-signal" d={routePath} fill="none" />
          </>
        ) : null}

        {previousSegmentPath ? <path className="delivery-stream-route-prev" d={previousSegmentPath} fill="none" /> : null}

        {liveSegmentPath ? (
          <path
            key={`${focusIndex}-${nextIndex}`}
            className="delivery-stream-route-live"
            d={liveSegmentPath}
            fill="none"
          />
        ) : null}

        {points.map((point, index) => (
          <circle
            key={`beacon-${index + 1}`}
            className="delivery-stream-beacon"
            cx={point.x}
            cy={point.y}
            r="2.8"
            style={{ animationDelay: `${index * 220}ms` }}
          />
        ))}
      </svg>

      {routeStyle ? (
        <div className="delivery-stream-travellers" style={routeStyle} aria-hidden="true">
          <span className="delivery-stream-pulse delivery-stream-pulse-main" />
          <span className="delivery-stream-pulse delivery-stream-pulse-packet-a" />
          <span className="delivery-stream-pulse delivery-stream-pulse-packet-b" />
          <span className="delivery-stream-pulse delivery-stream-pulse-packet-c" />
        </div>
      ) : null}

      <ol className="delivery-stream-grid" aria-label="Engineering stages">
        {steps.map((step, index) => (
          <li
            key={step.id}
            ref={(node) => {
              nodeRefs.current[index] = node;
            }}
            className="delivery-stream-station"
            data-active={index === focusIndex ? "true" : "false"}
            tabIndex={0}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            aria-label={`${String(step.id).padStart(2, "0")} ${step.title}`}
          >
            <span className="delivery-stream-step">{String(step.id).padStart(2, "0")}</span>
            <span className="delivery-stream-label">{step.title}</span>
          </li>
        ))}
      </ol>

      <span className="delivery-stream-bg-dot delivery-stream-bg-dot-a" aria-hidden="true" />
      <span className="delivery-stream-bg-dot delivery-stream-bg-dot-b" aria-hidden="true" />
      <span className="delivery-stream-bg-dot delivery-stream-bg-dot-c" aria-hidden="true" />
      <span className="delivery-stream-bg-dot delivery-stream-bg-dot-d" aria-hidden="true" />
    </div>
  );
}
