# Documentation Guidelines

## Purpose
Documentation exists to track **key features**, **system architecture**, and **points of interest** in our application. Nothing more.

## Rules

### ✅ WHAT TO DOCUMENT
1. **System overview** - High-level architecture and component relationships
2. **Key features** - Critical functionality and how systems interact
3. **Points of interest** - Important implementation details, gotchas, or non-obvious behavior
4. **Setup requirements** - Essential configuration needed to run the system

### ❌ WHAT NOT TO DOCUMENT
1. ❌ Code that explains itself
2. ❌ Tutorials or step-by-step guides
3. ❌ Troubleshooting scenarios
4. ❌ Examples or sample code
5. ❌ Implementation history or "how we got here"
6. ❌ "Nice to have" features that don't exist yet

## Documentation Structure

```
/docs
├── docs-guidelines.md (this file)
├── system-overview.md (architecture, components, data flow)
└── [future docs as needed]
```

## Writing Standards

### Keep It Minimal
- **One sentence is better than a paragraph**
- **One paragraph is better than a page**
- If you can't explain it in 3 sentences, the code is too complex

### Keep It Current
- **Update docs when you change code** - Not before, not after
- **Delete docs when features are removed**
- **No outdated information** - Delete if unsure

### Keep It Relevant
Ask before documenting:
1. Does this explain a **key feature**?
2. Is this a **point of interest** that's non-obvious?
3. Will this help someone understand the **system architecture**?

If the answer is NO to all three → **Don't document it**

## File Naming
- Use kebab-case: `system-overview.md`
- Be specific: `tutorial-system.md` not `tutorial-docs.md`
- One topic per file

## Format Template

```markdown
# [System/Feature Name]

## Purpose
One sentence describing what this system does.

## Key Components
- Component1: Brief description
- Component2: Brief description

## How It Works
Brief explanation of the flow (3-5 sentences max).

## Points of Interest
- Non-obvious behavior
- Important gotchas
- Critical dependencies

## Configuration
Only essential setup requirements.
```

## Maintenance

### When Code Changes:
1. Update relevant docs immediately
2. Remove sections that are no longer accurate
3. If a doc becomes 50%+ irrelevant → Delete it and start fresh

### When Adding Features:
1. Only document if it's a **key feature**
2. Update `system-overview.md` with new component relationships
3. Keep it brief

### When Removing Features:
1. Delete relevant documentation
2. Update `system-overview.md` to reflect removal

## Examples

### ✅ GOOD Documentation:
```markdown
# Tutorial System

## Purpose
Spawns players at different locations based on tutorial completion status.

## Key Components
- PlayerManager: Handles spawn routing
- TutorialManager: Detects completion and triggers teleport
- EventsService: Communication between components

## How It Works
1. Player joins → PlayerManager checks completion status
2. Player spawns at tutorial or main location
3. Player enters completion trigger → TutorialManager fires event
4. PlayerManager marks player as complete
5. Next join → Player spawns at main location

## Points of Interest
- Tutorial completion status resets on script reload (not persisted)
- 100ms spawn delay prevents conflicts with Horizon's default system
- Uses event-driven architecture to avoid circular dependencies
```

### ❌ BAD Documentation:
```markdown
# Tutorial System - Complete Guide

## Introduction
This is a comprehensive guide to the tutorial system we built...

## History
First we tried using direct references but that didn't work...

## Step 1: Creating Spawn Points
To create a spawn point, open the Horizon editor...

## Step 2: Configuring Properties
In the properties panel, you'll see...

## Troubleshooting
If players don't teleport, check that...

## Future Enhancements
We might add multi-step tutorials...
We could add persistence...
```

## Decision Tree

```
Need to document something?
│
├─ Is it a KEY FEATURE? → YES → Document it
│
├─ Is it a POINT OF INTEREST? → YES → Document it
│
├─ Does it explain SYSTEM ARCHITECTURE? → YES → Document it
│
└─ Is it anything else? → NO → Don't document it
```

## Review Checklist

Before committing documentation, ask:
- [ ] Is this explaining a key feature or system?
- [ ] Is every sentence necessary?
- [ ] Could this be understood from reading the code?
- [ ] Is this current and accurate?
- [ ] Is this 3 sentences or less per section?

If you answered NO to any → Revise or delete

---

**Remember**: Documentation is a liability. Every line is technical debt that must be maintained. Less is more.
