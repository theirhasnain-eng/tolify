import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  Eye,
  Calendar,
  User,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  Wrench,
  RefreshCw,
} from "lucide-react";
import API from "../services/api";
import SeoHead from "../components/SeoHead";
import SaasCalculator from "../components/tools/SaasCalculator";
import HourlyRateCalculator from "../components/tools/HourlyRateCalculator";

import ArticleCard from "../components/ArticleCard";

export default function ArticleDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/posts/slug/${slug}`);
        setPost(res.data);

        // Fetch related posts in same category
        if (res.data.category) {
          const relatedRes = await API.get(
            `/posts?category=${res.data.category}&limit=3`,
          );
          setRelatedPosts(
            relatedRes.data.filter((p) => p._id !== res.data._id),
          );
        }
      } catch (error) {
        console.error("Error fetching article detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [slug]);

  const renderToolComponent = (toolId) => {
    switch (toolId) {
      case "saas-calculator":
        return <SaasCalculator />;
      case "hourly-rate-calculator":
        return <HourlyRateCalculator />;
      case "seo-meta-generator":
        return <SeoMetaGenerator />;
      default:
        return null;
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 gap-2">
        <RefreshCw className="w-6 h-6 animate-spin text-brand-400" /> Loading
        article content...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Article Not Found</h1>
        <p className="text-gray-400 mt-2">
          The article you are looking for may have been moved or unpublished.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>
      </div>
    );
  }

  // Schema.org BlogPosting Payload
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnailUrl,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "DevMetrics Team",
    },
    publisher: {
      "@type": "Organization",
      name: "DevMetrics Hub",
      logo: {
        "@type": "ImageObject",
        url: "https://devmetricshub.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": window.location.href,
    },
  };

  return (
    <>
      <SeoHead
        title={post.seoTitle || `${post.title} | DevMetrics Hub`}
        description={post.seoDescription || post.excerpt}
        keywords={
          post.keywords?.length
            ? post.keywords
            : ["US SaaS", "Developer Rates", "SEO Tools"]
        }
        ogImage={post.thumbnailUrl}
        ogType="article"
        schemaJson={blogPostingSchema}
      />

      <main className="min-h-screen py-12">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>

          {/* Category Badge & Tool Alert */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {post.category}
            </span>
            {post.associatedTool && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Wrench className="w-3.5 h-3.5" /> Interactive Utility Included
              </span>
            )}
          </div>

          {/* Semantic Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 my-6 border-y border-gray-800 text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-brand-400 font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {post.author?.name || "DevMetrics Editorial Team"}
                </div>
                <div className="text-gray-400">
                  {post.author?.role || "US Tech Industry Analysts"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <time
                dateTime={post.createdAt}
                className="flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readTime || 5} min read
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-brand-400" /> {post.views}{" "}
                views
              </span>
            </div>
          </div>

          {/* Thumbnail Cover Image */}
          <div className="rounded-2xl overflow-hidden my-8 border border-gray-800 shadow-2xl">
            <img
              src={post.thumbnailUrl}
              alt={post.title}
              className="w-full h-[350px] sm:h-[450px] object-cover"
            />
          </div>

          {/* Main Article Content Body */}
          <div
            className="prose prose-invert max-w-none text-gray-200 text-base leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Embedded Interactive Tool Component */}
          {post.associatedTool && (
            <section className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex items-center gap-2 text-brand-400 font-semibold text-xs uppercase tracking-wider mb-2">
                <Wrench className="w-4 h-4" /> Embedded Tool Engine
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Interactive Utility
              </h2>
              {renderToolComponent(post.associatedTool)}
            </section>
          )}

          {/* Social Share Bar */}
          <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-brand-400" /> Share this US Tech
              Insight
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs text-white font-medium transition-colors"
              >
                {copiedLink ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copiedLink ? "Copied Link!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Related Articles Footer */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-800">
              <h3 className="text-xl font-bold text-white mb-6">
                Related Articles in {post.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((relPost) => (
                  <ArticleCard key={relPost._id} post={relPost} />
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  );
}
