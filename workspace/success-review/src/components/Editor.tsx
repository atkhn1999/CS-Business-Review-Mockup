import React, { useRef } from 'react'
import { useSuccessPlanStore } from '../store'
import { useReactToPrint } from 'react-to-print'
import { SlidesDeck } from './Slides'
import SlideList from './SlideList'
import { exportPlanToJson, importPlanFromFile, exportSlidesToPdf, exportSlidesToPptx } from '../utils/exporters'

export default function Editor() {
  const { plan, updateField, addTeamMember, addStakeholder, addObjective, addHistoryItem, addValueItem } = useSuccessPlanStore()
  const deckRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({ content: () => deckRef.current })

  async function handleImportJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const data = await importPlanFromFile(file)
    useSuccessPlanStore.getState().setPlan(data)
  }

  async function handleExportPdf() {
    if (!deckRef.current) return
    const slides = Array.from(deckRef.current.querySelectorAll('[data-slide]')) as HTMLElement[]
    await exportSlidesToPdf(slides, 'success-review.pdf')
  }

  async function handleExportPptx() {
    if (!deckRef.current) return
    const slides = Array.from(deckRef.current.querySelectorAll('[data-slide]')) as HTMLElement[]
    await exportSlidesToPptx(slides, 'success-review.pptx')
  }

  return (
    <div className="min-h-screen bg-light-bg text-ink font-inter">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-teal-500" />
            <div>
              <div className="font-bold">Receptive AI Success Review</div>
              <div className="text-xs text-text-secondary">Editable slide deck</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => exportPlanToJson(plan, 'success-plan.json')} className="px-3 py-2 rounded-md bg-slate-900 text-white text-sm">Export JSON</button>
            <label className="px-3 py-2 rounded-md bg-slate-100 text-slate-900 text-sm cursor-pointer">
              Import JSON
              <input onChange={handleImportJson} type="file" accept="application/json" className="hidden" />
            </label>
            <button onClick={handleExportPdf} className="px-3 py-2 rounded-md bg-teal-600 text-white text-sm">Export PDF</button>
            <button onClick={handleExportPptx} className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm">Export PPTX</button>
            <button onClick={handlePrint} className="px-3 py-2 rounded-md border text-sm">Print</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        <section className="col-span-4 space-y-6">
          <div className="bg-white border rounded-lg shadow-sm p-4">
            <div className="font-semibold mb-3">Account</div>
            <div className="space-y-2">
              <input value={plan.accountName} onChange={e => updateField('accountName', e.target.value)} placeholder="Account (your company)" className="text-zone" />
              <input value={plan.customerName} onChange={e => updateField('customerName', e.target.value)} placeholder="Customer Company" className="text-zone" />
              <textarea value={plan.missionStatement} onChange={e => updateField('missionStatement', e.target.value)} placeholder="Mission statement" className="text-zone text-area" />
            </div>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4">
            <div className="font-semibold mb-3">Long-term Goals</div>
            <GoalEditor />
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4">
            <SlideList />
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4">
            <div className="font-semibold mb-3">Quick Add</div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => addTeamMember({ name: 'New Member', role: 'CSM' })} className="px-3 py-2 rounded bg-slate-100">Team</button>
              <button onClick={() => addStakeholder({ name: 'New Stakeholder', role: 'VP' })} className="px-3 py-2 rounded bg-slate-100">Stakeholder</button>
              <button onClick={() => addObjective({ title: 'New Objective', timeframe: 'short', kpis: [] })} className="px-3 py-2 rounded bg-slate-100">Objective</button>
              <button onClick={() => addHistoryItem({ dateIso: new Date().toISOString(), objectiveTitle: 'Demo', summary: 'Completed' })} className="px-3 py-2 rounded bg-slate-100">History</button>
              <button onClick={() => addValueItem({ title: 'Value', description: 'Benefit', impact: 'Time saved' })} className="px-3 py-2 rounded bg-slate-100">Value</button>
            </div>
          </div>
        </section>

        <section className="col-span-8">
          <div ref={deckRef} className="space-y-8">
            {useSuccessPlanStore.getState().plan.slides.map(slide => (
              <div key={slide.id} data-slide>
                {/* marker for exporters to find slides */}
                <SlidesSingle slideId={slide.id} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function SlidesSingle({ slideId }: { slideId: string }) {
  const slide = useSuccessPlanStore(s => s.plan.slides.find(sl => sl.id === slideId))
  if (!slide) return null
  return (
    <div className="flex justify-center">
      <div className="scale-[0.85] origin-top">
        {/* re-use the same renderer used in deck mode */}
        <SlidesDeckWrapper slides={[slideId]} />
      </div>
    </div>
  )
}

function SlidesDeckWrapper({ slides }: { slides: string[] }) {
  const planSlides = useSuccessPlanStore(s => s.plan.slides)
  return (
    <div className="space-y-8">
      {slides.map(id => {
        const slide = planSlides.find(s => s.id === id)
        if (!slide) return null
        return (
          <div key={id} className="[&>*]:mx-auto">
            <div className="mx-auto">
              <div className="w-[1280px]">
                <div className="w-[1280px] h-[720px]">
                  {/* data-slide wrapper added here for exporters */}
                  <div data-slide>
                    <SlidesDeckSingle slide={slide} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SlidesDeckSingle({ slide }: { slide: any }) {
  // simple proxy to reuse render function
  const { renderSlide } = require('./Slides')
  const Component = renderSlide(slide)
  return (
    <div className="mx-auto">
      <div className="w-[1280px] h-[720px] bg-white rounded-xl border shadow">
        {Component}
      </div>
    </div>
  )
}

function GoalEditor() {
  const goals = useSuccessPlanStore(s => s.plan.longTermGoals)
  const updateField = useSuccessPlanStore(s => s.updateField)
  function addGoal() {
    updateField('longTermGoals', [...goals, ''])
  }
  function updateGoal(idx: number, value: string) {
    const copy = [...goals]
    copy[idx] = value
    updateField('longTermGoals', copy)
  }
  function removeGoal(idx: number) {
    const copy = goals.filter((_, i) => i !== idx)
    updateField('longTermGoals', copy)
  }
  return (
    <div className="space-y-2">
      {goals.map((g, i) => (
        <div key={i} className="flex items-center gap-2">
          <input value={g} onChange={e => updateGoal(i, e.target.value)} className="text-zone flex-1" />
          <button onClick={() => removeGoal(i)} className="px-2 py-2 rounded bg-red-50 text-red-600">✕</button>
        </div>
      ))}
      <button onClick={addGoal} className="px-3 py-2 rounded bg-slate-100">Add Goal</button>
    </div>
  )
}

