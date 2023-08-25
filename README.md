# Raycast Scripts

## About

Scripts to be used by [Raycast](https://www.raycast.com/) to automate repetitive tasks, which would have generally taken 2 min to be done manually, but took 2 weeks to develop the script. :sweat_smile:

## Table of Contents

- [Raycast Scripts](#raycast-scripts)
  - [About](#about)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [speedtest](#speedtest)
    - [tagebuch](#tagebuch)
  - [Usage](#usage)
    - [Add .env file](#add-env-file)
    - [Run/Test script](#runtest-script)
      - [Test speedtest](#test-speedtest)
      - [Test tagebuch](#test-tagebuch)

## Installation

### speedtest

Pre-requisites:

- [brew](https://brew.sh/)

```bash
brew install speedtest-cli
```

### tagebuch

Pre-requisites:

- [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- [node](https://nodejs.org/en/download/)

```bash
yarn install
```

## Usage

### Add .env file

```bash
cp .env.example .env
```

Add the respective values to the .env file.

### Run/Test script

#### Test speedtest

```bash
sh ./speedtest.sh
```

#### Test tagebuch

```bash
yarn tagebuch
```
