# Homeassitant Layout Card

> DEVELOPER PREVIEW VERSION NOT FINAL
I'm still looking for help and would be happy if someone would get in touch to help me complete and improve the cards-layout.



![ha-layoutcard.png](docs/ha-layoutcard.png)





## Requirements

- Home Assistant 0.116.4
  - Frontend-Version: 20201001.2 - latest
  - Lovelace Mode
- Tested Browser
  - Chrome Version 86.0.4240.111 
  - Safari Version 13.1.2 (13609.3.5.1.5)
  - Firefox 82.0 (64-Bit)
  - Vivaldi 3.4.2066.76 (Stable channel) (x86_64)
  - Android Browser (Chrome, Firefox, Vivaldi)


<br>

## Installation

### Manual install

1. Download the [latest release](https://github.com/zibous/ha-layoutcard/releases), unzip and copy the folder `cards-layout` into your `$HOME/homeassistant/.homeassistant/www/community/cards-layout` directory.
<br />

2. Add a reference to `cards-layout-min.js` inside your `ui-lovelace.yaml` or at the top of the *raw config editor UI*:

   ```yaml
      resources:
        - url: /hacsfiles/cards-layout/cards-layout-min.js
          type: module
  ```

<br>

## Options layout

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:cards-layout`
| title | string | **Optional** | title
| icon | string | **Optional** | Card title icon
| description | string | **Optional** | Card section text
| width | number, string | **Required** | max width card row or column
| row |  | **Required** | section for columns
| col |  | **Required** | column for cards
| entities | list | **Required** | List of cards
| footer | string | **Optional** | shows the footer text on the page (bottom)

## Options layout row

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| row |  | **Required** | section for columns

## Options layout col

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| col |  | **Required** | column for cards
| title | string | **Optional** | title
| description | string | **Optional** | Card section text
| width | number, string | **Required** | max width card row or column
| height | number, string | **Required** | max width card row or column
| entities | list | **Required** | List of cards

## Options layout entities

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| entities | list | **Required** | List of cards
| type | string | **Required** | `card type`
| style | string | **Optional** | CSS Style tags for the card

### Entity Style examples
```yaml
- type: 'custom:simple-card'
   style: >
       background: linear-gradient(to top, #fc4a1a, #f7b733);
       color:#FFFFFF;
       height: 220px;


```

## Using the card
Add a custom card in your `ui-lovelace.yaml`

**Example**
```yaml
views:
  - title: Custom Layout card testcase
    panel: true
    cards:
      - type: 'custom:cards-layout'
        title: Page Title
        icon: 'mdi:home'
        description: Page description
        width: 80%
        cards:
          - row:
              - col: null
                width: 100%
                title: Section 1
                description: Description Section 1 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                entities:
                  - type: picture
                    title: Card 1 Section 1
                    image: >-
                      https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80
          - row:
              - col: null
                width: 50%
                title: Section 2
                description: Description Section 2 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                entities:
                  - type: picture
                    title: Card 1 Section 2
                    image: >-
                      https://images.unsplash.com/photo-1521446477144-773b2dd9b1af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80
                  - type: picture
                    title: Card 2 Section 2
                    image: >-
                      https://images.unsplash.com/photo-1546551613-09c2f83e1ede?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80
          - row:
              - col: null
                width: 50%
                title: Section 3
                description: Description Section 3 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                entities:
                  - type: picture
                    title: Card 1 Section 3
                    image: >-
                      https://images.unsplash.com/photo-1560635921-171138a3955e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80
                  - type: picture
                    title: Card 2 Section 3
                    image: >-
                      https://images.unsplash.com/photo-1545022274-cdffe6d68075?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80
                  - type: picture
                    title: Card 3 Section 3
                    image: >-
                      https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80                      
                  - type: picture
                    title: Card 4 Section 3
                    image: >-
                      https://images.unsplash.com/photo-1593853885764-b1174d704401?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80      
          - row:
              - col: null
                width: 100%
                title: Section 4
                description: Description Section 4 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                entities:
                  - type: picture
                    title: Card 1 Section 4
                    image: >-
                      https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80


```

<a href="https://www.buymeacoff.ee/zibous" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## TODO
- better css handling (load css once not per card)
- initialize - render cards to stage, re-assign to root
- how to handle end devices with low bandwidth ?
- ~~how to call hass and config for a custom:card (update data custom:card do not work !) ?~~  -->  this.provideHass(element);

## Helper
- [YAML to JSON Online](https://www.convertjson.com/yaml-to-json.htm) - Use this online tool to convert YAML into JSON. 
- [JSON to YAML Online](https://www.convertjson.com/json-to-yaml.htm) - Use this online tool to convert JSON into YAML. 
- [uiGradients](https://uigradients.com/#ByDesign)  - Beautiful colored gradients
- [Unsplash](https://unsplash.com/) - The internet’s source of freely-usable images.


## Credits

- [Ofek Ashery](https://github.com/ofekashery/vertical-stack-in-card) - Vertical Stack In Card allows you to group multiple cards in one card.
- [ciotlosm](https://github.com/ciotlosm)
- [thomasloven](https://github.com/thomasloven)
