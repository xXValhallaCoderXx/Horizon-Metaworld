---
title: "Module 1 - Setup"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-1-setup"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "camera_api", "web_mobile", "tutorial", "setup"]
tutorial: "camera-api-examples"
summary: "Introduction and setup for the Camera API Examples tutorial series, covering prerequisites, environment setup, and overview of camera positioning for web and mobile experiences."
---

# Module 1 - Setup

## What & Why

The Camera API Examples tutorial series teaches developers how to implement different camera positions available through the Camera API for web and mobile worlds. In VR, the camera's point of view is first-person from the avatar. However, web and mobile experiences can position cameras in different points of view to facilitate the best combination of immersive experience, situational awareness, and current interactions.

This tutorial covers the different camera positions available through the Camera API for web and mobile worlds, including recommended use cases for each one.

**Important Note**: This world is supported for web and mobile only. Although you may explore it in VR, the camera POVs do not apply.

## Key Learning Objectives

- How to switch the camera
- When to switch the camera
- Changes to interaction models based on the camera
- Working with doors (additional implementation)
- Text gizmos and how to manage instruction sets

## Learning Pathways

You can follow this tutorial in two ways:

### Grab What You Need!

Use assets and scripts from this world in your own. For more information on how to apply this world to yours, see [Use Assets from Tutorials](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/use-assets-from-tutorials).

**Note**: In the following modules, script names are listed to indicate where the code for the system is located. These files are available in a local directory for your scripts. Search for the filename of the name of the world.

### Follow Along

These modules are intended to be explored in sequence. Grab a cup of coffee, and get ready to learn about the Camera API!

## Prerequisites

To follow along and complete this tutorial, you need the following:

- A Meta Account and a Meta Horizon Profile
- The Meta Horizon Worlds App installed on your Quest device
- The desktop editor downloaded and installed on a PC device
- (Optional) An integrated development environment (IDE) connected to the desktop editor for building TypeScript scripts
  - Visual Studio Code is recommended

**Development Environment Requirements:**

- IDE must be running at least TypeScript Version 4.7.4
- This tutorial is built on TypeScript API version 2.0.0

For API documentation, see [API v2.0.0 documentation](https://horizon.meta.com/resources/scripting-api/index.md/?api_version=2.0.0).

**Note**: If you are new to the desktop editor or to TypeScript, you might want to start with the first tutorial. See [Build your first game](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-1-build-your-first-game).

**Note**: All tutorials are created using TypeScript 2.0.0. You can learn more about how to upgrade your own world to TypeScript 2.0.0.

## How-To (Setup Process)

1. **Create Tutorial World**

   - Before you begin, you must create a new world from this tutorial world
   - See [Access Tutorial Worlds](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/access-tutorial-worlds)

2. **Open in Desktop Editor**

   - Open your new world in the desktop editor
   - Explore it in either Build mode or Preview mode to familiarize yourself with the world and its structures before modifying it

3. **Set Up Web and Mobile Testing Environment**

   - As part of the development process, you must test your work on each supported platform
   - This requires setting up a development environment for them
   - **Note**: Mobile can only be tested in a published world
   - **Note**: For this tutorial world, the desktop editor is a reasonable testbed for the basics of camera operations. However, mobile has some differences that need to be included as part of your testing. For example, this world includes a camera reset button, which appears in the mobile screen only. Mobile experiences should be tested as well.

4. **Review Getting Started Documentation**
   - If you haven't done so, please review the Getting Started section for tutorials, which includes information on:
     - Tutorial prerequisites and assumptions
     - How to use tutorial worlds and assets in your own worlds
     - Developer tools and testing for your worlds

## Tutorial Module Overview

The modules in this tutorial are organized in the following sequence:

| Module Name                                | Description                                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Module 2 - PlayerCamera Overview           | Overview of how the player avatar's camera works in Meta Horizon Worlds. How PlayerCamera objects and code work. |
| Module 3 - PlayerCameraManager             | How the PlayerCameraManager code works and how you can interface with it.                                        |
| Module 4 - Pan Camera                      | Set up camera to follow player at a consistent offset.                                                           |
| Module 5 - Fixed Camera and Spectator Mode | How to set up the PlayerCamera to be located at a fixed point based on a reference object.                       |
| Module 6 - Fixed Camera and Cutscenes      | How you can use the PlayerCamera for cutscenes and other perspectives such as isometric game experiences         |
| Module 7 - Other Systems and Summary       | How to use the secondary systems and summing it all up                                                           |

## Limits & Constraints

- **Platform Support**: This world is supported for web and mobile only
- **VR Limitation**: Although you may explore it in VR, the camera POVs do not apply
- **Mobile Testing**: Mobile can only be tested in a published world
- **API Version**: Requires TypeScript API version 2.0.0
- **IDE Requirements**: TypeScript Version 4.7.4 or higher

## Gotchas / Debugging

- Camera POV changes do not apply in VR mode - only test in web/mobile environments
- Mobile testing requires publishing the world first
- Ensure TypeScript version compatibility before starting development
- Desktop editor provides basic camera operation testing but mobile has unique features (like camera reset button)

## See Also

- [Access Tutorial Worlds](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/access-tutorial-worlds)
- [Use Assets from Tutorials](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/use-assets-from-tutorials)
- [How to Test on Web and Mobile](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/how-to-test-on-web-and-mobile)
- [Tutorial Prerequisites](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/tutorial-prerequisites)
- [Build your first game](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-1-build-your-first-game)

## Checkpoint

Module 1 completed! In this module, you:

- Verified prerequisites
- Opened the tutorial world in the desktop editor
- Set up web and mobile testing
- Learned the basic structure of the world

In the next module, you explore the camera, its APIs, and its usage in web and mobile.

## Sources

- [Camera API Examples Tutorial - Module 1 Setup](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-1-setup) (accessed 2025-09-25)
