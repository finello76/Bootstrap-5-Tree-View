# Bootstrap 5 Tree View

this is a fork of https://github.com/chniter/bstreeview

A very simple plugin to build a basic and elegant Treeview with boostrap 5.2.3

# Screenshot
![Screenshot](https://raw.githubusercontent.com/finello76/Bootstrap-5-Tree-View/main/screeshots/bstreeview.PNG)

## Dependencies

Where provided these are the actual versions bootstrap-treeview has been tested against.

- [Bootstrap v5.2.3)](http://getbootstrap.com/)
- [jQuery v3.4.1 (>= 1.9.0)](http://jquery.com/)

### Usage

Add the following resources for the bootstrap-treeview to function correctly.

```html
<!-- Required Stylesheets -->

<!-- Link to Bootstrap CSS file -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

    <!-- Link to Font Awesome CSS file -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Link to Font Awesome JavaScript file -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/all.min.js" integrity="sha512-u3fPA7V8qQmhBPNT5quvaXVa1mnnLSXUep5PS1qo5NRzHwG19aHmNJnj1Q8hpA/nBWZtZD4r4AX6YOt5ynLN2g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- Required Javascript -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>

	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
```

The component will bind to any existing DOM element.

```html
<div id="tree"></div>
```

Basic usage may look something like this.

```javascript
function getTree() {
  // Some logic to retrieve, or generate tree structure
  return data;
}

$('#tree').bstreeview({ data: getTree() });
```

Search in the tree
```javascript
let text = "Office";
let ignorecase = true;
$('#tree').data('plugin_bstreeview').search(text,ignorecase);
```


## Data Structure

In order to define the hierarchical structure needed for the tree it's necessary to provide a nested array of JavaScript objects.

Example

```javascript
var tree = [
  {
    text: "Node 1",
    icon: "fa fa-folder",
    expanded: true,
    nodes: [
      {
        text: "Sub Node 1",
        icon: "fa fa-folder",
        nodes: [
          {
            id:    "sub-node-1",
            text:  "Sub Child Node 1",
            icon:  "fa fa-folder",
            class: "nav-level-3",
            href:  "https://google.com"
          },
          {
            text: "Sub Child Node 2",
            icon: "fa fa-folder"
          }
        ]
      },
      {
        text: "Sub Node 2",
         icon: "fa fa-folder"
      }
    ]
  },
  {
    text: "Node 2",
    icon: "fa fa-folder"
  },
  {
    text: "Node 3",
    icon: "fa fa-folder"
  },
  {
    text: "Node 4",
    icon: "fa fa-folder"
  },
  {
    text: "Node 5",
    icon: "fa fa-folder"
  }
];
```

This property `text` is required to display nodes.

```javascript
{
  text: "Node 1"
}
```

### Node Properties

#### text
`String` `Mandatory`

The text value displayed for a given tree node.

#### icon
`String` `Optional`

The icon displayed on a given node.

#### href
`String` `Optional`

A custom `href` attribute value for a given node.

#### class
`String` `Optional`

A class name or space separated list of class names to add to a given node.

#### id
`String` `Optional`

ID attribute value to assign to a given node.

#### expanded
`Boolean` `Optional`

Set to true to expand this node's children initially

## Options

#### data
`String` `Mandatory`

Json or string array of nodes.

#### expandIcon
`String` `Optional`

Expand icon class name, default is `fa fa-angle-down fa-fw`.

#### collapseIcon
`String` `Optional`

Collapse icon class name, default is `fa fa-angle-right fa-fw`.

#### indent
`number with decimals` `Optional`

Custom indent between node levels (rem), default is `1.25`.

#### parentsMarginLeft
`String` `Optional`

margin-left value of parent nodes, default is `1.25rem`.

#### openNodeLinkOnNewTab
`Boolean` `Optional`

Open node link on new browser Tab, default is `true`.

```javascript
// Example: initializing the bstreeview
$('#tree').bstreeview({
  data: data,
  expandIcon: 'fa fa-angle-down fa-fw',
  collapseIcon: 'fa fa-angle-right fa-fw',
  indent: 1.25,
  parentsMarginLeft: '1.25rem',
  openNodeLinkOnNewTab: true
});
```

## Methods


## Events





## Copyright and Licensing
Copyright 2020 Sami CHNITER

Modified by Andrea Fini (2024)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at <http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
