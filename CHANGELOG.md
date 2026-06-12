# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.1.0-alpha - unreleased

This is an alpha version! The changes listed here are not final.

### Added
- Add a tsconfig paths alias and typecheck script so internal packages/* resolve for types/IDE.
- Initial version.
- Port data package (React Query report hooks, fetchers, and processing) as an internal package from next-woocommerce-analytics.
- Port datetime package (timezone-aware date helpers and date-range presets) as an internal package from next-woocommerce-analytics.
- Port formatters package (number/currency/percentage metric formatter and date helpers) as an internal package from next-woocommerce-analytics.
- Port icons package (illustrated WPDS icons + @wordpress/icons re-exports) as an internal package from next-woocommerce-analytics.
- Port routing package (date-range/comparison search-param helpers and the staged-search hook) as an internal package from next-woocommerce-analytics.
- Port the components package (date range/comparison filter UI components and SCSS) from next-woocommerce-analytics as the internal `ui` package.
- Port the widgets-toolkit package (dashboard widgets, chart components, fields, and helpers) from next-woocommerce-analytics as an internal package.
- REST: Add the analytics API proxy controller that forwards dashboard requests to WPCOM and briefly caches the response.
- Sync: Track the analytics-relevant initial full-sync milestone and expose it to the dashboard via JetpackScriptData.

### Changed
- Allow consumers to configure the admin menu title via init options.
- Build the internal ui and data packages as registered script modules (wpScriptModuleExports) so consumers externalize them instead of bundling per-consumer copies: styled ui components stay out of style-less builds, and data's QueryClient becomes a genuine page-wide singleton.
- Data layer: route report requests through the jetpack-premium-analytics proxy controller instead of the legacy woocommerce-analytics proxy route.
- Internal: No longer require automattic/jetpack-changelogger as a per-project dev dependency.
- Update package dependencies.
