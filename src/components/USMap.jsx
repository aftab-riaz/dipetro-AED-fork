import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import USMapSVG from "../assets/us-map.svg?react";
import { StatesContext } from "../context/StatesContext.jsx";

const USMap = () => {
  const { states } = useContext(StatesContext);
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltip, setTooltip] = useState({ name: "", x: 0, y: 0 });
  const [labelPositions, setLabelPositions] = useState([]);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!svgRef.current || !states.length) return;

    const svg = svgRef.current;
    const paths = svg.querySelectorAll("path[id]");
    if (!paths.length) return;

    const svgRect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;

    const positions = Array.from(paths).map((path) => {
      const id = path.getAttribute("id");
      const rect = path.getBoundingClientRect();
      const cx = ((rect.left + rect.width / 2 - svgRect.left) / svgRect.width) * vb.width;
      const cy = ((rect.top + rect.height / 2 - svgRect.top) / svgRect.height) * vb.height;
      return { id, x: cx, y: cy };
    });

    setLabelPositions(positions);
  }, [states]);

  const handleMouseEnter = (e) => {
    const id = e.target.id;
    const state = states.find((s) => s.abbreviation === id || s.name === id);
    if (state) setHoveredState(state);
  };

  const handleMouseMove = (e) => {
    if (!hoveredState || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltip({
      name: hoveredState.name,
      x: e.clientX - rect.left + 12,
      y: e.clientY - rect.top - 10,
    });
  };

  const handleMouseLeave = () => setHoveredState(null);

  const handleClick = (e) => {
    const id = e.target.id;
    const state = states.find((s) => s.abbreviation === id || s.name === id);
    if (state) navigate(`/aed-laws/${state.slug}`);
  };

  if (!states.length) {
    return (
      <div className="w-full py-20 flex justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-[#111686] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative flex justify-center items-center bg-transparent overflow-visible py-12 px-8">
     <div
        className="relative w-full max-w-[1500px] -translate-x-10 sm:-translate-x-16 md:-translate-x-20 lg:-translate-x-28"
        style={{
          transformOrigin: "center",
          scale: "1.25", // ❗ same size you already had
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 959 593"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          style={{ cursor: "pointer" }}
          onMouseLeave={handleMouseLeave}
        >
          <USMapSVG
            className="w-full h-auto"
            onMouseOver={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          />

          {/* Styles */}
          <style>{`
            path {
              fill: #d6dcea !important;
              transition: fill 0.25s ease;
              stroke: #fff;
              stroke-width: 1;
            }
            path:hover {
              fill: #111686 !important;
            }
          `}</style>

          {/* Labels — SAME SIZE AS BEFORE */}
          {labelPositions.map((pos) => {
            const st = states.find(
              (s) => s.abbreviation === pos.id || s.name === pos.id
            );
            if (!st) return null;

            const isHovered = hoveredState?.abbreviation === st.abbreviation;

            return (
              <text
                key={pos.id}
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                fontSize="7"          // ← SAME VALUE
                fill={isHovered ? "#ffffff" : "#4a3e39"}
                fontWeight="600"
                pointerEvents="none"
              >
                {st.abbreviation}
              </text>
            );
          })}
        </svg>

        {/* Tooltip — SAME SIZE & POSITION AS BEFORE */}
        {hoveredState && (
          <div
            className="fixed z-50 bg-white text-black border border-black px-2 py-1 rounded text-xs pointer-events-none"
            style={{
              top: tooltip.y,
              left: tooltip.x,
              transform: "translate(-50%, -100%)",
              whiteSpace: "nowrap",
            }}
          >
            {hoveredState.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default USMap;
