# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.1.0-alpha - unreleased

This is an alpha version! The changes listed here are not final.

### Added
- Add /connect and /syncing routes with connection-aware route guards: /connect detects the connection state and shows a "site not connected" screen, and /syncing shows initial-sync progress. Emit window.JetpackScriptData on the boot-rendered admin page so the connection data the guards read is available.
- Add a tsconfig paths alias and typecheck script so internal packages/* resolve for types/IDE.
- Add site-sync package (useSyncStatus hook) and configure apiFetch auth in init.
- Add the internal fields package: DataForm field controls for widgets, delivered as a script module so styled editors stay out of widget metadata bundles. Includes the ReportParamsField date-range editor.
- Add the Locations widget to the Premium Analytics dashboard: world map + leaderboard showing visitors by country, region, or city, with click-to-drill-down into country regions.
- Add watch mode for local development.
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
- Port the components package (date range/comparison filter UI components and SCSS) from next-woocommerce-analytics as the internal `ui` package.
- Port the widgets-toolkit package (dashboard widgets, chart components, fields, and helpers) from next-woocommerce-analytics as an internal package.
- REST: Add the analytics API proxy controller that forwards dashboard requests to WPCOM and briefly caches the response.
- REST: Expose the dashboard notices under `jetpack-premium-analytics/v1/notices` (GET + POST), backed by a Notices class ported from stats-admin that merges the WordPress.com dismissal state with locally-derived opt-in/opt-out/feedback/GDPR flags.
- REST: Register the API proxy's transient cache prefix with the stats package's transient cleanup cron, so expired proxy response caches are garbage-collected on sites without a persistent object cache instead of accumulating in wp_options.
- REST: Serve the whole analytics and stats surface through one endpoint-agnostic proxy under jetpack-premium-analytics/v1, shaped as `proxy/v<version>/<prefix>/<subpath>` (for example `proxy/v1.1/wordads/earnings`). The `proxy/` segment marks a transparent WordPress.com forward, the WordPress.com API version lives in the path, and an allowed-prefix plus write-method allowlist bounds the blog token. This lays the groundwork for deprecating the stats-admin package.
- Stats: Add app commercial classification hook.
- Stats: Add app dashboard module settings hooks.
- Stats: Add app plan usage hook.
- Stats: Add archives report hook.
- Stats: Add comments report hook.
- Stats: Add core proxy query definitions.
- Stats: Add core traffic report hooks.
- Stats: Add highlights hook.
- Stats: Add insights hook.
- Stats: Add post stats data hook.
- Stats: Add shared endpoint query helpers.
- Stats: Add streak hook.
- Stats: Add subscribers hooks.
- Stats: Add tags report hook.
- Stats: Add time-series response normalizers.
- Stats: Add UTM endpoint data hook.
- Stats: Add visits report hook.
- Storybook: Add a prop-driven Top posts & pages widget story under Packages/Premium Analytics/Widgets.
- Sync: Track the analytics-relevant initial full-sync milestone and expose it to the dashboard via JetpackScriptData.

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
- Syncing: when WooCommerce is inactive, gate the dashboard on Jetpack's generic initial full sync so the syncing screen completes instead of spinning forever.
- Update package dependencies.

### Fixed
- Dashboard: Load WordPress build polyfills so the dashboard can run without the Gutenberg plugin.
- Drop the unsupported `focusable` prop on `@wordpress/ui` `Tabs.Panel` (not a valid prop; was a no-op). Aligns with the `@wordpress/ui` 0.15 API. Panels already gate their content on the active section.
- Fix dashboard widgets rendering "Widget is no longer available" by loading the widget manifest on REST requests, not just admin page loads.
- Pin @wordpress/widget-dashboard and @wordpress/widget-primitives to an exact version instead of the floating next tag
- Scope wp-build polyfill registration to the dashboard pages so it no longer force-replaces core script handles (wp-private-apis) on every admin page
- Stats: Align traffic normalizer row metadata with legacy Stats behavior.
- Stop shipping megabytes of unminified JS as part of the package.
- Syncing: derive the analytics "started" state from the woocommerce_analytics sync-progress bucket instead of Jetpack's generic `started` flag, so the connection-time initial_sync no longer makes the syncing screen show "Sync interrupted" and suppress its auto-trigger.
