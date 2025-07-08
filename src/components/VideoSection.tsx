import { useEffect, useRef } from "react"

import { guideVideoUrl } from "@/app/config"

export const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100")
          entry.target.classList.remove("opacity-0", "translate-y-10")
        }
      },
      {
        threshold: 0.1
      }
    )

    const ref = sectionRef.current

    if (ref) {
      observer.observe(ref)
    }

    return () => {
      if (ref) {
        observer.unobserve(ref)
      }
    }
  }, [])

  return (
    <div ref={sectionRef} className="relative transition-all duration-700 opacity-0 translate-y-10">
      <div className="rounded-2xl overflow-hidden shadow-xl h-[720px] max-md:h-[200px]">
        <iframe width="100%" height="100%" src={guideVideoUrl}></iframe>
      </div>
    </div>
  )
}

export default VideoSection
