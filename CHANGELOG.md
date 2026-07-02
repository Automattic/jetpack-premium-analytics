# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.1.0-alpha - unreleased

This is an alpha version! The changes listed here are not final.

### Added
- Add /connect and /syncing routes with connection-aware route guards: /connect detects the connection state and shows a "site not connected" screen, and /syncing shows initial-sync progress. Emit window.JetpackScriptData on the boot-rendered admin page so the connection data the guards read is available.
- Add an Authors dashboard widget showing top authors by views via the Jetpack Stats API (through the stats-admin proxy), with a common stats query in the data package.
- Add a Top posts & pages stats widget, wiring the ported presentational widget to live Jetpack Stats data via the designated useStatsTopPosts traffic hook.
- Add a tsconfig paths alias and typecheck script so internal packages/* resolve for types/IDE.
- Add a Videos dashboard widget showing the most played videos via the Jetpack Stats API (through the stats-admin proxy).
- Add site-sync package (useSyncStatus hook) and configure apiFetch auth in init.
- Add the Emails widget to the Premium Analytics dashboard: a leaderboard of your latest sent emails with a selector to switch between open rate and click rate.
- Add the internal fields package: DataForm field controls for widgets, delivered as a script module so styled editors stay out of widget metadata bundles. Includes the ReportParamsField date-range editor.
- Add the Latest Subscribers Stats widget, plus a reusable SubscriberList toolkit component (avatar + name + relative "since" time roster).
- Add the Locations widget to the Premium Analytics dashboard: world map + leaderboard showing visitors by country, region, or city, with click-to-drill-down into country regions.
- Add the Payment status dashboard widget.
- Add watch mode for local development.
- Dashboard: add a React Query Devtools widget (non-production only), and expose two server-side widget-type filters (at registration and on read) so consumers can scope which widget types reach the dashboard.
- Dashboard: Add the date range picker with comparison support, syncing the selected range to URL search params so all widgets pick it up.
- Data: Add Jetpack Stats proxy fetch utilities.
- Data: Add Jetpack Stats traffic report normalizers.
- Expose the analytics initial-full-sync milestone (initial_full_sync_finished) on Jetpack's sync status REST response so the dashboard can read it live on every poll, not just at page load.
- Initial version.
- Interim port of the woocommerce_analytics Jetpack Sync module.
- Port data package (React Query report hooks, fetchers, and processing) as an internal package from next-woocommerce-analytics.
- Port datetime package (timezone-aware date helpers and date-range presets) as an internal package from next-woocommerce-analytics.
- Port formatters package (number/currency/percentage metric formatter and date helpers) as an internal package from next-woocommerce-analytics.
- Port icons package (illustrated WPDS icons + @wordpress/icons re-exports) as an internal package from next-woocommerce-analytics.
- Port routing package (date-range/comparison search-param helpers and the staged-search hook) as an internal package from next-woocommerce-analytics.
- Port the Average items per order dashboard widget from next-woocommerce-analytics, composed from the widgets-toolkit and data packages.
- Port the Bookings by device dashboard widget from next-woocommerce-analytics, composed from the widgets-toolkit and data packages.
- Port the components package (date range/comparison filter UI components and SCSS) from next-woocommerce-analytics as the internal `ui` package.
- Port the widgets-toolkit package (dashboard widgets, chart components, fields, and helpers) from next-woocommerce-analytics as an internal package.
- Premium Analytics: add jpa/search-terms widget backed by Jetpack Stats.
- Premium Analytics: type the Stats post payload (StatsPostMeta) and add single-resource post_id support to report params.
- REST: Add the analytics API proxy controller that forwards dashboard requests to WPCOM and briefly caches the response.
- REST: Expose the dashboard notices under `jetpack-premium-analytics/v1/notices` (GET + POST), backed by a Notices class ported from stats-admin that merges the WordPress.com dismissal state with locally-derived opt-in/opt-out/feedback/GDPR flags.
- REST: Register the API proxy's transient cache prefix with the stats package's transient cleanup cron, so expired proxy response caches are garbage-collected on sites without a persistent object cache instead of accumulating in wp_options.
- REST: Serve the whole analytics and stats surface through one endpoint-agnostic proxy under jetpack-premium-analytics/v1, shaped as `proxy/v<version>/<prefix>/<subpath>` (for example `proxy/v1.1/wordads/earnings`). The `proxy/` segment marks a transparent WordPress.com forward, the WordPress.com API version lives in the path, and an allowed-prefix plus write-method allowlist bounds the blog token. This lays the groundwork for deprecating the stats-admin package.
- Stats: Add app commercial classification hook.
- Stats: Add app dashboard module settings hooks.
- Stats: Add app dashboard modules hooks.
- Stats: Add app notices hooks.
- Stats: Add app plan usage hook.
- Stats: Add app publish state hook.
- Stats: Add app purchases hook.
- Stats: Add app referrers spam hooks.
- Stats: Add archives report hook.
- Stats: Add comment followers report hook.
- Stats: Add comments report hook.
- Stats: Add core proxy query definitions.
- Stats: Add core traffic report hooks.
- Stats: Add devices report hook.
- Stats: Add email breakdown hooks.
- Stats: Add email summary hook.
- Stats: Add email time series hooks.
- Stats: Add followers report hook.
- Stats: Add highlights hook.
- Stats: Add insights hook.
- Stats: Add post stats data hook.
- Stats: Add publicize report hook.
- Stats: Add shared endpoint query helpers.
- Stats: Add single video hook.
- Stats: Add streak hook.
- Stats: Add subscribers hooks.
- Stats: Add tags report hook.
- Stats: Add time-series response normalizers.
- Stats: Add UTM endpoint data hook.
- Stats: Add visits report hook.
- Stats: Add WordAds hooks.
- Storybook: Add a prop-driven Top posts & pages widget story under Packages/Premium Analytics/Widgets.
- Subscribers: Add the Subscribers chart widget — subscriber growth over time with paid subscribers and a previous-period overlay, grouped by day/week/month.
- Sync: Track the analytics-relevant initial full-sync milestone and expose it to the dashboard via JetpackScriptData.
- Widgets: Add sales by UTM channel widget.
- Widgets: Add visitors over time widget.
- Widgets Toolkit: add the reusable MetricTabsChart component (metric cards + comparative line chart with previous-period overlay), shared by the subscribers and traffic charts.

### Changed
- Allow consumers to configure the admin menu title via init options.
- Build the internal ui and data packages as registered script modules (wpScriptModuleExports) so consumers externalize them instead of bundling per-consumer copies: styled ui components stay out of style-less builds, and data's QueryClient becomes a genuine page-wide singleton.
- Clean up leftover WooCommerce/standalone naming in comments, docs, and the search route key.
- Comments/tests: update residual proxy/reports path references in Storybook mock docs and a REST test literal to the versioned agnostic proxy route. No functional change.
- Dashboard: Add tabbed sections around the customizable widget grid.
- Dashboard widgets: align the hello-world example widget with the widget render contract and translate its strings.
- Data layer: point report requests at the endpoint-agnostic proxy route (proxy/v2/analytics/reports) after the per-endpoint proxy route was removed.
- Data layer: route report requests through the jetpack-premium-analytics proxy controller instead of the legacy woocommerce-analytics proxy route.
- Data layer: Use endpoint-specific typing for dashboard module settings.
- Internal: No longer require automattic/jetpack-changelogger as a per-project dev dependency.
- Locations: Align widget Storybook and comparison states with dashboard guidelines.
- Locations widget: Use the updated view selector size.
- Render the Premium Analytics admin page inside the native wp-admin shell (sidebar and header) instead of taking over the full screen.
- Stats: Email time series hooks now return comparison-aware report results and resolve hourly buckets into distinct per-hour intervals.
- Subscribers chart: honor the dashboard date-range and comparison picker. The chart window and previous-period overlay now follow the dashboard controls; the in-body "Group by" dropdown only chooses the bucket size within that range.
- Syncing: when WooCommerce is inactive, gate the dashboard on Jetpack's generic initial full sync so the syncing screen completes instead of spinning forever.
- Update package dependencies.
- Update Stats widget porting guidelines for Storybook, comparison states, and drill-down behavior.
- Update widget conventions and Stats porting documentation.
- Widgets: align the woocommerce-analytics-ported widgets with the shared widget render-props contract.

### Fixed
- Authors widget: localize the untracked-authors label; center the chart empty state.
- Dashboard: Fix global error handling for widgets.
- Dashboard: fix widget grid flicker when resizing a widget vertically by letting the section panel fill the viewport height and scroll internally, so it no longer oscillates with the grid.
- Dashboard: Load WordPress build polyfills so the dashboard can run without the Gutenberg plugin.
- Drop the unsupported `focusable` prop on `@wordpress/ui` `Tabs.Panel` (not a valid prop; was a no-op). Aligns with the `@wordpress/ui` 0.15 API. Panels already gate their content on the active section.
- Email stats: match the real WordPress.com API shapes — opens/clicks timelines carry a labeled hourly `hour` column and no `unique_opens_count`, the emails summary always requests `period=alltime`, and the summary leaderboard ranks by opens.
- Emails widget: Align the header with other dashboard widgets.
- Fix a missing script data asset in packaged Premium Analytics builds.
- Fix dashboard widgets rendering "Widget is no longer available" by loading the widget manifest on REST requests, not just admin page loads.
- Fix TypeScript error in five zero-attribute widget stories (Record<never, never> instead of Record<string, never>).
- Keep the widget-dashboard Storybook story's settings drawer on-screen when the dashboard is wider than the preview canvas.
- Locations widget: Show Locations header before drill-down.
- Metric tabs chart: hide the tab-list selection underline so it doesn't render alongside the selected metric card's fill. A @wordpress/ui update moved the minimal Tabs indicator from a per-tab element to a tab-list-level one, leaving a stray underline under the selected tab in the Subscribers and Traffic chart widgets.
- Metric tabs chart: on a narrow tile the metric cards squeezed into one cramped row. Stack the header and lay the cards out in an even two-column grid below a 420px container width, so the four-metric Traffic chart reflows to a balanced 2 x 2 instead of a crammed single row.
- Pin @wordpress/widget-dashboard and @wordpress/widget-primitives to an exact version instead of the floating next tag
- Scope wp-build polyfill registration to the dashboard pages so it no longer force-replaces core script handles (wp-private-apis) on every admin page
- Show every widget in the "Add widget" gallery. The dashboard fetched widget types with core-data's default query, which caps results at 10 per page, so any widget registered past the tenth was silently hidden. Fetch the full set with per_page: -1.
- Stats: Align traffic normalizer row metadata with legacy Stats behavior.
- Stop shipping megabytes of unminified JS as part of the package.
- Syncing: derive the analytics "started" state from the woocommerce_analytics sync-progress bucket instead of Jetpack's generic `started` flag, so the connection-time initial_sync no longer makes the syncing screen show "Sync interrupted" and suppress its auto-trigger.
- Top posts &amp; pages: Honor the dashboard date-range picker and comparison period instead of the widget's own fixed range.
