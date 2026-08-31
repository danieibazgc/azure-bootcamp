import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2, User, Camera, Sparkles } from 'lucide-react'
import { typography } from '../constants/designTokens'

const TEMPLATE_SRC = '/images/plantilla-pase.png'
const CANVAS_W = 3375
const CANVAS_H = 4219

// Posición y tamaño del círculo de foto (porcentajes relativos al canvas)
const PHOTO_CENTER_X = 0.50
const PHOTO_CENTER_Y = 0.496
const PHOTO_RADIUS = 0.20
const PHOTO_BORDER_WIDTH = 35

// Configuración del pill de nombre
const NAME_PILL_HEIGHT = 222
const NAME_PILL_Y = 0.721
const NAME_FONT_SIZE = 145
const NAME_PILL_PADDING = 160

function TicketGenerator() {
  const [name, setName] = useState('')
  const [photoPreview, setPhotoPreview] = useState(null)
  const [photoImg, setPhotoImg] = useState(null)
  const [templateImg, setTemplateImg] = useState(null)
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)

  // Precargar la plantilla al montar
  useEffect(() => {
    const img = new Image()
    img.onload = () => setTemplateImg(img)
    img.src = TEMPLATE_SRC
  }, [])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      setPhotoPreview(ev.target.result)
      const img = new Image()
      img.onload = () => setPhotoImg(img)
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const drawTicket = useCallback(
    (ctx, canvas) => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // Dibujar plantilla de fondo
      if (templateImg) {
        ctx.drawImage(templateImg, 0, 0, w, h)
      }

      // Dibujar foto del usuario en círculo (o avatar placeholder)
      const cx = w * PHOTO_CENTER_X
      const cy = h * PHOTO_CENTER_Y
      const r = w * PHOTO_RADIUS

      if (photoImg) {
        // Recortar la foto en forma circular
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.clip()

        // Calcular recorte cuadrado centrado de la foto original
        const { width: imgW, height: imgH } = photoImg
        const side = Math.min(imgW, imgH)
        const sx = (imgW - side) / 2
        const sy = (imgH - side) / 2

        ctx.drawImage(photoImg, sx, sy, side, side, cx - r, cy - r, r * 2, r * 2)
        ctx.restore()
      } else {
        // --- Avatar placeholder premium ---
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.clip()

        // Fondo con gradiente radial sutil
        const bgGrad = ctx.createRadialGradient(cx, cy - r * 0.3, 0, cx, cy, r * 1.1)
        bgGrad.addColorStop(0, 'rgba(60, 50, 80, 0.92)')
        bgGrad.addColorStop(0.6, 'rgba(35, 30, 55, 0.95)')
        bgGrad.addColorStop(1, 'rgba(18, 15, 30, 0.98)')
        ctx.fillStyle = bgGrad
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2)

        // Silueta — gradiente blanco suave
        const silGrad = ctx.createLinearGradient(cx, cy - r * 0.6, cx, cy + r * 0.95)
        silGrad.addColorStop(0, 'rgba(255,255,255,0.38)')
        silGrad.addColorStop(1, 'rgba(255,255,255,0.18)')
        ctx.fillStyle = silGrad

        // Cabeza — proporción natural
        const headR = r * 0.24
        const headCY = cy - r * 0.22
        ctx.beginPath()
        ctx.arc(cx, headCY, headR, 0, Math.PI * 2)
        ctx.fill()

        // Cuello
        const neckW = headR * 0.55
        const neckTop = headCY + headR * 0.85
        const neckBot = headCY + headR * 1.45
        ctx.beginPath()
        ctx.moveTo(cx - neckW, neckTop)
        ctx.lineTo(cx - neckW, neckBot)
        ctx.lineTo(cx + neckW, neckBot)
        ctx.lineTo(cx + neckW, neckTop)
        ctx.fill()

        // Hombros y torso — curva suave tipo campana
        const shoulderW = r * 0.78
        const shoulderY = cy + r * 0.18
        const torsoBot = cy + r * 1.1
        ctx.beginPath()
        ctx.moveTo(cx - shoulderW, torsoBot)
        ctx.quadraticCurveTo(cx - shoulderW, shoulderY, cx - neckW, neckBot)
        ctx.lineTo(cx + neckW, neckBot)
        ctx.quadraticCurveTo(cx + shoulderW, shoulderY, cx + shoulderW, torsoBot)
        ctx.lineTo(cx - shoulderW, torsoBot)
        ctx.fill()

        ctx.restore()

        // Anillo punteado interior como guía visual
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, r * 0.92, 0, Math.PI * 2)
        ctx.setLineDash([r * 0.06, r * 0.06])
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'
        ctx.lineWidth = r * 0.015
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()

        // Ícono de cámara pequeño debajo de la silueta
        ctx.save()
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const iconSize = r * 0.16
        const iconY = cy + r * 0.62
        // Cuerpo de la cámara
        const camW = iconSize * 1.4
        const camH = iconSize * 0.9
        const camX = cx - camW / 2
        const camY2 = iconY - camH / 2
        ctx.fillStyle = 'rgba(255,255,255,0.25)'
        ctx.beginPath()
        ctx.roundRect(camX, camY2, camW, camH, iconSize * 0.15)
        ctx.fill()
        // Lente
        ctx.beginPath()
        ctx.arc(cx, iconY, iconSize * 0.28, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,255,255,0.45)'
        ctx.lineWidth = iconSize * 0.09
        ctx.stroke()
        // Flash (rectángulo superior)
        const flashW = camW * 0.25
        const flashH = camH * 0.2
        ctx.fillStyle = 'rgba(255,255,255,0.25)'
        ctx.fillRect(cx - flashW * 0.1, camY2 - flashH, flashW, flashH)
        ctx.restore()
      }

      // Borde blanco alrededor del círculo (siempre visible)
      ctx.beginPath()
      ctx.arc(cx, cy, r + PHOTO_BORDER_WIDTH / 2, 0, Math.PI * 2)
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = PHOTO_BORDER_WIDTH
      ctx.stroke()

      // Dibujar nombre en pill
      const pillY = h * NAME_PILL_Y
      const displayName = name || 'Tu Nombre'

      ctx.font = `bold ${NAME_FONT_SIZE}px Outfit, sans-serif`
      ctx.textAlign = 'center'

      const metrics = ctx.measureText(displayName)
      const textWidth = metrics.width + NAME_PILL_PADDING
      const pillX = (w - textWidth) / 2

      // Fondo blanco redondeado
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.roundRect(pillX, pillY - NAME_PILL_HEIGHT / 2, textWidth, NAME_PILL_HEIGHT, NAME_PILL_HEIGHT / 2)
      ctx.fill()

      // Texto negro con centrado vertical matemático exacto
      ctx.fillStyle = '#000000'
      ctx.textBaseline = 'alphabetic'
      // Calcula el centro midiendo la distancia real desde la línea base hasta la parte superior de las letras
      const yOffset = (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2
      ctx.fillText(displayName, w / 2, pillY + yOffset)
    },
    [name, photoImg, templateImg],
  )

  // Redibujar canvas cuando cambian los datos
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      drawTicket(ctx, canvasRef.current)
    }
  }, [drawTicket])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.download = 'pase-flisol-utp-2026.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  const handleShare = () => {
    handleDownload()

    alert('¡Imagen descargada! En LinkedIn, adjunta tu imagen.')

    const shareText = `Este 25 de abril asistiré al FLISoL UTP 2026...`
    const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`
    window.open(linkedinUrl, '_blank')
  }

  return (
    <section id="generar-pase">
      {/* ... UI del generador de credencial ... */}
    </section>
  )
}

export default TicketGenerator