# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.1.0-alpha - unreleased

This is an alpha version! The changes listed here are not final.

### Added
- Add a tsconfig paths alias and typecheck script so internal packages/* resolve for types/IDE.
- Initial version.
- Port datetime package (timezone-aware date helpers and date-range presets) as an internal package from next-woocommerce-analytics.
- Port icons package (illustrated WPDS icons + @wordpress/icons re-exports) as an internal package from next-woocommerce-analytics.

### Changed
- Allow consumers to configure the admin menu title via init options.
- Internal: No longer require automattic/jetpack-changelogger as a per-project dev dependency.
- Update package dependencies.
