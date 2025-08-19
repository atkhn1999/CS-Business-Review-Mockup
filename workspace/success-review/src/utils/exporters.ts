import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import PptxGenJS from 'pptxgenjs'
import type { SuccessPlanData } from '../types'

export async function exportElementToPdf(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, { backgroundColor: '#ffffff', scale: 2 })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] })
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
  pdf.save(filename)
}

export async function exportSlidesToPdf(slideElements: HTMLElement[], filename: string) {
  if (slideElements.length === 0) return
  const firstCanvas = await html2canvas(slideElements[0], { backgroundColor: '#ffffff', scale: 2 })
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [firstCanvas.width, firstCanvas.height] })
  pdf.addImage(firstCanvas.toDataURL('image/png'), 'PNG', 0, 0, firstCanvas.width, firstCanvas.height)
  for (let i = 1; i < slideElements.length; i++) {
    const canvas = await html2canvas(slideElements[i], { backgroundColor: '#ffffff', scale: 2 })
    pdf.addPage([canvas.width, canvas.height], 'landscape')
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height)
  }
  pdf.save(filename)
}

export async function exportSlidesToPptx(slideElements: HTMLElement[], filename: string) {
  const pptx = new PptxGenJS()
  pptx.layout = 'LAYOUT_16x9'
  for (const el of slideElements) {
    const canvas = await html2canvas(el, { backgroundColor: '#ffffff', scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const slide = pptx.addSlide()
    slide.addImage({ data: imgData, x: 0, y: 0, w: 10, h: 5.625 })
  }
  await pptx.writeFile({ fileName: filename })
}

export function exportPlanToJson(plan: SuccessPlanData, filename: string) {
  const blob = new Blob([JSON.stringify({ version: 1, exportedAtIso: new Date().toISOString(), data: plan }, null, 2)], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

export async function importPlanFromFile(file: File): Promise<SuccessPlanData> {
  const text = await file.text()
  const parsed = JSON.parse(text)
  return parsed.data ?? parsed
}

