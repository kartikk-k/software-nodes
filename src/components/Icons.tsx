import { BellIcon, CameraIcon, ChartPieIcon, ChatBubbleOvalLeftIcon, CircleStackIcon, ClockIcon, CloudIcon, CodeBracketIcon, Cog6ToothIcon, CommandLineIcon, ComputerDesktopIcon, CpuChipIcon, CreditCardIcon, CubeIcon, CurrencyDollarIcon, DevicePhoneMobileIcon, DeviceTabletIcon, DocumentIcon, DocumentTextIcon, EnvelopeIcon, ExclamationCircleIcon, ExclamationTriangleIcon, FaceFrownIcon, FaceSmileIcon, FilmIcon, FingerPrintIcon, FlagIcon, FolderIcon, GifIcon, HandRaisedIcon, HandThumbDownIcon, HandThumbUpIcon, HashtagIcon, HeartIcon, IdentificationIcon, InboxIcon, KeyIcon, LanguageIcon, LightBulbIcon, LinkIcon, MagnifyingGlassIcon, ServerStackIcon, WindowIcon } from '@heroicons/react/24/outline'
import { IconBook2, IconBrandGithub, IconBrandGitlab, IconGitBranch, IconGitBranchDeleted, IconGitCommit, IconGitCompare, IconGitFork, IconGitMerge, IconGitPullRequest, IconGitPullRequestClosed, IconGitPullRequestDraft, IconBrandGithubCopilot, IconBrandGit } from '@tabler/icons-react'
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

    { id: 43, label: "Repo", icon: <IconBook2 stroke={1.5} />, tags: ["git", "repo"] },
    { id: 44, label: "Github", icon: <IconBrandGithub stroke={1.5} />, tags: ["github", "git"] },
    { id: 45, label: "Gitlab", icon: <IconBrandGitlab stroke={1.5} />, tags: ["github", "git"] },
    { id: 46, label: "Branch", icon: <IconGitBranch stroke={1.5} />, tags: ["github", "git"] },
    { id: 47, label: "BranchDeleted", icon: <IconGitBranchDeleted stroke={1.5} />, tags: ["github", "git"] },
    { id: 48, label: "Commit", icon: <IconGitCommit stroke={1.5} />, tags: ["github", "git"] },
]

export const GetIcon = (label: string) => {
    const icon = IconOptions.find((icon) => icon.label === label)
    return icon?.icon
}

export default IconOptions


export const LoadingIcon = () => {
    return (
        <div className='z-40 absolute flex flex-col text-white text-sm gap-2 items-center justify-center w-screen h-screen'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 32 32"
                className='animate-spin'
            >
                <path
                    fill="#000"
                    d="M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16zM4.001 16c0 6.627 5.372 11.999 11.999 11.999 6.627 0 11.999-5.372 11.999-11.999 0-6.627-5.372-11.999-11.999-11.999C9.373 4.001 4.001 9.373 4.001 16z"
                ></path>
                <path
                    fill="#055FFC"
                    d="M32 16A16 16 0 1116 0v4.001A11.999 11.999 0 1027.999 16H32z"
                ></path>
            </svg>
            <p>Fetching data, please wait...</p>
        </div>
    )
}