"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Flag,
  MoreVertical,
  SkipBack,
  SkipForward,
  Settings,
} from "lucide-react"

interface VideoPlayerProps {
  video: any
  onBack: () => void
  onAuthorClick: (authorId: number) => void
  onLike: (videoId: number) => void
  onShare: (video: any) => void
  isLiked: boolean
}

export default function VideoPlayer({ video, onBack, onAuthorClick, onLike, onShare, isLiked }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newTime = value[0]
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!isFullscreen) {
      container.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
  }

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const showControlsTemporarily = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  const handleVideoClick = () => {
    togglePlay()
    showControlsTemporarily()
  }

  const handleMouseMove = () => {
    showControlsTemporarily()
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain cursor-pointer"
        onClick={handleVideoClick}
        poster={video.thumbnail}
        preload="metadata"
      >
        <source src={video.videoUrl} type="video/mp4" />
        Браузеріңіз видеоны қолдамайды.
      </video>

      {/* Top Controls */}
      <div
        className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Center Play Button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button size="lg" onClick={togglePlay} className="bg-white/20 hover:bg-white/30 rounded-full w-20 h-20 p-0">
            <Play className="w-8 h-8 text-white ml-1" />
          </Button>
        </div>
      )}

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        {/* Progress Bar */}
        <div className="mb-4">
          <Slider value={[currentTime]} max={duration} step={1} onValueChange={handleSeek} className="w-full" />
          <div className="flex justify-between text-white text-sm mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => skip(-10)} className="text-white hover:bg-white/20">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => skip(10)} className="text-white hover:bg-white/20">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            {/* Volume */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <div className="w-20">
                <Slider value={[isMuted ? 0 : volume]} max={1} step={0.1} onValueChange={handleVolumeChange} />
              </div>
            </div>

            {/* Playback Speed */}
            <div className="flex items-center space-x-1">
              {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                <Button
                  key={rate}
                  variant="ghost"
                  size="sm"
                  onClick={() => changePlaybackRate(rate)}
                  className={`text-white hover:bg-white/20 text-xs px-2 ${playbackRate === rate ? "bg-white/20" : ""}`}
                >
                  {rate}x
                </Button>
              ))}
            </div>

            <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Video Info Overlay */}
      <div
        className={`absolute bottom-20 left-4 right-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <Card className="bg-black/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-4">
            {/* Author Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onAuthorClick(video.authorId)}>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={video.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{video.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-medium">{video.author}</h3>
                  <p className="text-gray-400 text-sm">{video.uploadDate}</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-cyan-600 text-white">
                {video.category}
              </Badge>
            </div>

            {/* Title & Description */}
            <h2 className="text-white text-lg font-semibold mb-2">{video.title}</h2>
            <p className="text-gray-300 text-sm mb-3">{video.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {video.tags?.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="border-gray-600 text-gray-400">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLike(video.id)}
                  className={`text-white hover:bg-white/20 ${isLiked ? "text-red-400" : ""}`}
                >
                  <Heart className={`w-5 h-5 mr-1 ${isLiked ? "fill-current" : ""}`} />
                  {video.likes.toLocaleString()}
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  {video.comments || 0}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onShare(video)}
                  className="text-white hover:bg-white/20"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Download className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Flag className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
              <span className="text-gray-400 text-sm">{video.views?.toLocaleString()} көрулер</span>
              <span className="text-gray-400 text-sm">{video.duration}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
