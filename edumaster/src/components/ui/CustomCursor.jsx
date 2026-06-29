import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return

    const dot = document.createElement('div')
    dot.className = 'cursor-dot'
    const ring = document.createElement('div')
    ring.className = 'cursor-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)
    dotRef.current = dot
    ringRef.current = ring

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onDown = () => ringRef.current?.classList.add('clicking')
    const onUp = () => ringRef.current?.classList.remove('clicking')

    const onEnterInteractive = () => ringRef.current?.classList.add('hovering')
    const onLeaveInteractive = () => ringRef.current?.classList.remove('hovering')

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15

      dot.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`
      ring.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`
      raf.current = requestAnimationFrame(tick)
    }

    const interactives = 'a, button, input, textarea, select, [role="button"], [data-cursor]'

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.querySelectorAll(interactives).forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    raf.current = requestAnimationFrame(tick)

    const observer = new MutationObserver(() => {
      document.querySelectorAll(interactives).forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf.current)
      observer.disconnect()
      dot.remove()
      ring.remove()
    }
  }, [])

  return null
}
