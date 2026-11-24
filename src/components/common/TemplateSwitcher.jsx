import React, { useState } from 'react';
import { Layers, Check, ChevronUp, ChevronDown } from 'lucide-react';

const templates = [
  {
    id: 1,
    name: 'Template 1',
    label: 'Sovereign Diplomatic',
    description: 'Fixed cinematic scroll, deep navy & parchment contrast, vertical services slider',
    accent: '#9D2933',
  },
  {
    id: 2,
    name: 'Template 2',
    label: 'Heritage Editorial',
    description: 'Maroon & forest-green editorial, 3D pop-out portrait hero, rounded card grids',
    accent: '#B48B44',
  },
  {
    id: 3,
    name: 'Template 3',
    label: 'Sovereign Editorial',
    description: 'Template 2 layout in Template 1 palette (Navy, Crimson & Gold) with Light & Dark modes',
    accent: '#9D2933',
  },
];

export default function TemplateSwitcher({ activeTemplate, onSelectTemplate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      aria-label="Template Preview Switcher"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden select-none"
    >
      {/* Expanded Selection Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#0C1B26] text-[#FBFAF5] border border-[#FBFAF5]/20 rounded-lg shadow-2xl p-4 backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between border-b border-[#FBFAF5]/10 pb-3 mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B48B44]">
              <Layers className="w-4 h-4" />
              <span>Live Template Switcher</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#FBFAF5]/50 hover:text-[#FBFAF5] text-xs p-1 cursor-pointer"
              title="Close panel"
            >
              ✕
            </button>
          </div>

          <p className="text-[0.75rem] text-[#FBFAF5]/60 mb-3 font-light">
            Toggle between templates to present to Louis Dumas. All templates consume the same live data store.
          </p>

          <div className="space-y-2">
            {templates.map((tpl) => {
              const isSelected = activeTemplate === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => {
                    onSelectTemplate(tpl.id);
                  }}
                  className={`w-full text-left p-2.5 rounded transition-all flex items-start justify-between cursor-pointer border ${
                    isSelected
                      ? 'bg-[#FBFAF5]/10 border-[#B48B44] text-[#FBFAF5]'
                      : 'hover:bg-[#FBFAF5]/5 border-transparent text-[#FBFAF5]/70 hover:text-[#FBFAF5]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-[#B48B44]">
                        {tpl.name}
                      </span>
                      <span className="text-sm font-serif font-semibold">{tpl.label}</span>
                    </div>
                    <div className="text-[0.7rem] text-[#FBFAF5]/50 mt-0.5 font-light leading-snug">
                      {tpl.description}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#B48B44] shrink-0 mt-1" />}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-[#FBFAF5]/10 flex items-center justify-between text-[0.68rem] text-[#FBFAF5]/40 font-mono">
            <span>Shortcut: Press 1, 2, or 3</span>
            <span className="text-[#B48B44]">URL: ?template={activeTemplate}</span>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <div className="flex items-center gap-1 bg-[#0C1B26]/95 border border-[#FBFAF5]/20 rounded-full shadow-xl px-2 py-1.5 backdrop-blur-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#FBFAF5] hover:text-[#B48B44] transition-colors cursor-pointer"
          title="Switch Template Design"
        >
          <Layers className="w-4 h-4 text-[#B48B44]" />
          <span className="font-serif">Template {activeTemplate}</span>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 opacity-60" />
          )}
        </button>

        {/* Quick inline 1 / 2 / 3 buttons */}
        <div className="flex items-center border-l border-[#FBFAF5]/15 pl-1 pr-1 gap-1">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => onSelectTemplate(num)}
              className={`w-7 h-7 rounded-full text-xs font-medium transition-all flex items-center justify-center cursor-pointer ${
                activeTemplate === num
                  ? 'bg-[#B48B44] text-[#0C1B26] font-bold shadow'
                  : 'text-[#FBFAF5]/60 hover:text-[#FBFAF5] hover:bg-[#FBFAF5]/10'
              }`}
              title={`Switch to Template ${num}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
