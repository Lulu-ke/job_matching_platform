module.exports = [
"[project]/src/components/home/HeroSearchForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientSearchForm",
    ()=>ClientSearchForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function ClientSearchForm() {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (query.trim()) {
            router.push(`/jobs?q=${encodeURIComponent(query.trim())}`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "flex w-full max-w-2xl flex-col items-stretch gap-2 pt-1 sm:flex-row",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: "Job title, skill, or company",
                value: query,
                onChange: (e)=>setQuery(e.target.value),
                className: "flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-emerald-600 focus:outline-none"
            }, void 0, false, {
                fileName: "[project]/src/components/home/HeroSearchForm.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: "whitespace-nowrap rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700",
                children: "Find Matching Jobs"
            }, void 0, false, {
                fileName: "[project]/src/components/home/HeroSearchForm.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/HeroSearchForm.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/shared/AdBanner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdBanner",
    ()=>AdBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const SIZE_CONFIG = {
    leaderboard: {
        width: 'w-full max-w-[728px]',
        height: 'h-[90px]',
        label: '728 × 90'
    },
    sidebar: {
        width: 'w-full max-w-[300px]',
        height: 'h-[250px]',
        label: '300 × 250'
    },
    banner: {
        width: 'w-full',
        height: 'h-[100px]',
        label: 'Banner Ad'
    }
};
function AdBanner({ size, className }) {
    const config = SIZE_CONFIG[size];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${config.width} ${config.height} flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 ${className ?? ''}`,
        "aria-label": "Advertisement",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm text-gray-400",
                children: "Ad"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/AdBanner.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-0.5 text-xs text-gray-300",
                children: config.label
            }, void 0, false, {
                fileName: "[project]/src/components/shared/AdBanner.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shared/AdBanner.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/home/OfficialUpdates.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OfficialUpdates",
    ()=>OfficialUpdates
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$AdBanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/AdBanner.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
const UPDATES = [
    {
        icon: '📢',
        title: 'KNEC announces shortlisted candidates for 2026 recruitment',
        category: 'Shortlisting',
        time: '2h ago'
    },
    {
        icon: '📅',
        title: 'KRA interviews for tax officers scheduled for 28 June',
        category: 'Interview Date',
        time: '5h ago'
    },
    {
        icon: '📋',
        title: 'County government of Nakuru opens 50 new positions',
        category: 'Recruitment',
        time: '1d ago'
    },
    {
        icon: '⏳',
        title: 'TSC extends application deadline to 30 June',
        category: 'Deadline Extension',
        time: '2d ago'
    }
];
function OfficialUpdates() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "border-t border-gray-200/50 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-8 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-extrabold text-gray-800",
                                                children: "Official Updates"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                                lineNumber: 42,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-light text-gray-500",
                                                children: "Stay informed with recruitment notices, shortlisting updates, and application announcements."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                                lineNumber: 43,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#",
                                        className: "ml-4 whitespace-nowrap text-sm font-semibold text-emerald-600 transition hover:text-emerald-700",
                                        children: "View all →"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-gray-200/60 rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm",
                                children: UPDATES.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-4 rounded-xl px-4 py-3.5 transition hover:bg-white/40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-0.5 text-xl",
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                                lineNumber: 60,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-gray-800",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                                        lineNumber: 62,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-0.5 flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-gray-400",
                                                                children: item.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                                                lineNumber: 64,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-gray-300",
                                                                children: "•"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                                                lineNumber: 65,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-gray-300",
                                                                children: item.time
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                                                lineNumber: 66,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                                        lineNumber: 63,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                                lineNumber: 61,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                        lineNumber: 56,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6 lg:col-span-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$AdBanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdBanner"], {
                                size: "sidebar"
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-emerald-100/60 bg-emerald-50 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                className: "h-5 w-5 text-emerald-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                                lineNumber: 79,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-bold text-gray-800",
                                                children: "Get alerts"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                                lineNumber: 80,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-xs text-gray-600",
                                        children: "Receive WhatsApp notifications for new jobs."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "mt-2 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700",
                                        children: "Subscribe"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/OfficialUpdates.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/home/OfficialUpdates.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/OfficialUpdates.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/shared/SectionHeading.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionHeading",
    ()=>SectionHeading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
;
;
;
function SectionHeading({ title, subtitle, viewAllHref, viewAllText = 'View All' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start justify-between gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-extrabold text-gray-800",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/shared/SectionHeading.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm font-light text-gray-500",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/shared/SectionHeading.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shared/SectionHeading.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            viewAllHref && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: viewAllHref,
                className: "flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700",
                children: [
                    viewAllText,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shared/SectionHeading.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shared/SectionHeading.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shared/SectionHeading.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/shared/ScrollContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollContainer",
    ()=>ScrollContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ScrollContainer({ children, className }) {
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [canScrollLeft, setCanScrollLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canScrollRight, setCanScrollRight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const checkScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = scrollRef.current;
        if (!el) return;
        checkScroll();
        el.addEventListener('scroll', checkScroll, {
            passive: true
        });
        const observer = new ResizeObserver(checkScroll);
        observer.observe(el);
        return ()=>{
            el.removeEventListener('scroll', checkScroll);
            observer.disconnect();
        };
    }, [
        checkScroll
    ]);
    const scroll = (direction)=>{
        const el = scrollRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.7;
        el.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>scroll('left'),
                disabled: !canScrollLeft,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('scroll-btn absolute left-0 z-10 ml-1 hidden md:flex', !canScrollLeft && 'pointer-events-none opacity-30'),
                "aria-label": "Scroll left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                    className: "h-5 w-5"
                }, void 0, false, {
                    fileName: "[project]/src/components/shared/ScrollContainer.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shared/ScrollContainer.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollRef,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('no-scrollbar flex w-full flex-nowrap overflow-x-auto py-4 px-8 sm:px-10', className),
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/shared/ScrollContainer.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>scroll('right'),
                disabled: !canScrollRight,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('scroll-btn absolute right-0 z-10 mr-1 hidden md:flex', !canScrollRight && 'pointer-events-none opacity-30'),
                "aria-label": "Scroll right",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                    className: "h-5 w-5"
                }, void 0, false, {
                    fileName: "[project]/src/components/shared/ScrollContainer.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shared/ScrollContainer.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shared/ScrollContainer.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/db.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const databaseUrl = process.env.DATABASE_URL || 'mysql://jobready_database_admin:Admincyber@d7.my-control-panel.com:3306/jobready_database';
process.env.DATABASE_URL = databaseUrl;
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: [
        'error',
        'warn'
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
"[project]/src/lib/data/categories.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllCategories",
    ()=>getAllCategories,
    "getCategoryBySlug",
    ()=>getCategoryBySlug,
    "getPopularCategories",
    ()=>getPopularCategories,
    "getSubcategoryBySlug",
    ()=>getSubcategoryBySlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-ssr] (ecmascript)");
;
async function getAllCategories() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].jobCategory.findMany({
        orderBy: {
            sortOrder: 'asc'
        },
        include: {
            _count: {
                select: {
                    jobs: {
                        where: {
                            status: 'ACTIVE',
                            deletedAt: null
                        }
                    },
                    subcategories: true
                }
            }
        }
    });
}
async function getCategoryBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].jobCategory.findUnique({
        where: {
            slug
        },
        include: {
            subcategories: {
                orderBy: {
                    sortOrder: 'asc'
                },
                include: {
                    _count: {
                        select: {
                            jobs: {
                                where: {
                                    status: 'ACTIVE',
                                    deletedAt: null
                                }
                            }
                        }
                    }
                }
            },
            _count: {
                select: {
                    jobs: {
                        where: {
                            status: 'ACTIVE',
                            deletedAt: null
                        }
                    },
                    subcategories: true
                }
            }
        }
    });
}
async function getSubcategoryBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].jobSubcategory.findUnique({
        where: {
            slug
        },
        include: {
            category: {
                select: {
                    id: true,
                    label: true,
                    slug: true
                }
            },
            _count: {
                select: {
                    jobs: {
                        where: {
                            status: 'ACTIVE',
                            deletedAt: null
                        }
                    }
                }
            }
        }
    });
}
async function getPopularCategories(limit = 10) {
    const categories = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].jobCategory.findMany({
        orderBy: {
            sortOrder: 'asc'
        },
        include: {
            _count: {
                select: {
                    jobs: {
                        where: {
                            status: 'ACTIVE',
                            deletedAt: null
                        }
                    }
                }
            }
        }
    });
    return categories.map((c)=>({
            id: c.id,
            label: c.label,
            slug: c.slug,
            icon: c.icon,
            jobCount: c._count.jobs
        })).sort((a, b)=>b.jobCount - a.jobCount).slice(0, limit);
}
}),
"[project]/src/components/home/BrowseByCategory.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrowseByCategory",
    ()=>BrowseByCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor.js [app-ssr] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calculator.js [app-ssr] (ecmascript) <export default as Calculator>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$hat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HardHat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hard-hat.js [app-ssr] (ecmascript) <export default as HardHat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-ssr] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-ssr] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-ssr] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-ssr] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$handshake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Handshake$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/handshake.js [app-ssr] (ecmascript) <export default as Handshake>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$SectionHeading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/SectionHeading.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$ScrollContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/ScrollContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/categories.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
// Map category slugs/labels to icons
const CATEGORY_ICON_MAP = {
    'it-software': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"], {
        className: "h-8 w-8 text-emerald-600"
    }, void 0, false, {
        fileName: "[project]/src/components/home/BrowseByCategory.tsx",
        lineNumber: 12,
        columnNumber: 18
    }, ("TURBOPACK compile-time value", void 0)),
    'health-medical': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
        className: "h-8 w-8 text-rose-500"
    }, void 0, false, {
        fileName: "[project]/src/components/home/BrowseByCategory.tsx",
        lineNumber: 13,
        columnNumber: 21
    }, ("TURBOPACK compile-time value", void 0)),
    'finance-accounting': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
        className: "h-8 w-8 text-amber-600"
    }, void 0, false, {
        fileName: "[project]/src/components/home/BrowseByCategory.tsx",
        lineNumber: 14,
        columnNumber: 25
    }, ("TURBOPACK compile-time value", void 0)),
    'engineering': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$hat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HardHat$3e$__["HardHat"], {
        className: "h-8 w-8 text-orange-600"
    }, void 0, false, {
        fileName: "[project]/src/components/home/BrowseByCategory.tsx",
        lineNumber: 15,
        columnNumber: 18
    }, ("TURBOPACK compile-time value", void 0)),
    'education': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
        className: "h-8 w-8 text-emerald-700"
    }, void 0, false, {
        fileName: "[project]/src/components/home/BrowseByCategory.tsx",
        lineNumber: 16,
        columnNumber: 16
    }, ("TURBOPACK compile-time value", void 0)),
    'administration': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
        className: "h-8 w-8 text-gray-600"
    }, void 0, false, {
        fileName: "[project]/src/components/home/BrowseByCategory.tsx",
        lineNumber: 17,
        columnNumber: 21
    }, ("TURBOPACK compile-time value", void 0)),
    'legal': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
        className: "h-8 w-8 text-purple-600"
    }, void 0, false, {
        fileName: "[project]/src/components/home/BrowseByCategory.tsx",
        lineNumber: 18,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    'logistics': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
        className: "h-8 w-8 text-teal-600"
    }, void 0, false, {
        fileName: "[project]/src/components/home/BrowseByCategory.tsx",
        lineNumber: 19,
        columnNumber: 16
    }, ("TURBOPACK compile-time value", void 0)),
    'creative-design': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
        className: "h-8 w-8 text-pink-500"
    }, void 0, false, {
        fileName: "[project]/src/components/home/BrowseByCategory.tsx",
        lineNumber: 20,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    'ngo-social-work': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$handshake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Handshake$3e$__["Handshake"], {
        className: "h-8 w-8 text-emerald-500"
    }, void 0, false, {
        fileName: "[project]/src/components/home/BrowseByCategory.tsx",
        lineNumber: 21,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0))
};
// Fallback categories for when DB is empty
const FALLBACK_CATEGORIES = [
    {
        id: '1',
        label: 'IT & Software',
        slug: 'it-software',
        jobCount: 124
    },
    {
        id: '2',
        label: 'Health & Medical',
        slug: 'health-medical',
        jobCount: 87
    },
    {
        id: '3',
        label: 'Finance & Accounting',
        slug: 'finance-accounting',
        jobCount: 63
    },
    {
        id: '4',
        label: 'Engineering',
        slug: 'engineering',
        jobCount: 52
    },
    {
        id: '5',
        label: 'Education',
        slug: 'education',
        jobCount: 41
    },
    {
        id: '6',
        label: 'Administration',
        slug: 'administration',
        jobCount: 38
    },
    {
        id: '7',
        label: 'Legal',
        slug: 'legal',
        jobCount: 24
    },
    {
        id: '8',
        label: 'Logistics',
        slug: 'logistics',
        jobCount: 19
    },
    {
        id: '9',
        label: 'Creative & Design',
        slug: 'creative-design',
        jobCount: 16
    },
    {
        id: '10',
        label: 'NGO & Social Work',
        slug: 'ngo-social-work',
        jobCount: 28
    }
];
function BrowseByCategory() {
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(FALLBACK_CATEGORIES);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllCategories"])().then((cats)=>{
            if (cats.length > 0) {
                setCategories(cats.map((c)=>({
                        ...c,
                        jobCount: c._count.jobs
                    })));
            }
        }).catch(()=>{
        // Use fallback
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "border-t border-gray-200/50 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$SectionHeading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionHeading"], {
                    title: "Browse by Category",
                    subtitle: "Explore opportunities based on your field, interests, and experience.",
                    viewAllHref: "/categories"
                }, void 0, false, {
                    fileName: "[project]/src/components/home/BrowseByCategory.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$ScrollContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollContainer"], {
                    children: categories.map((cat)=>{
                        const icon = CATEGORY_ICON_MAP[cat.slug] ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700",
                            children: cat.label.charAt(0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/BrowseByCategory.tsx",
                            lineNumber: 67,
                            columnNumber: 15
                        }, this);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: `/jobs/category/${cat.slug}`,
                            className: "category-item flex w-[160px] flex-shrink-0 flex-col items-center rounded-xl border border-white/60 bg-white/70 p-4 text-center backdrop-blur-sm transition hover:border-emerald-400 sm:w-[170px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2",
                                    children: icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/BrowseByCategory.tsx",
                                    lineNumber: 78,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-gray-800",
                                    children: cat.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/BrowseByCategory.tsx",
                                    lineNumber: 79,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: 'jobCount' in cat ? `${cat.jobCount} jobs` : '0 jobs'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/BrowseByCategory.tsx",
                                    lineNumber: 80,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, cat.id, true, {
                            fileName: "[project]/src/components/home/BrowseByCategory.tsx",
                            lineNumber: 73,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/home/BrowseByCategory.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/BrowseByCategory.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/BrowseByCategory.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/data/opportunities.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllOpportunitySlugs",
    ()=>getAllOpportunitySlugs,
    "getClosingSoonOpportunities",
    ()=>getClosingSoonOpportunities,
    "getFeaturedOpportunities",
    ()=>getFeaturedOpportunities,
    "getOpportunitiesByOrganization",
    ()=>getOpportunitiesByOrganization,
    "getOpportunitiesByProvider",
    ()=>getOpportunitiesByProvider,
    "getOpportunitiesByType",
    ()=>getOpportunitiesByType,
    "getOpportunityBySlug",
    ()=>getOpportunityBySlug,
    "getOpportunityCountForOrganization",
    ()=>getOpportunityCountForOrganization,
    "getOpportunityCountsByType",
    ()=>getOpportunityCountsByType,
    "getOpportunityTypeStats",
    ()=>getOpportunityTypeStats,
    "getRecentOpportunities",
    ()=>getRecentOpportunities,
    "getSimilarOpportunities",
    ()=>getSimilarOpportunities,
    "searchOpportunities",
    ()=>searchOpportunities
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
;
// ============================================================
// DATA ACCESS FUNCTIONS
// ============================================================
const activeOpportunityWhere = {
    status: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["OpportunityStatus"].ACTIVE,
    deletedAt: null
};
async function getFeaturedOpportunities(limit = 6) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.findMany({
        where: {
            ...activeOpportunityWhere,
            featured: true
        },
        orderBy: {
            datePosted: 'desc'
        },
        take: limit
    });
}
async function getOpportunitiesByType(type, limit = 10) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.findMany({
        where: {
            ...activeOpportunityWhere,
            type
        },
        orderBy: {
            datePosted: 'desc'
        },
        take: limit
    });
}
async function getRecentOpportunities(limit = 10) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.findMany({
        where: activeOpportunityWhere,
        orderBy: {
            datePosted: 'desc'
        },
        take: limit
    });
}
async function getOpportunitiesByOrganization(orgId, limit = 6) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.findMany({
        where: {
            ...activeOpportunityWhere,
            providerOrgId: orgId
        },
        orderBy: {
            datePosted: 'desc'
        },
        take: limit
    });
}
async function getOpportunityBySlug(slug) {
    const opp = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.findUnique({
        where: {
            slug
        },
        include: {
            providerOrg: {
                select: {
                    id: true,
                    orgName: true,
                    orgSlug: true,
                    orgLogoUrl: true
                }
            }
        }
    });
    if (!opp || opp.status !== 'ACTIVE' || opp.deletedAt) return null;
    return opp;
}
async function searchOpportunities(params) {
    const { query, type, county, sort = 'newest', page = 1, limit = 20 } = params;
    const where = {
        ...activeOpportunityWhere
    };
    if (query) {
        where.OR = [
            {
                title: {
                    contains: query
                }
            },
            {
                providerName: {
                    contains: query
                }
            },
            {
                description: {
                    contains: query
                }
            }
        ];
    }
    if (type) {
        where.type = type;
    }
    if (county) {
        where.locationCounty = {
            contains: county
        };
    }
    // Determine sort order
    let orderBy;
    switch(sort){
        case 'deadline-soon':
            orderBy = {
                deadline: 'asc'
            };
            break;
        case 'deadline-later':
            orderBy = {
                deadline: 'desc'
            };
            break;
        case 'newest':
        default:
            orderBy = {
                datePosted: 'desc'
            };
    }
    const [data, total] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.findMany({
            where,
            orderBy,
            skip: (page - 1) * limit,
            take: limit
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.count({
            where
        })
    ]);
    return {
        data: data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}
async function getAllOpportunitySlugs() {
    const slugs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.findMany({
        where: activeOpportunityWhere,
        select: {
            slug: true
        },
        orderBy: {
            datePosted: 'desc'
        }
    });
    return slugs.map((s)=>s.slug);
}
async function getOpportunityCountsByType() {
    const counts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.groupBy({
        by: [
            'type'
        ],
        where: activeOpportunityWhere,
        _count: {
            id: true
        }
    });
    const map = {};
    for (const c of counts){
        map[c.type] = c._count.id;
    }
    const result = {};
    for (const t of Object.values(__TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["OpportunityType"])){
        result[t] = map[t] ?? 0;
    }
    return result;
}
async function getClosingSoonOpportunities(limit = 4) {
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const opps = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.findMany({
        where: {
            ...activeOpportunityWhere,
            deadline: {
                gte: now,
                lte: sevenDaysFromNow
            }
        },
        orderBy: {
            deadline: 'asc'
        },
        take: limit
    });
    return opps;
}
async function getOpportunitiesByProvider(providerName, excludeId, limit = 5) {
    const where = {
        ...activeOpportunityWhere,
        providerName
    };
    if (excludeId) {
        where.id = {
            not: excludeId
        };
    }
    const opps = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.findMany({
        where,
        orderBy: {
            datePosted: 'desc'
        },
        take: limit
    });
    return opps;
}
async function getOpportunityCountForOrganization(orgId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.count({
        where: {
            ...activeOpportunityWhere,
            providerOrgId: orgId
        }
    });
}
async function getSimilarOpportunities(opportunityId, type, county, limit = 5) {
    const where = {
        ...activeOpportunityWhere,
        id: {
            not: opportunityId
        }
    };
    if (type) {
        where.type = type;
    }
    if (county) {
        where.locationCounty = {
            contains: county
        };
    }
    const opps = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.findMany({
        where,
        orderBy: {
            datePosted: 'desc'
        },
        take: limit
    });
    return opps;
}
async function getOpportunityTypeStats() {
    const counts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].opportunity.groupBy({
        by: [
            'type'
        ],
        where: activeOpportunityWhere,
        _count: {
            id: true
        },
        orderBy: {
            _count: {
                id: 'desc'
            }
        }
    });
    return counts.map((c)=>({
            type: c.type,
            count: c._count.id
        }));
}
}),
"[project]/src/components/home/OpportunitiesHub.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OpportunitiesHub",
    ()=>OpportunitiesHub
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$SectionHeading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/SectionHeading.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$opportunities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/opportunities.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const TABS = [
    {
        key: 'entry',
        label: 'Entry Level'
    },
    {
        key: 'internships',
        label: 'Internships',
        type: 'INTERNSHIP'
    },
    {
        key: 'scholarships',
        label: 'Scholarships',
        type: 'SCHOLARSHIP'
    }
];
// Fallback data for when DB is empty
const FALLBACK = {
    entry: [
        {
            title: 'Graduate Trainee',
            sub: 'Safaricom \u00b7 Nairobi',
            right: '5d ago'
        },
        {
            title: 'Assistant Accountant',
            sub: 'KPMG \u00b7 Nairobi',
            right: '2d ago'
        },
        {
            title: 'Field Officer',
            sub: 'World Food Programme \u00b7 Kisumu',
            right: '1w ago'
        },
        {
            title: 'Sales Representative',
            sub: 'Twiga Foods \u00b7 Mombasa',
            right: '3d ago'
        }
    ],
    internships: [
        {
            title: 'Software Dev Intern',
            sub: 'Google \u00b7 Remote',
            right: '4d ago'
        },
        {
            title: 'Data Science Intern',
            sub: 'UN Habitat \u00b7 Nairobi',
            right: '1d ago'
        },
        {
            title: 'Audit Intern',
            sub: 'EY \u00b7 Nairobi',
            right: '2w ago'
        },
        {
            title: 'Communications Intern',
            sub: 'Red Cross \u00b7 Nairobi',
            right: '5d ago'
        }
    ],
    scholarships: [
        {
            title: 'Mastercard Foundation Scholars Program',
            sub: 'Full Tuition',
            right: 'Closes 15 Jun',
            rightClass: 'text-red-600 font-medium'
        },
        {
            title: 'DAAD Kenya Scholarships',
            sub: 'Partial Tuition',
            right: 'Closes 30 Jun',
            rightClass: 'text-red-600 font-medium'
        },
        {
            title: 'KCB Foundation Scholarships',
            sub: 'Full Tuition',
            right: 'Closes 10 Jul',
            rightClass: 'text-red-600 font-medium'
        },
        {
            title: 'Equity Group Wings to Fly',
            sub: 'Full Tuition',
            right: 'Closes 25 Jun',
            rightClass: 'text-red-600 font-medium'
        }
    ]
};
function OpportunitiesHub() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('entry');
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        entry: [],
        internships: [],
        scholarships: []
    });
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function load() {
            try {
                const [featured, internships, scholarships] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$opportunities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFeaturedOpportunities"])(4),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$opportunities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOpportunitiesByType"])('INTERNSHIP', 4),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$opportunities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOpportunitiesByType"])('SCHOLARSHIP', 4)
                ]);
                setData({
                    entry: featured,
                    internships,
                    scholarships
                });
            } catch  {
            // Use fallback
            } finally{
                setLoaded(true);
            }
        }
        load();
    }, []);
    const currentItems = loaded && data[activeTab].length > 0 ? data[activeTab].map((o)=>({
            title: o.title,
            sub: `${o.providerName}${o.locationCity ? ` \u00b7 ${o.locationCity}` : ''}`,
            right: o.deadline ? `Closes ${new Date(o.deadline).toLocaleDateString('en-KE', {
                day: 'numeric',
                month: 'short'
            })}` : 'Open',
            rightClass: o.deadline ? 'text-red-600 font-medium' : 'text-gray-300'
        })) : FALLBACK[activeTab];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "border-t border-gray-200/50 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$SectionHeading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionHeading"], {
                    title: "🚀 Opportunities Hub",
                    subtitle: "Discover internships, scholarships, graduate programs, and career opportunities.",
                    viewAllHref: "/opportunities"
                }, void 0, false, {
                    fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 flex flex-wrap items-center gap-2 border-b border-gray-200/60 pb-3",
                    children: TABS.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab(tab.key),
                            className: `rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition ${activeTab === tab.key ? 'bg-emerald-700 text-white shadow-emerald-700/20' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`,
                            children: [
                                tab.label,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `ml-1 text-xs ${activeTab === tab.key ? 'text-emerald-200' : 'text-gray-400'}`,
                                    children: [
                                        "(",
                                        currentItems.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
                                    lineNumber: 102,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, tab.key, true, {
                            fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "divide-y divide-gray-200/50 rounded-xl border border-white/60 bg-white/70 px-4 backdrop-blur-sm",
                    children: currentItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex flex-wrap items-center justify-between gap-2 py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-gray-800",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
                                            lineNumber: 121,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-sm text-gray-400",
                                            children: item.sub
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
                                            lineNumber: 122,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-xs ${item.rightClass ?? 'text-gray-300'}`,
                                    children: item.right
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, `${activeTab}-${i}`, true, {
                            fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/OpportunitiesHub.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/data/jobs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClosingSoonJobs",
    ()=>getClosingSoonJobs,
    "getFeaturedJobs",
    ()=>getFeaturedJobs,
    "getGovernmentJobs",
    ()=>getGovernmentJobs,
    "getGovernmentJobsByType",
    ()=>getGovernmentJobsByType,
    "getJobBySlug",
    ()=>getJobBySlug,
    "getJobCount",
    ()=>getJobCount,
    "getJobCountByCategoryAndCounty",
    ()=>getJobCountByCategoryAndCounty,
    "getJobsByCategory",
    ()=>getJobsByCategory,
    "getJobsByCategoryAndCounty",
    ()=>getJobsByCategoryAndCounty,
    "getJobsByCounty",
    ()=>getJobsByCounty,
    "getJobsByOrganization",
    ()=>getJobsByOrganization,
    "getJobsByType",
    ()=>getJobsByType,
    "getRecentJobs",
    ()=>getRecentJobs,
    "getSimilarJobs",
    ()=>getSimilarJobs,
    "searchJobs",
    ()=>searchJobs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
;
// ============================================================
// COMMON INCLUDES
// ============================================================
const jobListInclude = {
    organization: {
        select: {
            id: true,
            orgName: true,
            orgSlug: true,
            orgLogoUrl: true,
            orgType: true,
            orgIndustry: true
        }
    },
    category: {
        select: {
            id: true,
            label: true,
            slug: true
        }
    }
};
const jobDetailInclude = {
    organization: {
        select: {
            id: true,
            orgName: true,
            orgSlug: true,
            orgLogoUrl: true,
            orgType: true,
            orgIndustry: true,
            orgWebsite: true,
            orgDescription: true,
            headquarters: true
        }
    },
    category: {
        select: {
            id: true,
            label: true,
            slug: true
        }
    },
    subcategory: {
        select: {
            id: true,
            label: true,
            slug: true,
            category: {
                select: {
                    id: true,
                    label: true,
                    slug: true
                }
            }
        }
    }
};
const activeJobWhere = {
    status: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["JobStatus"].ACTIVE,
    deletedAt: null
};
async function getFeaturedJobs(limit = 6) {
    const jobs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
        where: {
            ...activeJobWhere,
            featured: true
        },
        include: jobListInclude,
        orderBy: {
            datePosted: 'desc'
        },
        take: limit
    });
    return jobs.map(mapJobWithOrg);
}
async function getJobCount(where) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.count({
        where: {
            ...activeJobWhere,
            ...where
        }
    });
}
async function getRecentJobs(limit = 10) {
    const jobs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
        where: activeJobWhere,
        include: jobListInclude,
        orderBy: {
            datePosted: 'desc'
        },
        take: limit
    });
    return jobs.map(mapJobWithOrg);
}
async function getJobsByCategory(categorySlug, page = 1, limit = 20) {
    const where = {
        ...activeJobWhere,
        category: {
            slug: categorySlug
        }
    };
    const [data, total] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
            where,
            include: jobListInclude,
            orderBy: {
                datePosted: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.count({
            where
        })
    ]);
    return {
        data: data.map(mapJobWithOrg),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}
async function getJobsByCounty(county, page = 1, limit = 20) {
    const where = {
        ...activeJobWhere,
        locationCounty: {
            equals: county,
            mode: 'insensitive'
        }
    };
    const [data, total] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
            where,
            include: jobListInclude,
            orderBy: {
                datePosted: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.count({
            where
        })
    ]);
    return {
        data: data.map(mapJobWithOrg),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}
async function getJobsByType(type, page = 1, limit = 20) {
    const where = {
        ...activeJobWhere,
        employmentType: type
    };
    const [data, total] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
            where,
            include: jobListInclude,
            orderBy: {
                datePosted: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.count({
            where
        })
    ]);
    return {
        data: data.map(mapJobWithOrg),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}
async function getClosingSoonJobs(limit = 6) {
    const now = new Date();
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const jobs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
        where: {
            ...activeJobWhere,
            deadline: {
                gte: now,
                lte: sevenDaysLater
            }
        },
        include: jobListInclude,
        orderBy: {
            deadline: 'asc'
        },
        take: limit
    });
    return jobs.map(mapJobWithOrg);
}
async function getJobBySlug(slug) {
    const job = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findUnique({
        where: {
            slug
        },
        include: jobDetailInclude
    });
    if (!job || job.status !== 'ACTIVE' || job.deletedAt) return null;
    return mapJobDetail(job);
}
async function getSimilarJobs(jobId, categoryId, limit = 5) {
    const where = {
        ...activeJobWhere,
        id: {
            not: jobId
        }
    };
    if (categoryId) {
        where.categoryId = categoryId;
    }
    const jobs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
        where,
        include: jobListInclude,
        orderBy: {
            datePosted: 'desc'
        },
        take: limit
    });
    return jobs.map(mapJobWithOrg);
}
async function searchJobs(params) {
    const { query, employmentType, locationCounty, categoryId, experienceLevel, isRemote, hasSalary, sort = 'newest', page = 1, limit = 20 } = params;
    const where = {
        ...activeJobWhere
    };
    if (query) {
        where.OR = [
            {
                title: {
                    contains: query
                }
            },
            {
                searchText: {
                    contains: query
                }
            },
            {
                organization: {
                    orgName: {
                        contains: query
                    }
                }
            }
        ];
    }
    if (employmentType) {
        where.employmentType = employmentType;
    }
    if (locationCounty) {
        where.locationCounty = {
            contains: locationCounty
        };
    }
    if (categoryId) {
        where.categoryId = categoryId;
    }
    if (experienceLevel) {
        where.experienceLevel = experienceLevel;
    }
    if (isRemote !== undefined) {
        where.isRemote = isRemote;
    }
    if (hasSalary) {
        where.salaryMin = {
            not: null
        };
    }
    // Determine sort order
    let orderBy;
    switch(sort){
        case 'deadline-soon':
            orderBy = {
                deadline: 'asc'
            };
            break;
        case 'deadline-later':
            orderBy = {
                deadline: 'desc'
            };
            break;
        case 'newest':
        default:
            orderBy = {
                datePosted: 'desc'
            };
    }
    const [data, total] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
            where,
            include: jobListInclude,
            orderBy,
            skip: (page - 1) * limit,
            take: limit
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.count({
            where
        })
    ]);
    return {
        data: data.map(mapJobWithOrg),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}
