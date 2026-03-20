# bot_mix_scoring

An automation bot for canvas-based web pages that detects option changes from screenshots and automatically selects left/right answers based on predefined patterns.

## Overview

`bot_mix_scoring` monitors a canvas webpage where choices are presented visually. It captures the current state of the canvas, analyzes the displayed options through image comparison, and triggers the correct left or right answer selection according to a pattern-matching strategy.

## How It Works

1. **Screen Capture** — The bot periodically captures or monitors the canvas element on the target webpage.
2. **Image Analysis** — It compares the captured image against known option patterns to detect which choice is currently displayed.
3. **Pattern Matching** — Based on the detected option, the bot looks up the corresponding answer direction (left or right) from a pre-configured pattern map.
4. **Auto-Click** — The bot simulates a click or keypress to select the determined answer.

## Features

- Canvas-based webpage support
- Visual option detection via image comparison
- Left/right answer selection driven by pattern configuration
- Automatic loop — continuously monitors for option changes

## Requirements

> Adjust based on the actual dependencies in the repo.


## Usage

```run file
index.ts
```


## Pattern Configuration

Patterns are defined to map each detected visual option to a click direction:

```list of answer
['L','L','L','R','L','R']
```

```list of templates for check is question has changed
[
  'templates/q1.png',
  'templates/q2.png',
  'templates/q3.png',
  'templates/q4.png',
  'templates/q5.png',
  'templates/q6.png'
]
```


Edit the pattern file to match the option images and their correct answers for your target page.

## Notes

- This bot is intended for use on specific canvas-based quiz or scoring pages.
- Ensure the target webpage is visible and not minimized while the bot is running.
- Adjust match thresholds in the config if detection accuracy is inconsistent.
