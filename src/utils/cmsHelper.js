import React from 'react';
import { 
    Lightbulb, 
    PenTool, 
    Code2, 
    Rocket, 
    Brain, 
    Zap, 
    MessageSquare, 
    ShieldCheck, 
    Clock, 
    Users, 
    Bot,
    Terminal,
    Globe,
    Cpu,
    Smartphone,
    Wifi,
    MapPin,
    Signal,
    Activity,
    Layers,
    Target,
    Code,
    Share2,
    Maximize2,
    Columns,
    Boxes,
    Cloud,
    BriefcaseBusiness,
    CheckCircle,
    Layout,
    ArrowRight,
    Check,
    Shield,
    Star
} from 'lucide-react';

const iconMap = {
    Lightbulb: Lightbulb,
    PenTool: PenTool,
    Code2: Code2,
    Rocket: Rocket,
    Brain: Brain,
    Zap: Zap,
    MessageSquare: MessageSquare,
    ShieldCheck: ShieldCheck,
    Clock: Clock,
    Users: Users,
    Bot: Bot,
    Terminal: Terminal,
    Globe: Globe,
    Cpu: Cpu,
    Smartphone: Smartphone,
    Wifi: Wifi,
    MapPin: MapPin,
    Signal: Signal,
    Activity: Activity,
    Layers: Layers,
    Target: Target,
    Code: Code,
    Share2: Share2,
    Maximize2: Maximize2,
    Columns: Columns,
    Boxes: Boxes,
    Cloud: Cloud,
    BriefcaseBusiness: BriefcaseBusiness,
    CheckCircle: CheckCircle,
    Layout: Layout,
    ArrowRight: ArrowRight,
    Check: Check,
    Shield: Shield,
    Star: Star
};

export const getIcon = (iconName, className = "w-6 h-6") => {
    const IconComponent = iconMap[iconName] || Bot;
    return React.createElement(IconComponent, { className });
};

export const transformProcessStep = (step) => ({
    id: step.stepNumber,
    title: step.title,
    description: step.description,
    icon: getIcon(step.icon),
    color: step.color || "from-purple-500 to-indigo-600"
});

export const transformFeature = (feature) => ({
    icon: getIcon(feature.icon, "w-5 h-5"),
    title: feature.title,
    description: feature.description,
    ...feature.metadata
});