async function getJobsByOrganization(orgId, page = 1, limit = 20) {
    const where = {
        ...activeJobWhere,
        organizationId: orgId
    };
    const [data, total] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
            where,
            include: jobListInclude,
            orderBy: {
                datePosted: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.count({
            where
        })
    ]);
    return {
        data: data.map(mapJobWithOrg),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}
async function getJobsByCategoryAndCounty(categorySlug, countyName, page = 1, limit = 20) {
    const where = {
        ...activeJobWhere,
        category: {
            slug: categorySlug
        },
        locationCounty: {
            equals: countyName,
            mode: 'insensitive'
        }
    };
    const [data, total] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
            where,
            include: jobListInclude,
            orderBy: {
                datePosted: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.count({
            where
        })
    ]);
    return {
        data: data.map(mapJobWithOrg),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}
async function getJobCountByCategoryAndCounty(categorySlug, countyName) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.count({
        where: {
            ...activeJobWhere,
            category: {
                slug: categorySlug
            },
            locationCounty: {
                equals: countyName
            }
        }
    });
}
async function getGovernmentJobs(page = 1, limit = 20) {
    const where = {
        ...activeJobWhere,
        organization: {
            orgType: {
                in: [
                    __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["OrganizationType"].NATIONAL_GOVERNMENT,
                    __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["OrganizationType"].COUNTY_GOVERNMENT
                ]
            }
        }
    };
    const [data, total] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
            where,
            include: jobListInclude,
            orderBy: {
                datePosted: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.count({
            where
        })
    ]);
    return {
        data: data.map(mapJobWithOrg),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}
