# Stylable Intelligence 
[![Greenkeeper badge](https://badges.greenkeeper.io/wix/stylable-intelligence.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/wix/stylable-intelligence.svg?branch=master)](https://travis-ci.org/wix/stylable-intelligence)
[![Build Status](https://ci.appveyor.com/api/projects/status/6ky876hm9nycyu8m/branch/master?svg=true)](https://ci.appveyor.com/project/qballer/stylable-intelligence)
 
## Overview
Stylable Intelligence is an extension implementing the Language Server Protocol that provides IDE support for Stylable.

Stylable Intelligence is currently only supported in VSCode (version 1.16 and later). Support for JetBrains IDEs (WebStorm, IntelliJ) is planned.

Currently supported: Code Completions, Diagnostics, Go to Definition.

Other Language Server features will be added in the near future.


## Installation

### From VSCode Marketplace
Search VSCode Extension Marketplace for ['Stylable Intelligence'](https://marketplace.visualstudio.com/search?term=stylable-intelligence&target=VSCode&category=All%20categories&sortBy=Relevance).

Install extension.

Reload window when prompted by VsCode.

### From .vsix file 
In VsCode extension menu, choose 'Install from VSIX'.

Double-click your .vsix file. 

Reload window when prompted by VsCode.

## Known Issues

### Not supported yet (in rough order of priority):
* Mixins and JS imports
* Variants
* Esoteric syntax (-st-compose, -st-theme, -st-root, -st-global)

### Buggy areas
* Inner parts of nested custom selectors
* Aliased imports
* Imported values spanning multiple lines
