Layer 1

plugin-api

----------------

Layer 2

runtime

----------------

Layer 3

shell/hmi.application.server

plugins

----------------

Rules

plugin-api/web.ifc
    ↓
nothing

runtime/web.imp
    ↓
plugin-api/web.ifc

shell/hmi.application.server
    ↓
runtime
    ↓
plugin-api

plugin
    ↓
runtime
    ↓
plugin-api

plugin
X
plugin


lifecyle:
        Angular starts
        │
        ▼
PlatformBootstrapService
        │
        ▼
PluginDiscoveryService
        │
        ▼
DevelopmentPluginSource
        │
        ▼
WelcomePlugin
        │
        ▼
PluginLifecycleManager
        │
        ▼
ExtensionRegistry
        │
        ├─────────────┐
        ▼             ▼
Sidebar        RouterContributionService
        │             │
        └──────┬──────┘
               ▼
         Welcome menu appears
               │
               ▼
      Click "Welcome"
               │
               ▼
     WelcomePageComponent renders