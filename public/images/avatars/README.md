# Avatar Images

This directory contains avatar images referenced by the application.

## Required Images

The application references the following avatar images:
- `cat-happy.png` - Cat avatar for children
- `dog-brave.png` - Dog avatar for children
- `owl-smart.png` - Owl avatar for children

## Image Specifications

- Format: PNG with transparency
- Recommended size: 200x200px or 400x400px
- Style: Colorful, child-friendly cartoon style
- Background: Transparent

## Fallback Behavior

If images are missing, the Avatar component will display:
1. Custom fallback component (if provided)
2. Default user icon (User from lucide-react)

The component has been updated to properly handle image loading errors with state management.