async function getGovernmentJobsByType(orgType, page = 1, limit = 20) {
    const where = {
        ...activeJobWhere,
        organization: {
            orgType: orgType
        }
    };
    const [data, total] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findMany({
            where,
            include: jobListInclude,
            orderBy: {
                datePosted: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.count({
            where
        })
    ]);
    return {
        data: data.map(mapJobWithOrg),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}
async function getJobBySlugRaw(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"].job.findUnique({
        where: {
            slug
        },
        include: jobDetailInclude
    });
}
function mapJobWithOrg(job) {
    return {
        id: job.id,
        title: job.title,
        slug: job.slug,
        description: job.description,
        organizationId: job.organizationId,
        locationCity: job.locationCity,
        locationCounty: job.locationCounty,
        employmentType: job.employmentType,
        experienceLevel: job.experienceLevel,
        educationLevel: job.educationLevel,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryDisclosure: job.salaryDisclosure,
        salaryCurrency: job.salaryCurrency,
        datePosted: job.datePosted,
        deadline: job.deadline,
        isRemote: job.isRemote,
        isFeatured: job.featured,
        organization: job.organization ? {
            id: job.organization.id,
            orgName: job.organization.orgName,
            orgSlug: job.organization.orgSlug,
            orgLogoUrl: job.organization.orgLogoUrl,
            orgType: job.organization.orgType,
            orgIndustry: job.organization.orgIndustry,
            orgWebsite: 'orgWebsite' in job.organization ? job.organization.orgWebsite : null,
            headquarters: 'headquarters' in job.organization ? job.organization.headquarters : null,
            orgDescription: 'orgDescription' in job.organization ? job.organization.orgDescription : null
        } : null,
        category: job.category ? {
            id: job.category.id,
            label: job.category.label,
            slug: job.category.slug
        } : null
    };
}
function mapJobDetail(job) {
    const base = mapJobWithOrg(job);
    return {
        ...base,
        description: job.description,
        howToApply: job.howToApply,
        applyEmail: job.applyEmail,
        applicationUrl: job.applicationUrl,
        sourceUrl: job.sourceUrl,
        sourcePlatform: job.sourcePlatform,
        jobSource: job.jobSource,
        subcategory: job.subcategory ? {
            id: job.subcategory.id,
            label: job.subcategory.label,
            slug: job.subcategory.slug,
            category: {
                id: job.subcategory.category.id,
                label: job.subcategory.category.label,
                slug: job.subcategory.category.slug
            }
        } : job.subcategory
    };
}
}),
"[project]/src/components/home/FlexibleJobsSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlexibleJobsSection",
    ()=>FlexibleJobsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$SectionHeading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/SectionHeading.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$jobs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/jobs.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const TABS = [
    {
        key: 'part-time',
        label: 'Part-Time',
        type: 'PART_TIME'
    },
    {
        key: 'contract',
        label: 'Contract',
        type: 'CONTRACT'
    },
    {
        key: 'freelance',
        label: 'Freelance',
        type: 'FREELANCE'
    },
    {
        key: 'casual',
        label: 'Casual',
        type: 'CASUAL'
    }
];
const TYPE_COLORS = {
    'PART_TIME': 'bg-blue-50 text-blue-700',
    'CONTRACT': 'bg-amber-50 text-amber-700',
    'FREELANCE': 'bg-purple-50 text-purple-700',
    'CASUAL': 'bg-orange-50 text-orange-700',
    'TEMPORARY': 'bg-yellow-50 text-yellow-700'
};
const FALLBACK_JOBS = {
    'part-time': [
        {
            title: 'Retail Sales Assistant',
            location: 'Nairobi',
            type: 'Part-time',
            typeKey: 'PART_TIME',
            salary: 'KSh 15k/mo',
            emoji: '🛍️'
        },
        {
            title: 'Tutor - Mathematics',
            location: 'Nakuru',
            type: 'Part-time',
            typeKey: 'PART_TIME',
            salary: 'KSh 800/hr',
            emoji: '📚'
        },
        {
            title: 'Restaurant Server',
            location: 'Mombasa',
            type: 'Part-time',
            typeKey: 'PART_TIME',
            salary: 'KSh 12k/mo',
            emoji: '🍽️'
        },
        {
            title: 'Data Entry Clerk',
            location: 'Remote',
            type: 'Part-time',
            typeKey: 'PART_TIME',
            salary: 'KSh 10k/mo',
            emoji: '💻'
        }
    ],
    'contract': [
        {
            title: 'Project Manager',
            location: 'Nairobi',
            type: 'Contract',
            typeKey: 'CONTRACT',
            salary: 'KSh 180k/mo',
            emoji: '📊'
        },
        {
            title: 'Consultant - HR',
            location: 'Nairobi',
            type: 'Contract',
            typeKey: 'CONTRACT',
            salary: 'KSh 120k/mo',
            emoji: '🤝'
        },
        {
            title: 'Electrical Technician',
            location: 'Kisumu',
            type: 'Contract',
            typeKey: 'CONTRACT',
            salary: 'KSh 45k/mo',
            emoji: '⚡'
        },
        {
            title: 'Surveyor',
            location: 'Mombasa',
            type: 'Contract',
            typeKey: 'CONTRACT',
            salary: 'KSh 60k/mo',
            emoji: '📐'
        }
    ],
    'freelance': [
        {
            title: 'Freelance Writer',
            location: 'Remote',
            type: 'Freelance',
            typeKey: 'FREELANCE',
            salary: 'KSh 2k/article',
            emoji: '✍️'
        },
        {
            title: 'Graphic Designer',
            location: 'Remote',
            type: 'Freelance',
            typeKey: 'FREELANCE',
            salary: 'KSh 5k/project',
            emoji: '🎨'
        },
        {
            title: 'Web Developer',
            location: 'Remote',
            type: 'Freelance',
            typeKey: 'FREELANCE',
            salary: 'KSh 50k/project',
            emoji: '🌐'
        },
        {
            title: 'Social Media Manager',
            location: 'Nairobi',
            type: 'Freelance',
            typeKey: 'FREELANCE',
            salary: 'KSh 20k/mo',
            emoji: '📱'
        }
    ],
    'casual': [
        {
            title: 'Event Staff',
            location: 'Mombasa',
            type: 'Casual',
            typeKey: 'CASUAL',
            salary: 'KSh 1.5k/day',
            emoji: '🎪'
        },
        {
            title: 'Warehouse Assistant',
            location: 'Nairobi',
            type: 'Casual',
            typeKey: 'CASUAL',
            salary: 'KSh 1.2k/day',
            emoji: '📦'
        },
        {
            title: 'Construction Helper',
            location: 'Nakuru',
            type: 'Casual',
            typeKey: 'CASUAL',
            salary: 'KSh 1k/day',
            emoji: '🏗️'
        },
        {
            title: 'Farm Worker',
            location: 'Eldoret',
            type: 'Casual',
            typeKey: 'CASUAL',
            salary: 'KSh 800/day',
            emoji: '🌾'
        }
    ]
};
const ACROSS_KENYA = [
    {
        county: 'Nairobi',
        count: 234
    },
    {
        county: 'Mombasa',
        count: 98
    },
    {
        county: 'Kisumu',
        count: 76
    },
    {
        county: 'Nakuru',
        count: 63
    },
    {
        county: 'Eldoret',
        count: 52
    },
    {
        county: 'Thika',
        count: 41
    },
    {
        county: 'Kakamega',
        count: 29
    },
    {
        county: 'Machakos',
        count: 33
    }
];
function FlexibleJobsSection() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('part-time');
    const [jobs, setJobs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        'part-time': [],
        'contract': [],
        'freelance': [],
        'casual': []
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function load() {
            try {
                const results = await Promise.all(TABS.map((t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$jobs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getJobsByType"])(t.type, 1, 4)));
                const mapped = {};
                results.forEach((r, i)=>{
                    mapped[TABS[i].key] = r.data;
                });
                setJobs(mapped);
            } catch  {
            // Use fallback
            }
        }
        load();
    }, []);
    const currentTab = TABS.find((t)=>t.key === activeTab);
    const currentJobs = jobs[activeTab];
    const useFallback = currentJobs.length === 0;
    const displayItems = useFallback ? FALLBACK_JOBS[activeTab] : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "border-t border-gray-200/50 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-8 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$SectionHeading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionHeading"], {
                                title: "🧩 Flexible Work Opportunities",
                                subtitle: "Browse casual, temporary, freelance, and part-time jobs.",
                                viewAllHref: "/jobs?flexible=true"
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 flex flex-wrap items-center gap-2 border-b border-gray-200/60 pb-3",
                                children: TABS.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTab(tab.key),
                                        className: `rounded-full px-4 py-1.5 text-xs font-semibold transition ${activeTab === tab.key ? 'bg-emerald-700 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`,
                                        children: tab.label
                                    }, tab.key, false, {
                                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-gray-200/50 rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm",
                                children: useFallback && displayItems ? displayItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-between px-5 py-4 transition hover:bg-emerald-50/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl",
                                                        children: item.emoji
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "text-sm font-semibold text-gray-800",
                                                                children: item.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                                lineNumber: 137,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500",
                                                                children: item.location
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                                lineNumber: 138,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                lineNumber: 134,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 flex items-center gap-3 sm:mt-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[item.typeKey] ?? 'bg-gray-100 text-gray-600'}`,
                                                        children: item.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-gray-700",
                                                        children: item.salary
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                lineNumber: 141,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                        lineNumber: 130,
                                        columnNumber: 21
                                    }, this)) : currentJobs.map((job)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/jobs/${job.slug}`,
                                        className: "flex flex-wrap items-center justify-between px-5 py-4 transition hover:bg-emerald-50/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 text-xs font-bold text-emerald-700",
                                                        children: job.title.charAt(0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "text-sm font-semibold text-gray-800",
                                                                children: job.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                                lineNumber: 160,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500",
                                                                children: [
                                                                    job.locationCity,
                                                                    job.locationCounty
                                                                ].filter(Boolean).join(', ') || 'Kenya'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                                lineNumber: 161,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                        lineNumber: 159,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                lineNumber: 155,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 flex items-center gap-3 sm:mt-0",
                                                children: job.employmentType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[job.employmentType] ?? 'bg-gray-100 text-gray-600'}`,
                                                    children: job.employmentType.replace('_', '-').replace(/\b\w/g, (l)=>l.toUpperCase())
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                lineNumber: 166,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, job.id, true, {
                                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                        lineNumber: 150,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "flex items-center gap-2 text-lg font-extrabold text-gray-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "📍"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                lineNumber: 182,
                                                columnNumber: 17
                                            }, this),
                                            " Across Kenya"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/counties",
                                        className: "text-xs font-semibold text-emerald-600 transition hover:text-emerald-700",
                                        children: "View All →"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: ACROSS_KENYA.map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/jobs?county=${encodeURIComponent(loc.county)}`,
                                            className: "location-item flex items-center justify-between rounded-lg p-2.5 transition hover:bg-emerald-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium text-gray-700 transition hover:text-emerald-700",
                                                    children: loc.county
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full bg-emerald-100/60 px-2 py-0.5 text-xs font-medium text-emerald-600",
                                                    children: [
                                                        loc.count,
                                                        " jobs"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, loc.county, true, {
                                            fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                            lineNumber: 194,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
            lineNumber: 99,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/FlexibleJobsSection.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/home/NewsletterSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewsletterSection",
    ()=>NewsletterSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
'use client';
;
;
;
function NewsletterSection() {
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setEmail('');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "border-t border-gray-200/50 py-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-2xl px-4 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-3 inline-flex items-center justify-center rounded-full bg-emerald-100 p-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                        className: "h-6 w-6 text-emerald-600"
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/NewsletterSection.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/home/NewsletterSection.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-extrabold text-gray-800",
                    children: "Never Miss an Opportunity"
                }, void 0, false, {
                    fileName: "[project]/src/components/home/NewsletterSection.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-sm text-gray-500",
                    children: "Get new jobs, deadlines, and career opportunities delivered directly to your inbox."
                }, void 0, false, {
                    fileName: "[project]/src/components/home/NewsletterSection.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold text-emerald-700",
                            children: "✓ You're subscribed!"
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/NewsletterSection.tsx",
                            lineNumber: 31,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-emerald-600",
                            children: "Check your inbox for a confirmation email."
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/NewsletterSection.tsx",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/NewsletterSection.tsx",
                    lineNumber: 30,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "email",
                            placeholder: "Your email address",
                            value: email,
                            onChange: (e)=>setEmail(e.target.value),
                            required: true,
                            className: "flex-1 rounded-lg border border-gray-300 bg-white/70 px-4 py-3 text-sm focus:border-emerald-600 focus:outline-none"
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/NewsletterSection.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700",
                            children: "Subscribe Free"
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/NewsletterSection.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/NewsletterSection.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-3 text-xs text-gray-400",
                    children: "No spam, unsubscribe anytime. We respect your privacy."
                }, void 0, false, {
                    fileName: "[project]/src/components/home/NewsletterSection.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/NewsletterSection.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/NewsletterSection.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_0um0m4j._.js.map