# Raycast Scripts

## Table of Contents

- [Raycast Scripts](#raycast-scripts)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [speedtest](#speedtest)
    - [tagebuch](#tagebuch)
  - [Usage](#usage)
    - [Add .env file](#add-env-file)
    - [Run/Test script](#runtest-script)
      - [speedtest](#speedtest-1)
      - [tagebuch](#tagebuch-1)

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

#### speedtest

```bash
sh ./speedtest.sh
```

#### tagebuch

```bash
yarn tagebuch
```
