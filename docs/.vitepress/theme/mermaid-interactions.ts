const MIN_SCALE = 0.5
const MAX_SCALE = 3
const SCALE_STEP = 0.25

interface DiagramState {
  scale: number
  baseWidth: number
  svg: SVGSVGElement | null
  viewport: HTMLDivElement | null
  toolbar: HTMLDivElement | null
  zoomLabel: HTMLOutputElement | null
  dragging: boolean
  pointerId: number | null
  startX: number
  startY: number
  startScrollLeft: number
  startScrollTop: number
}

const diagramStates = new WeakMap<HTMLElement, DiagramState>()

function createButton(label: string, text: string, action: () => void) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'mermaid-control'
  button.setAttribute('aria-label', label)
  button.title = label
  button.textContent = text
  button.addEventListener('click', action)
  return button
}

function clampScale(scale: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale))
}

function applyScale(container: HTMLElement, state: DiagramState, scale: number) {
  if (!state.svg) return

  state.scale = clampScale(scale)
  state.svg.style.width = `${state.baseWidth * state.scale}px`
  state.svg.style.minWidth = '0'
  state.svg.style.maxWidth = 'none'
  state.svg.style.height = 'auto'
  container.classList.toggle('is-zoomed', state.scale > 1)

  if (state.zoomLabel) {
    const nextLabel = `${Math.round(state.scale * 100)}%`
    if (state.zoomLabel.value !== nextLabel) state.zoomLabel.value = nextLabel
    if (state.zoomLabel.textContent !== nextLabel) state.zoomLabel.textContent = nextLabel
  }
}

function changeScale(
  container: HTMLElement,
  state: DiagramState,
  nextScale: number,
  focusX = state.viewport?.clientWidth ? state.viewport.clientWidth / 2 : container.clientWidth / 2,
  focusY = state.viewport?.clientHeight ? state.viewport.clientHeight / 2 : container.clientHeight / 2,
) {
  const viewport = state.viewport
  if (!viewport) return

  const previousScale = state.scale
  const clampedScale = clampScale(nextScale)
  if (clampedScale === previousScale) return

  applyScale(container, state, clampedScale)

  const ratio = clampedScale / previousScale
  viewport.scrollLeft = (viewport.scrollLeft + focusX) * ratio - focusX
  viewport.scrollTop = (viewport.scrollTop + focusY) * ratio - focusY
}

