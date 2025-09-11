"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, MessageCircle, Phone, Video, MoreVertical, Pin } from "lucide-react"

interface MessagesListProps {
  onBack: () => void
}

export default function MessagesList({ onBack }: MessagesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  const chats = [
    {
      id: 1,
      name: "Айгерим К.",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Той фотосессиясы туралы сұрағым бар. Қашан кездесе аламыз?",
      time: "5 мин бұрын",
      unread: 3,
      online: true,
      type: "client",
      pinned: true,
    },
    {
      id: 2,
      name: "ТОО Алтын",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Видео жұмысы керемет шықты! Төлемді жіберіп жатырмын.",
      time: "1 сағат бұрын",
      unread: 0,
      online: false,
      type: "client",
      pinned: false,
    },
    {
      id: 3,
      name: "Beauty Studio",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Келесі ай үшін контент жоспары дайын ма?",
      time: "3 сағат бұрын",
      unread: 1,
      online: true,
      type: "client",
      pinned: false,
    },
    {
      id: 4,
      name: "Нұрлан Б.",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Рахмет! Барлық фотолар өте әдемі шықты 👏",
      time: "1 күн бұрын",
      unread: 0,
      online: false,
      type: "client",
      pinned: false,
    },
    {
      id: 5,
      name: "Digital Agency",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "SMM контент жобасы бойынша кездесейік",
      time: "2 күн бұрын",
      unread: 0,
      online: true,
      type: "client",
      pinned: false,
    },
  ]

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pinnedChats = filteredChats.filter((chat) => chat.pinned)
  const regularChats = filteredChats.filter((chat) => !chat.pinned)

  const handleChatClick = (chatId: number) => {
    setSelectedChat(chatId)
    // Здесь будет переход к чату
    alert(`${chats.find((c) => c.id === chatId)?.name} чаты ашылады`)
  }

  const formatTime = (time: string) => {
    return time
  }

  const getTotalUnread = () => {
    return chats.reduce((total, chat) => total + chat.unread, 0)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack} className="text-gray-400">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Артқа
          </Button>
          <h1 className="text-white text-xl font-semibold">Хабарлар</h1>
          <Button variant="ghost" size="sm" className="text-gray-400">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Хабарларда іздеу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{chats.length}</div>
            <div className="text-gray-400 text-sm">Барлық чат</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{getTotalUnread()}</div>
            <div className="text-gray-400 text-sm">Оқылмаған</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{chats.filter((c) => c.online).length}</div>
            <div className="text-gray-400 text-sm">Онлайн</div>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="p-4 space-y-2">
        {/* Pinned Chats */}
        {pinnedChats.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Pin className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400 text-sm font-medium">Бекітілген</span>
            </div>
            {pinnedChats.map((chat) => (
              <Card
                key={chat.id}
                className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors mb-2"
                onClick={() => handleChatClick(chat.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-white font-medium truncate">{chat.name}</h4>
                          <Pin className="w-3 h-3 text-yellow-400" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-xs">{formatTime(chat.time)}</span>
                          {chat.unread > 0 && (
                            <Badge className="bg-cyan-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm truncate ${chat.unread > 0 ? "text-white" : "text-gray-400"}`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Regular Chats */}
        {regularChats.map((chat) => (
          <Card
            key={chat.id}
            className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors"
            onClick={() => handleChatClick(chat.id)}
          >
            <CardContent className="p-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-medium truncate">{chat.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-xs">{formatTime(chat.time)}</span>
                      {chat.unread > 0 && (
                        <Badge className="bg-cyan-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm truncate ${chat.unread > 0 ? "text-white" : "text-gray-400"}`}>
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="text-gray-400 p-1 h-8 w-8">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 p-1 h-8 w-8">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredChats.length === 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">
                {searchQuery ? "Хабарлар табылмады" : "Хабарлар жоқ"}
              </h3>
              <p className="text-gray-400 text-sm">
                {searchQuery ? "Басқа сөздермен іздеп көріңіз" : "Клиенттермен хабарласып, жұмыстарды талқылаңыз"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-20 right-4 space-y-2">
        <Button
          size="sm"
          className="bg-cyan-600 hover:bg-cyan-700 rounded-full w-12 h-12 p-0 shadow-lg"
          onClick={() => alert("Жаңа хабар жазу")}
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
