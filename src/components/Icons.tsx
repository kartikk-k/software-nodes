import { BellIcon, CameraIcon, ChartPieIcon, ChatBubbleOvalLeftIcon, CircleStackIcon, ClockIcon, CloudIcon, CodeBracketIcon, Cog6ToothIcon, CommandLineIcon, ComputerDesktopIcon, CpuChipIcon, CreditCardIcon, CubeIcon, CurrencyDollarIcon, DevicePhoneMobileIcon, DeviceTabletIcon, DocumentIcon, DocumentTextIcon, EnvelopeIcon, ExclamationCircleIcon, ExclamationTriangleIcon, FaceFrownIcon, FaceSmileIcon, FilmIcon, FingerPrintIcon, FlagIcon, FolderIcon, GifIcon, HandRaisedIcon, HandThumbDownIcon, HandThumbUpIcon, HashtagIcon, HeartIcon, IdentificationIcon, InboxIcon, KeyIcon, LanguageIcon, LightBulbIcon, LinkIcon, MagnifyingGlassIcon, ServerStackIcon, WindowIcon } from '@heroicons/react/24/outline'
import React from 'react'

const IconOptions: NodeIconsProps[] = [
    { id: 1, label: "Device", icon: <ComputerDesktopIcon />, tags: ["device", "computer", "desktop"] },
    { id: 2, label: "Server", icon: <ServerStackIcon />, tags: ["server", "aws", "azure"] },
    { id: 3, label: "Database", icon: <CircleStackIcon />, tags: ["database", "stack", "cluster", "storage", "aws"] },
    { id: 4, label: "CPU/Chip", icon: <CpuChipIcon />, tags: ["cpu", "gpu", "ai", "processor"] },
    { id: 5, label: "Container", icon: <CubeIcon />, tags: ["container", "docker", "cube", "kubernetes"] },
    { id: 6, label: "Folders", icon: <FolderIcon />, tags: ["folder", "storage", "file", "document"] },
    { id: 7, label: "Cloud", icon: <CloudIcon />, tags: ["cloud", "storage"] },
    { id: 8, label: "Window/Browser", icon: <WindowIcon />, tags: ["window", "browser", "device", "mobile"] },

    { id: 9, label: "Notification", icon: <BellIcon />, tags: ["bell", "notification", "ring"] },
    { id: 10, label: "Chat", icon: <ChatBubbleOvalLeftIcon />, tags: ["chat", "bubble", "message"] },
    { id: 11, label: "Camera", icon: <CameraIcon />, tags: ["camera", "photo", "video", "mobile"] },
    { id: 12, label: "Chart", icon: <ChartPieIcon />, tags: ["chart", "pie", "bar"] },
    { id: 13, label: "Clock", icon: <ClockIcon />, tags: ["clock", "watch", "time"] },
    { id: 14, label: "Code", icon: <CodeBracketIcon />, tags: ["code", "block"] },
    { id: 15, label: "Settings", icon: <Cog6ToothIcon />, tags: ["settings"] },
    { id: 16, label: "Terminal", icon: <CommandLineIcon />, tags: ["terminal", "code"] },
    { id: 17, label: "Card", icon: <CreditCardIcon />, tags: ["card", "debit", "credit", "money", "payment"] },
    { id: 18, label: "Currency", icon: <CurrencyDollarIcon />, tags: ["currency", "money", "dollar", "payment"] },
    { id: 19, label: "Phone", icon: <DevicePhoneMobileIcon />, tags: ["phone", "smart phone", "mobile", "device"] },
    { id: 20, label: "Document", icon: <DocumentIcon />, tags: ["document", "paper"] },

    { id: 21, label: "Text/Document", icon: <DocumentTextIcon />, tags: ["document", "page", "text"] },
    { id: 22, label: "Mail", icon: <EnvelopeIcon />, tags: ["mail", "email"] },
    { id: 23, label: "Exclamation", icon: <ExclamationCircleIcon />, tags: ["exclamation", "alert", "warning", "symbol"] },
    { id: 24, label: "Warning", icon: <ExclamationTriangleIcon />, tags: ["warning", "exclamation", "alert", "symbol"] },
    { id: 25, label: "Smile", icon: <FaceSmileIcon />, tags: ["face", "smile", "rating", "user", "customer"] },
    { id: 26, label: "Sad", icon: <FaceFrownIcon />, tags: ["face", "sad", "rating", "user", "customer"] },
    { id: 27, label: "Video", icon: <FilmIcon />, tags: ["video", "media", "device", "mobile"] },
    { id: 28, label: "Fingerprint", icon: <FingerPrintIcon />, tags: ["fingerprint", "finger print", "security", "authentication"] },
    { id: 29, label: "Flag/Report", icon: <FlagIcon />, tags: ["flag", "report", "mark"] },
    // { id: 30, label: "Gift", icon: <GifIcon />, tags: ["gi", "browser", "device", "mobile"] },
    { id: 31, label: "Hand Raised", icon: <HandRaisedIcon />, tags: ["hand", "human"] },
    { id: 32, label: "ThumbUp", icon: <HandThumbUpIcon />, tags: ["thumbs up", "hand", "rating", "customer", "user"] },
    { id: 33, label: "ThumbDown", icon: <HandThumbDownIcon />, tags: ["thumbs down", "hand", "rating", "customer", "user"] },
    { id: 34, label: "Hashtag", icon: <HashtagIcon />, tags: ["hashtag"] },
    { id: 35, label: "Heart/Like", icon: <HeartIcon />, tags: ["heart", "like", "rating"] },
    { id: 36, label: "Id Card", icon: <IdentificationIcon />, tags: ["id", "id card", "security", "verification"] },
    { id: 37, label: "Inbox", icon: <InboxIcon />, tags: ["window", "browser", "device", "mobile"] },
    { id: 38, label: "Keys", icon: <KeyIcon />, tags: ["keys", "security", "verification", "authentication"] },
    { id: 39, label: "Language/Translate", icon: <LanguageIcon />, tags: ["language", "translate", "speech"] },
    { id: 40, label: "Bulb", icon: <LightBulbIcon />, tags: ["bulb", "tips", "ideas", "creative"] },
    { id: 41, label: "Link", icon: <LinkIcon />, tags: ["link", "url", "share"] },
    { id: 42, label: "Search", icon: <MagnifyingGlassIcon />, tags: ["search", "browse"] },
]

export const GetIcon = (label: string) => {
    const icon = IconOptions.find((icon) => icon.label === label)
    return icon?.icon
}

export default IconOptions