function resetDiagram(container: HTMLElement, state: DiagramState) {
  applyScale(container, state, 1)
  state.viewport?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

function ensureViewport(container: HTMLElement, state: DiagramState) {
  if (state.viewport?.isConnected) return

  const viewport = document.createElement('div')
  viewport.className = 'mermaid-viewport'

  Array.from(container.childNodes).forEach((node) => {
    if (node !== state.toolbar) viewport.append(node)
  })

  state.viewport = viewport
  container.append(viewport)
}

function ensureToolbar(container: HTMLElement, state: DiagramState) {
  if (state.toolbar?.isConnected) return

  const toolbar = document.createElement('div')
  toolbar.className = 'mermaid-toolbar'
  toolbar.setAttribute('role', 'toolbar')
  toolbar.setAttribute('aria-label', '图表缩放工具')

  toolbar.append(
    createButton('缩小图表', '−', () => changeScale(container, state, state.scale - SCALE_STEP)),
  )

  const zoomLabel = document.createElement('output')
  zoomLabel.className = 'mermaid-zoom-label'
  zoomLabel.setAttribute('aria-live', 'polite')
  zoomLabel.value = `${Math.round(state.scale * 100)}%`
  zoomLabel.textContent = zoomLabel.value
  toolbar.append(zoomLabel)

  toolbar.append(
    createButton('放大图表', '+', () => changeScale(container, state, state.scale + SCALE_STEP)),
    createButton('重置图表', '↺', () => resetDiagram(container, state)),
  )

  state.toolbar = toolbar
  state.zoomLabel = zoomLabel
  container.insertBefore(toolbar, container.firstChild)
}

function attachInteractions(container: HTMLElement, state: DiagramState) {
  container.tabIndex = 0
  container.setAttribute('role', 'region')
  container.setAttribute('aria-label', '可缩放、可拖拽的 Mermaid 图表')

  container.addEventListener('wheel', (event) => {
    if (!event.ctrlKey && !event.metaKey) return
    event.preventDefault()

    const bounds = state.viewport?.getBoundingClientRect() ?? container.getBoundingClientRect()
    const focusX = event.clientX - bounds.left
    const focusY = event.clientY - bounds.top
    changeScale(
      container,
      state,
      state.scale + (event.deltaY < 0 ? SCALE_STEP : -SCALE_STEP),
      focusX,
      focusY,
    )
  }, { passive: false })

  container.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || (event.target as Element).closest('.mermaid-toolbar')) return

    state.dragging = true
    state.pointerId = event.pointerId
    state.startX = event.clientX
    state.startY = event.clientY
    state.startScrollLeft = state.viewport?.scrollLeft ?? 0
    state.startScrollTop = state.viewport?.scrollTop ?? 0
    container.classList.add('is-dragging')
    container.setPointerCapture(event.pointerId)
  })

  container.addEventListener('pointermove', (event) => {
    if (!state.dragging || state.pointerId !== event.pointerId || !state.viewport) return
    state.viewport.scrollLeft = state.startScrollLeft - (event.clientX - state.startX)
    state.viewport.scrollTop = state.startScrollTop - (event.clientY - state.startY)
  })

  const stopDragging = (event: PointerEvent) => {
    if (state.pointerId !== event.pointerId) return
    state.dragging = false
    state.pointerId = null
    container.classList.remove('is-dragging')
    if (container.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId)
    }
  }

  container.addEventListener('pointerup', stopDragging)
  container.addEventListener('pointercancel', stopDragging)

  container.addEventListener('keydown', (event) => {
    const panDistance = 48

    if (event.key === '+' || event.key === '=') {
      event.preventDefault()
      changeScale(container, state, state.scale + SCALE_STEP)
    } else if (event.key === '-') {
      event.preventDefault()
      changeScale(container, state, state.scale - SCALE_STEP)
    } else if (event.key === '0') {
      event.preventDefault()
      resetDiagram(container, state)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      state.viewport?.scrollBy({ left: -panDistance, behavior: 'smooth' })
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      state.viewport?.scrollBy({ left: panDistance, behavior: 'smooth' })
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      state.viewport?.scrollBy({ top: -panDistance, behavior: 'smooth' })
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      state.viewport?.scrollBy({ top: panDistance, behavior: 'smooth' })
    }
  })
}

function enhanceDiagram(container: HTMLElement) {
  const svg = container.querySelector<SVGSVGElement>('svg')
  if (!svg) return

  let state = diagramStates.get(container)
  if (!state) {
    state = {
      scale: 1,
      baseWidth: svg.getBoundingClientRect().width || svg.viewBox.baseVal.width || 640,
      svg,
      viewport: null,
      toolbar: null,
      zoomLabel: null,
      dragging: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      startScrollLeft: 0,
      startScrollTop: 0,
    }
    diagramStates.set(container, state)
    attachInteractions(container, state)
  } else if (state.svg !== svg) {
    state.svg = svg
    state.baseWidth = svg.getBoundingClientRect().width || svg.viewBox.baseVal.width || state.baseWidth
  }

  ensureViewport(container, state)
  ensureToolbar(container, state)
  applyScale(container, state, state.scale)
}

function scanDiagrams() {
  document.querySelectorAll<HTMLElement>('.mermaid-diagram').forEach(enhanceDiagram)
}

export function installMermaidInteractions() {
  if (typeof document === 'undefined') return

  scanDiagrams()
  const observer = new MutationObserver(scanDiagrams)
  observer.observe(document.documentElement, { childList: true, subtree: true })
}
