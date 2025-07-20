"use client";

import React from "react";
import {
  PenTool,
  Star,
  ArrowRight,
  Sparkles,
  Globe,
  Users,
  Zap,
  Heart,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
}

interface Stat {
  number: string;
  label: string;
}

const LandingPage: React.FC = () => {
  const router = useRouter();

  const features: Feature[] = [
    {
      icon: PenTool,
      title: "Rich Text Editor",
      description:
        "Write with style using our powerful TipTap editor with all the formatting tools you need.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Sparkles,
      title: "Beautiful Design",
      description:
        "Modern, clean interface that makes writing a joy. Dark mode included for comfortable writing.",
      gradient: "from-blue-500 to-pink-600",
    },
    {
      icon: Globe,
      title: "Share Everywhere",
      description:
        "Publish your thoughts and share them with the world. SEO optimized and lightning fast.",
      gradient: "from-pink-500 to-red-600",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Connect with other writers, get feedback, and grow your audience organically.",
      gradient: "from-red-500 to-orange-600",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built with modern tech stack for optimal performance. Your readers will love the speed.",
      gradient: "from-orange-500 to-yellow-600",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description:
        "Crafted by writers, for writers. Every feature is designed to enhance your writing experience.",
      gradient: "from-green-500 to-blue-500",
    },
  ];

  const stats: Stat[] = [
    { number: "1M+", label: "Stories Published" },
    { number: "50K+", label: "Active Writers" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  const handleStartWriting = () => {
    router.push("/dashboard/create");
  };

  const handleExploreStories = () => {
    router.push("/blog");
  };

  const handleCreateFirstPost = () => {
    router.push("/dashboard/create");
  };

  const handleBrowseFeaturedPosts = () => {
    router.push("blog");
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50 min-h-screen flex items-center">
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-2 text-sm font-medium text-blue-600">
                <Star className="h-4 w-4" />
                <span>Trusted by 50,000+ writers worldwide</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Craft Beautiful
              </span>
              <br />
              <span className="text-gray-900">Blog Posts</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              The modern blogging platform that combines powerful editing tools
              with stunning design. Write, publish, and share your stories with
              the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleStartWriting}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 border-0 cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200"
              >
                <PenTool className="h-5 w-5" />
                <span>Start Writing</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={handleExploreStories}
                className="bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 text-lg font-semibold rounded-xl border border-gray-200/50 flex items-center justify-center space-x-2 cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-600 transition-all duration-200"
              >
                <span>Explore Stories</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                create amazing content
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Powerful features designed to help you write better, faster, and
              with more impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden border border-gray-200/50 bg-white/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 transition-colors duration-300 group-hover:text-blue-500">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-blue-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to start your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                writing journey
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of writers who have already discovered the joy of
              writing with BlogCraft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCreateFirstPost}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 border-0 cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <PenTool className="h-5 w-5" />
                <span>Create Your First Post</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={handleBrowseFeaturedPosts}
                className="bg-white text-gray-700 px-8 py-4 text-lg font-semibold rounded-xl border border-gray-200/50 flex items-center justify-center space-x-2 cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-600 transition-all duration-200"
              >
                <span>Browse Featured Posts</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
